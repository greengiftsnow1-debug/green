import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "order_receipt_" + Date.now(),
    };

    const order = await instance.orders.create(options);

    return NextResponse.json({ orderId: order.id });
  } catch (err: any) {
    console.error("Razorpay Order Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
