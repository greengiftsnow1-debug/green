import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer_name, customer_email, customer_phone, customer_address, customer_pincode, items, delivery_charge, subtotal, total_amount, payment_method } = body;

    const {
      data: { user },
      error: userError
    } = await supabaseServer.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized. Please login.' }, { status: 401 });
    }

    // Insert order with user_id
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
          payment_method: payment_method || 'UPI',
          status: 'new',
        },
      ])
      .select();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, order: data[0] });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
