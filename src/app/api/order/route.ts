// src/app/api/order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
const BRAND = process.env.BRAND_NAME || 'GreenGift';

async function sendWhatsAppText(to: string, text: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN!;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID!;
  const url = `https://graph.facebook.com/v18.0/${phoneId}/messages`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    }),
  });

  if (!resp.ok) {
    const body = await resp.text().catch(() => 'no body');
    console.error('WhatsApp send error:', resp.status, body);
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      user_email,
      user_name,
      phone,
      address,
      pincode,
      cart_items,
      delivery_charge,
      total_amount,
    } = data || {};

    if (!user_email || !user_name || !phone || !address || !pincode || !Array.isArray(cart_items)) {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
    }

    // compute subtotal if not provided
    const subtotal = cart_items.reduce((acc: number, item: any) => {
      const price = Number(item.price ?? item?.plant?.price ?? 0);
      const qty = Number(item.quantity ?? 1);
      return acc + price * qty;
    }, 0);

    const { data: inserted, error } = await supabaseAdmin
      .from('orders')
      .insert([
        {
          customer_name: user_name,
          customer_email: user_email,
          customer_phone: phone,
          customer_address: address,
          customer_pincode: pincode,
          items: cart_items,
          delivery_charge: Number(delivery_charge ?? 0),
          subtotal,
          total_amount: Number(total_amount ?? subtotal + Number(delivery_charge ?? 0)),
          payment_method: 'UPI',
          payment_status: 'pending',
          status: 'new',
        },
      ])
      .select('*')
      .single();

    if (error || !inserted) {
      console.error('DB insert error:', error);
      return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
    }

    const orderId = inserted.id;
    const total = inserted.total_amount;

    // send WhatsApp to customer
    const customerMsg = [
      `✅ ${BRAND} — Order Confirmed`,
      `Hi ${user_name}, thanks for your order!`,
      `Order ID: ${orderId}`,
      `Total: ₹${total}`,
      `We will contact you on ${phone} if needed.`
    ].join('\n');

    // Ensure phone is in international format (e.g. 91XXXXXXXXXX)
    await sendWhatsAppText(phone, customerMsg);

    // send WhatsApp to admin
    const adminPhone = process.env.ADMIN_PHONE;
    if (adminPhone) {
      const adminMsg = [
        `📦 New Order — ${BRAND}`,
        `Name: ${user_name}`,
        `Phone: ${phone}`,
        `PIN: ${pincode}`,
        `Total: ₹${total}`,
        `Order ID: ${orderId}`
      ].join('\n');
      await sendWhatsAppText(adminPhone, adminMsg);
    }

    return NextResponse.json({ ok: true, order_id: orderId });
  } catch (err) {
    console.error('Order API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
