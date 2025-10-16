"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Green Gift?",
    answer: "Green Gift is an eco-friendly gifting platform where you can gift plants and spread happiness naturally.",
  },
  {
    question: "How can I place an order?",
    answer: "Simply browse plants, add them to your cart, and complete checkout with your details and payment.",
  },
  {
    question: "Do you provide delivery?",
    answer: "Yes, we provide doorstep delivery with a nominal delivery fee based on your location.",
  },
  {
    question: "Can I schedule a gift delivery?",
    answer: "Yes, you can schedule deliveries for birthdays, anniversaries, and special occasions.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We support UPI, Razorpay, and other secure online payment options.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left text-lg font-medium"
              >
                {faq.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 text-gray-600 border-t">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
