# ShopWave Setup Guide

## 1. Install tools
Install:
- Google Chrome
- VS Code
- Node.js LTS
- Firebase CLI

Then run:
```bash
npm install -g firebase-tools
firebase login
```

## 2. Create the Firebase project
1. Open Firebase Console.
2. Create a new project called something like `shopwave-prod`.
3. Add a Web App.
4. Copy the Firebase configuration.
5. Put it into `js/firebase-config.js`.

## 3. Enable Authentication
Enable:
- Email/Password
- Google sign-in (optional)

Do NOT make Admin a public account type. Admin should be controlled using Firebase custom claims.

## 4. Create Firestore
Start in production mode if you understand the rules. Deploy the supplied rules:
```bash
firebase deploy --only firestore:rules
```

## 5. Create Storage
Deploy:
```bash
firebase deploy --only storage
```
Use Storage for user-uploaded product images, profile photos and story photos. The website does NOT need every image to come from the visitor's device: product images uploaded by sellers can live in Firebase Storage and then be displayed from their secure/public download URL. You can also use approved remote image URLs where appropriate.

## 6. Configure your data model
Use `firebase/firestore-schema.md` as the starting structure.

## 7. Add authentication logic
The current pages are designed as the visual foundation. Connect login/signup to Firebase Auth and create the user's `/users/{uid}` document after signup.

Recommended role model:
- customer
- seller
- admin (custom claim, not a normal signup option)

After login:
- customer → profile/shop
- seller → seller-dashboard
- admin → admin-dashboard

## 8. Seller onboarding
A seller should complete:
- business name
- logo
- cover image
- business description
- location
- contact information
- payout details handled securely by your payment provider
- verification documents if required by your business policy

## 9. Product uploads
Seller selects images from their device. The browser uploads the files to Firebase Storage. Firestore stores the product document and image URLs.

For production, validate:
- file type
- file size
- image dimensions
- seller ownership
- product status

## 10. Checkout and payments
Do not put secret payment credentials in HTML/JavaScript.

Recommended flow:
1. Customer creates an order.
2. Website asks a Cloud Function to initialize payment.
3. Payment provider processes payment.
4. Provider callback/webhook reaches your server.
5. Server verifies the payment.
6. Server updates Firestore payment status.
7. Seller sees the verified order.

For Nigeria, Paystack or Flutterwave can be integrated. For international expansion, Stripe can be added where supported.

## 11. Money-making model
ShopWave can earn through several channels:
1. Transaction commission — e.g. a percentage of completed orders.
2. Seller subscription — optional monthly Pro seller plan.
3. Featured listings — sellers pay to appear in premium discovery slots.
4. Promoted businesses — paid placement in selected categories/cities.
5. Seller advertising — sponsored campaigns.
6. Optional delivery/service margin where ShopWave controls logistics.
7. Later: B2B tools, analytics, storefront themes and premium seller tools.

Do not charge sellers everything at launch. Start with a clear commission + optional promotion model.

## 12. Global readiness
To make this genuinely usable worldwide:
- Store currency per order instead of hardcoding NGN everywhere.
- Store country and timezone.
- Add international phone validation.
- Use a locale-aware currency formatter.
- Add multiple delivery methods.
- Add tax configuration per market.
- Add seller verification and moderation.
- Add terms/privacy/refund policies.
- Add accessibility and keyboard support.
- Add SEO metadata and structured data.
- Add rate limiting/App Check.
- Add monitoring and backups.

## 13. Image strategy
There are three valid image sources:
A. Seller/customer uploads from their device → Firebase Storage.
B. Platform-controlled images already hosted on your CDN/storage.
C. Approved external image URLs.

For a real marketplace, seller-uploaded product images should normally be uploaded to Firebase Storage. Do not make the seller paste an image URL unless you intentionally want that feature.

The demo pages currently use Unsplash URLs only to make the design look realistic. Replace those demo images with Firebase Storage URLs in the live product data.

## 14. Domain and deployment
For launch:
- Firebase Hosting can host the frontend.
- Connect a custom domain such as `shopwave.com` when you own it.
- Enable HTTPS.
- Set production Firebase rules.
- Use separate Firebase projects for development and production.

## 15. Admin security
Never expose an ordinary public "Admin" registration.
Use Firebase custom claims and security rules.
Keep the admin dashboard route protected.
Add MFA for administrator accounts.

## 16. Pre-launch checklist
- [ ] Firebase Auth configured
- [ ] Firestore rules tested
- [ ] Storage rules tested
- [ ] App Check enabled
- [ ] Payment provider verified server-side
- [ ] Email notifications configured
- [ ] Seller verification policy
- [ ] Refund/cancellation policy
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Product moderation
- [ ] Story moderation
- [ ] Backups
- [ ] Monitoring
- [ ] Custom domain
- [ ] Mobile/tablet/desktop testing
