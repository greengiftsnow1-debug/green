import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const {
      user_id,
      name,
      email,
      phone,
      address,
      pincode,
      cart_items,
      delivery_charge,
      total_amount,
      payment_id,
    } = body;

    const { data, error } = await supabase.from("orders").insert({
      user_id,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      customer_address: address,
      customer_pincode: pincode,
      items: cart_items,
      delivery_charge,
      subtotal: total_amount - delivery_charge,
      total_amount,
      payment_id,
      payment_method: "razorpay",
      payment_status: "paid",
      status: "new",
    }).select().single();

    if (error) {
      console.log("Supabase Insert Error:", error);
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    return NextResponse.json({ success: true, order: data });
  } catch (err: any) {
    console.error("Order API Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
