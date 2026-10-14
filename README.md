# ShopWave — Firebase live upgrade

This package upgrades the supplied ShopWave website while preserving its existing visual style. It removes the static marketplace/demo records and changes the main marketplace, account, seller, admin, cart, checkout and story flows to use Firebase.

## Important
The frontend cannot connect until the Firebase Web App configuration is filled in at `js/firebase-config.js`. The Firebase project ID is already set to `shopwave-luo`; copy the remaining Web SDK values from Firebase Console.

## What is included
- Firebase Email/Password customer + seller registration/login
- Customer profile and password reset
- Live Firestore product marketplace (empty when the database is empty)
- Seller product creation with Firebase Storage image upload
- Seller dashboard counts/revenue from Firestore
- Real Firestore orders and local cart
- Story submission + Storage image upload
- Protected admin dashboard using Firebase custom `admin` claim
- Firestore + Storage security rules
- Cloud Function order notification trigger
- LiveKit token function and live page skeleton for real WebRTC streaming
- No hardcoded product/seller/order/sales/story demo records

## Firebase setup
1. Open Firebase Console for `shopwave-luo`.
2. Enable Authentication > Email/Password.
3. Create Firestore Database.
4. Enable Storage.
5. Add a Web App and copy its config into `js/firebase-config.js`.
6. Deploy rules/functions/hosting with Firebase CLI.
7. Create the first seller/customer through the site.
8. Create the first admin account separately and set its custom `admin=true` claim using a trusted server process. Never expose an admin signup form.

## LiveKit
Firebase is not a video streaming service. For actual seller broadcasts, create a LiveKit project and configure these Cloud Functions environment variables/secrets:
- LIVEKIT_API_KEY
- LIVEKIT_API_SECRET
- LIVEKIT_URL

The included function issues short-lived room tokens; secrets never belong in browser JavaScript.

## Deploy
From this folder:

```bash
firebase login
firebase use shopwave-luo
firebase deploy
```

The root `firebase.json` serves the website and deploys the `functions` folder.

## Verification performed for this package
- Original ZIP extracted successfully.
- Static demo product cards were removed from home/shop pages.
- Frontend JavaScript was checked with Node syntax validation.
- Firebase config intentionally remains a placeholder where private project-specific Web SDK values were not present in the supplied ZIP.
