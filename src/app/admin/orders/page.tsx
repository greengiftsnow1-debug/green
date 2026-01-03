// src/app/admin/orders/page.tsx
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { updateOrderStatus, updatePaymentStatus } from "./actions";

export const dynamic = "force-dynamic";

/* ---------- BADGES ---------- */
const badge = (value: string) => {
  const base = "px-2 py-1 rounded-full text-xs font-semibold";
  switch (value) {
    case "new": return `${base} bg-blue-100 text-blue-800`;
    case "processing": return `${base} bg-amber-100 text-amber-800`;
    case "shipped": return `${base} bg-purple-100 text-purple-800`;
    case "delivered": return `${base} bg-green-100 text-green-800`;
    case "cancelled": return `${base} bg-rose-100 text-rose-800`;
    default: return `${base} bg-gray-100 text-gray-800`;
  }
};

const payBadge = (value: string) => {
  const base = "px-2 py-1 rounded-full text-xs font-semibold";
  switch (value) {
    case "paid": return `${base} bg-green-100 text-green-800`;
    case "failed": return `${base} bg-rose-100 text-rose-800`;
    case "pending": return `${base} bg-yellow-100 text-yellow-800`;
    default: return `${base} bg-gray-100 text-gray-800`;
  }
};

/* ---------- PAGE ---------- */
export default async function OrdersPage() {
  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-10 text-red-700">Failed to load orders</div>;
  }

  const totalRevenue =
    orders?.reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0) ?? 0;

  return (
    <section className="min-h-screen bg-[#E1EEBC] pt-24 px-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ---------- HEADER ---------- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-green-900">
            Orders Dashboard
          </h1>

          <div className="flex gap-3">
            <input
              placeholder="Search name / phone / email / order id"
              className="px-4 py-2 rounded-xl border w-72"
            />
            <select className="px-3 py-2 rounded-xl border">
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* ---------- STATS ---------- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Orders" value={orders?.length ?? 0} />
          <StatCard
            title="Pending"
            value={orders?.filter((o: any) => o.status === "new").length ?? 0}
          />
          <StatCard
            title="Delivered"
            value={orders?.filter((o: any) => o.status === "delivered").length ?? 0}
          />
          <StatCard title="Revenue" value={`₹${totalRevenue}`} />
        </div>

        {/* ---------- TABLE ---------- */}
        <div className="overflow-x-auto rounded-2xl bg-white shadow">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-green-800 text-white">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders?.map((o: any) => (
                <tr key={o.id} className="border-t hover:bg-green-50">
                  <td className="p-3 font-mono text-xs">
                    {o.id.slice(0, 8)}…
                  </td>

                  <td className="p-3">
                    <div className="font-semibold">{o.customer_name}</div>
                    <div className="text-xs text-gray-600">{o.customer_phone}</div>
                    <div className="text-xs text-gray-600">{o.customer_email}</div>
                  </td>

                  <td className="p-3">
                    <ul className="space-y-1">
                      {Array.isArray(o.items) &&
                        o.items.map((it: any, i: number) => (
                          <li key={i} className="text-xs">
                            • {it.name} × {it.qty}
                          </li>
                        ))}
                    </ul>
                  </td>

                  <td className="p-3">
                    <div className="font-semibold">₹{o.total_amount}</div>
                    <div className="text-xs text-gray-600">
                      Delivery ₹{o.delivery_charge}
                    </div>
                  </td>

                  <td className="p-3">
                    <span className={payBadge(o.payment_status)}>
                      {o.payment_status}
                    </span>
                  </td>

                  <td className="p-3">
                    <span className={badge(o.status)}>{o.status}</span>
                  </td>

                  <td className="p-3 text-xs">
                    {new Date(o.created_at).toLocaleString()}
                  </td>

                  <td className="p-3 space-y-2">
                    <form action={updatePaymentStatus} className="flex gap-2">
                      <input type="hidden" name="id" value={o.id} />
                      <select
                        name="payment_status"
                        defaultValue={o.payment_status}
                        className="border rounded px-2 py-1 text-xs"
                      >
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                        <option value="failed">failed</option>
                      </select>
                      <button className="px-3 py-1 bg-green-700 text-white rounded text-xs">
                        Save
                      </button>
                    </form>

                    <form action={updateOrderStatus} className="flex gap-2">
                      <input type="hidden" name="id" value={o.id} />
                      <select
                        name="status"
                        defaultValue={o.status}
                        className="border rounded px-2 py-1 text-xs"
                      >
                        <option value="new">new</option>
                        <option value="processing">processing</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                      <button className="px-3 py-1 bg-green-700 text-white rounded text-xs">
                        Save
                      </button>
                    </form>
                  </td>
                </tr>
              ))}

              {orders?.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-500">
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

/* ---------- SMALL COMPONENT ---------- */
function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold text-green-900">{value}</div>
    </div>
  );
}
