'use client';

const ORDER_PHONE = "919243837464";

export default function StickyInfoBar() {
  return (
    <div className="sticky top-[80px] z-40 bg-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm md:text-base">
        
        <p className="font-medium">
          🌿 Order Your Gifts instantly • Fast delivery in Bhopal
        </p>

        <a
          href={`tel:+${ORDER_PHONE}`}
          className="bg-white text-green-700 px-4 py-1.5 rounded-full font-semibold hover:bg-green-100 transition"
        >
          📞 Call Us
        </a>

      </div>
    </div>
  );
}
