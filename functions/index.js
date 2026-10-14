const {onCall} = require('firebase-functions/v2/https');
const {onDocumentCreated} = require('firebase-functions/v2/firestore');
const {AccessToken} = require('@livekit/server-sdk');
const admin=require('firebase-admin');
admin.initializeApp();
exports.onOrderCreated=onDocumentCreated('orders/{orderId}',async event=>{const order=event.data?.data();if(!order)return;const batch=admin.firestore().batch();for(const sellerId of (order.sellerIds||[])){batch.set(admin.firestore().collection('notifications').doc(),{userId:sellerId,type:'order',orderId:event.params.orderId,message:'A new order has been placed.',createdAt:admin.firestore.FieldValue.serverTimestamp(),read:false});}await batch.commit();});
exports.createLiveToken=onCall(async request=>{if(!request.auth)throw new Error('Authentication required');const {room,participantName,host}=request.data||{};if(!room)throw new Error('Room required');const key=process.env.LIVEKIT_API_KEY,secret=process.env.LIVEKIT_API_SECRET; if(!key||!secret)throw new Error('LiveKit server configuration is missing');const token=new AccessToken(key,secret,{identity:request.auth.uid,name:participantName||request.auth.uid});token.addGrant({roomJoin:true,room,canPublish:!!host,canSubscribe:true});return {token:await token.toJwt(),url:process.env.LIVEKIT_URL||''};});
