// src/app/api/order/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      customer_pincode,
      items,
      delivery_charge,
      subtotal,
      total_amount,
      payment_method,
      payment_id,
    } = body;

    const {
      data: { user },
      error: userError,
    } = await supabaseServer.auth.getUser();

    if (userError || !user) {
      console.error('User not logged in:', userError);
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    const { data, error } = await supabaseServer
      .from('orders')
      .insert([
        {
          user_id: user.id,
          customer_name,
          customer_email,
          customer_phone,
          customer_address,
          customer_pincode,
          items,
          delivery_charge,
          subtotal,
          total_amount,
          payment_method: payment_method || 'Razorpay',
          payment_status: 'paid',
          status: 'new',
          payment_id,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, order: data[0] });
  } catch (err: any) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
