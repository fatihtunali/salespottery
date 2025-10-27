# Stripe Setup Guide - Test Mode

This guide will help you set up Stripe for testing the checkout functionality.

## Step 1: Create Stripe Account

1. Go to https://dashboard.stripe.com/register
2. Sign up for a free Stripe account
3. Complete the account verification (you can skip business details for testing)

## Step 2: Get Test API Keys

1. Once logged in, click on **Developers** in the top menu
2. Click on **API keys** in the left sidebar
3. Make sure you're in **Test mode** (toggle at the top right)
4. Copy your API keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

## Step 3: Update Environment Variables

1. Open `.env.local` in your project
2. Replace the placeholder Stripe keys with your actual test keys:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
```

## Step 4: Set Up Webhook (Optional for Local Testing)

For local development, you can use Stripe CLI to forward webhooks:

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to localhost:3005/api/webhook/stripe`
4. Copy the webhook signing secret (starts with `whsec_`)
5. Add it to `.env.local`:
```
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Step 5: Test the Checkout

1. Restart your development server
2. Add items to cart
3. Click "Proceed to Checkout"
4. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - Use any future expiry date (e.g., 12/34)
   - Use any 3-digit CVC (e.g., 123)
   - Use any postal code (e.g., 12345)

## Test Cards

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 9995 | Insufficient funds |
| 4000 0025 0000 3155 | Requires authentication (3D Secure 2) |

More test cards: https://stripe.com/docs/testing

## Production Setup (Later)

When ready for production:

1. Switch to **Live mode** in Stripe Dashboard
2. Get your live API keys (start with `pk_live_` and `sk_live_`)
3. Update `.env.production` with live keys
4. Set up real webhook endpoint in Stripe Dashboard:
   - URL: `https://yourdomain.com/api/webhook/stripe`
   - Events to listen: `checkout.session.completed`, `payment_intent.succeeded`
5. Complete Stripe account verification
6. Enable payment methods (card, SEPA, etc.)

## Troubleshooting

### Checkout button not working
- Check browser console for errors
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set correctly
- Make sure the key starts with `pk_test_`

### Webhook not receiving events
- Ensure Stripe CLI is running: `stripe listen --forward-to localhost:3005/api/webhook/stripe`
- Check that `STRIPE_WEBHOOK_SECRET` matches the CLI output
- Verify the webhook endpoint is accessible

### Order not being created
- Check server logs for webhook errors
- Verify database connection
- Make sure `orders` and `order_items` tables exist

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Test Mode: https://stripe.com/docs/testing
- Webhook Testing: https://stripe.com/docs/webhooks/test
