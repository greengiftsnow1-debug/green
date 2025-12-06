import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin"; // use Service Role Key

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      address,
      pincode,
      store_pin,
      cart_items,
      delivery_charge,
      total_amount,
      payment_id,
    } = body;

    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        customer_address: address,
        customer_pincode: pincode,
        store_pin,
        items: cart_items,
        delivery_charge,
        subtotal: total_amount - delivery_charge,
        total_amount,
        payment_id,
        payment_method: "razorpay",
        payment_status: "paid",
        status: "new",
      })
      .select()
      .single();

    if (error) {
      console.log("❌ Order Insert Error:", error);
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    return NextResponse.json({ success: true, order: data });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
