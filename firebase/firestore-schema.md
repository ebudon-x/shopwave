# Firestore collection plan

## users/{uid}
- displayName
- email
- role: customer | seller
- photoURL
- phone
- country
- createdAt

## businesses/{businessId}
- ownerId
- name
- slug
- description
- logoURL
- coverURL
- country
- city
- verificationStatus
- status
- createdAt

## products/{productId}
- sellerId
- businessId
- name
- slug
- description
- price
- currency
- images[]
- category
- stock
- status
- featured
- createdAt
- updatedAt

## orders/{orderId}
- customerId
- sellerIds[]
- items[]
- subtotal
- deliveryFee
- total
- currency
- paymentReference
- paymentStatus
- orderStatus
- shippingAddress
- createdAt

## stories/{storyId}
- authorId
- businessId
- title
- body
- imageURL
- status
- createdAt

## reviews/{reviewId}
- productId
- businessId
- customerId
- rating
- text
- status
- createdAt

## platformSettings/{docId}
Admin-only configuration such as commission rate, featured listing pricing, supported countries and maintenance mode.
