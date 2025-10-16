// src/app/admin/orders/actions.ts
'use server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(formData: FormData) {
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;
  if (!id || !status) return;
  await supabaseAdmin.from('orders').update({ status }).eq('id', id);
  revalidatePath('/admin/orders');
}

export async function updatePaymentStatus(formData: FormData) {
  const id = formData.get('id') as string;
  const payment_status = formData.get('payment_status') as string;
  if (!id || !payment_status) return;
  await supabaseAdmin.from('orders').update({ payment_status }).eq('id', id);
  revalidatePath('/admin/orders');
}
