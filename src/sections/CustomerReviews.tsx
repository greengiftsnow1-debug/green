'use client';

import Image from 'next/image';

const reviews = [
  {
    name: 'Anita Sharma',
    image: '/images/customer1.jpg',
    message: 'Absolutely loved the packaging and the quality of the plant. Perfect gift!',
    rating: 5,
  },
  {
    name: 'Rahul Mehta',
    image: '/images/customer2.jpg',
    message: 'Super fresh plant. Delivered on time and with a lovely note.',
    rating: 4,
  },
  {
    name: 'Sanya Kapoor',
    image: '/images/customer3.jpg',
    message: 'A beautiful and eco-friendly gift. My friend was so happy!',
    rating: 5,
  },
];

export default function CustomerReviews() {
  return (
    <section className="bg-[#E1EEBC] py-16">
      <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Customer Reviews</h2>

      <div className="overflow-x-auto flex flex-row-reverse gap-6 px-4 md:px-12 snap-x snap-mandatory">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="min-w-[280px] snap-start bg-white/30 backdrop-blur-md shadow-lg p-6 rounded-3xl border border-white/40 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <Image
                src={review.image}
                alt={review.name}
                width={100}
                height={100}
                className="rounded-full mb-4 object-cover"
              />
              <p className="text-gray-800 mb-2 italic">"{review.message}"</p>
              <div className="text-yellow-500 text-lg mb-1">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p className="text-green-800 font-semibold">{review.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
