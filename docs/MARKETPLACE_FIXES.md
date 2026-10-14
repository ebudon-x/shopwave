# ShopWave marketplace fixes

This build fixes the marketplace interactions using the existing Firebase/Firestore data.

- Search now filters live published products.
- Categories are generated from real published product categories.
- Popular and New filters now change the real product ordering.
- Product cards are wired through event delegation, so dynamically loaded products can be added to cart.
- The broken cart page inline script was removed; the main application now renders and manages the cart.
- Product detail page added at `product.html`.
- Buyers can use **Chat seller** from a product card or product detail page.
- `chat.html` provides a real-time Firestore conversation using the `conversations/{conversationId}/messages` subcollection and `onSnapshot`.
- Seller Studio now includes a Buyer Messages tab.
- Firestore rules were updated to restrict conversations/messages to participants.
- No marketplace/demo records are added by these changes.
