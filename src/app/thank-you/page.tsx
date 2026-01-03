import { Suspense } from "react";
import ThankYouClient from "./ThankYouClient";

export default function ThankYouPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ThankYouClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Loading your order details...
    </div>
  );
}
