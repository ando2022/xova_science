import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

// Secret key must be set in Vercel project settings
const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string | undefined;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Missing STRIPE_SECRET_KEY server env' });
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' });

  try {
    const { totalAmountChf, planType, userEmail } = req.body as {
      totalAmountChf: number;
      planType: 'first-order' | 'weekly';
      userEmail?: string;
    };

    if (!totalAmountChf || totalAmountChf <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const host = req.headers['x-forwarded-host'] || req.headers.host || '';
    const proto = (req.headers['x-forwarded-proto'] as string) || 'https';
    const baseUrl = `${proto}://${host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      currency: 'chf',
      line_items: [
        {
          price_data: {
            currency: 'chf',
            product_data: {
              name: planType === 'first-order' ? 'XOVA 14-Day Plan' : 'XOVA Weekly Plan',
              description: planType === 'first-order' ? '14 smoothies (1 CHF off each)' : '7 smoothies per week',
            },
            unit_amount: Math.round(totalAmountChf * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/?checkout=success`,
      cancel_url: `${baseUrl}/?checkout=cancelled`,
      customer_email: userEmail,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return res.status(500).json({ error: err.message || 'Stripe error' });
  }
}


