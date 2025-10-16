// src/app/admin/orders/page.tsx
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { updateOrderStatus, updatePaymentStatus } from './actions';

export const dynamic = 'force-dynamic';

const badge = (value: string) => {
  const base = 'px-2 py-1 rounded text-xs font-semibold';
  switch (value) {
    case 'new': return `${base} bg-blue-100 text-blue-800`;
    case 'processing': return `${base} bg-amber-100 text-amber-800`;
    case 'shipped': return `${base} bg-purple-100 text-purple-800`;
    case 'delivered': return `${base} bg-green-100 text-green-800`;
    case 'cancelled': return `${base} bg-rose-100 text-rose-800`;
    default: return `${base} bg-gray-100 text-gray-800`;
  }
};

const payBadge = (value: string) => {
  const base = 'px-2 py-1 rounded text-xs font-semibold';
  switch (value) {
    case 'paid': return `${base} bg-green-100 text-green-800`;
    case 'failed': return `${base} bg-rose-100 text-rose-800`;
    default: return `${base} bg-gray-100 text-gray-800`;
  }
};

export default async function OrdersPage() {
  const { data: orders, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return <div className="p-8">Failed to load orders: {error.message}</div>;

  return (
    <section className="min-h-screen bg-[#E1EEBC] pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-900 mb-6">Orders</h1>

        <div className="overflow-x-auto rounded-2xl bg-white/60 backdrop-blur-md shadow">
          <table className="min-w-full text-sm">
            <thead className="text-left bg-white/70">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Address</th>
                <th className="p-3">Items</th>
                <th className="p-3">₹</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
                <th className="p-3 w-72">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(orders ?? []).map((o: any) => (
                <tr key={o.id} className="border-t border-green-200/40">
                  <td className="p-3 font-mono text-xs">{o.id}</td>
                  <td className="p-3">
                    <div className="font-semibold">{o.customer_name}</div>
                    <div className="text-gray-700">{o.customer_phone}</div>
                    <div className="text-gray-700">{o.customer_email}</div>
                  </td>
                  <td className="p-3">
                    <div className="max-w-xs truncate">{o.customer_address}</div>
                    <div className="text-gray-700">PIN: {o.customer_pincode}</div>
                  </td>
                  <td className="p-3 align-top">
                    <ul className="max-w-xs list-disc pl-4">
                      {Array.isArray(o.items) &&
                        o.items.map((it: any, idx: number) => {
                          const name = it?.name ?? it?.plant?.name ?? 'Item';
                          const price = it?.price ?? it?.plant?.price ?? 0;
                          const qty = it?.quantity ?? 1;
                          return (
                            <li key={idx}>
                              {name} — ₹{price} × {qty}
                            </li>
                          );
                        })}
                    </ul>
                  </td>
                  <td className="p-3">
                    <div>Subtotal: ₹{o.subtotal}</div>
                    <div>Delivery: ₹{o.delivery_charge}</div>
                    <div className="font-semibold">Total: ₹{o.total_amount}</div>
                  </td>
                  <td className="p-3">
                    <div className={payBadge(o.payment_status)}>{o.payment_status}</div>
                  </td>
                  <td className="p-3">
                    <div className={badge(o.status)}>{o.status}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {new Date(o.created_at).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <form action={updatePaymentStatus}>
                        <input type="hidden" name="id" value={o.id} />
                        <select name="payment_status" defaultValue={o.payment_status} className="border rounded px-2 py-1">
                          <option value="pending">pending</option>
                          <option value="paid">paid</option>
                          <option value="failed">failed</option>
                        </select>
                        <button className="ml-2 px-3 py-1 bg-green-700 text-white rounded">Save</button>
                      </form>

                      <form action={updateOrderStatus}>
                        <input type="hidden" name="id" value={o.id} />
                        <select name="status" defaultValue={o.status} className="border rounded px-2 py-1">
                          <option value="new">new</option>
                          <option value="processing">processing</option>
                          <option value="shipped">shipped</option>
                          <option value="delivered">delivered</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                        <button className="ml-2 px-3 py-1 bg-green-700 text-white rounded">Save</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}

              {(!orders || orders.length === 0) && (
                <tr>
                  <td className="p-6 text-center text-gray-700" colSpan={9}>
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
