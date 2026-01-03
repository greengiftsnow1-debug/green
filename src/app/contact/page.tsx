"use client";

import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const PHONE_NUMBER = "919243837464";     // 📞 Call number
const WHATSAPP_NUMBER = "919243837364";  // 💬 WhatsApp number

export default function ContactPage() {
  const ref = useScrollFadeIn();

  // 🔹 Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // 🔹 WhatsApp submit handler
  const handleWhatsAppSubmit = () => {
    if (!fullName || !message) {
      alert("Please enter your name and message");
      return;
    }

    const whatsappMessage = `
Hello Green Gift 🌿

Name: ${fullName}
Email: ${email || "Not provided"}

Message:
${message}
    `;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <section className="min-h-screen bg-[#E1EEBC] px-6 py-24">
      <div
        ref={ref}
        className="max-w-5xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-10"
      >
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-green-900 mb-4 text-center">
          Contact Green Gift 🌿
        </h1>
        <p className="text-center text-green-800 mb-10">
          We’d love to help you with gifting plants, orders, and support
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT: CONTACT INFO */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="text-green-700" />
              <div>
                <p className="font-semibold text-green-900">Call Us</p>
                <a
                  href={`tel:+${PHONE_NUMBER}`}
                  className="text-green-700 hover:underline"
                >
                  +91 92438 37364
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MessageCircle className="text-green-700" />
              <div>
                <p className="font-semibold text-green-900">WhatsApp</p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  className="text-green-700 hover:underline"
                >
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-green-700" />
              <div>
                <p className="font-semibold text-green-900">Email</p>
                <p className="text-green-700">
                  greengiftsnoww@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-green-700" />
              <div>
                <p className="font-semibold text-green-900">Location</p>
                <p className="text-green-700">
                  Patel Nagar, Bhopal, Madhya Pradesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-green-700" />
              <div>
                <p className="font-semibold text-green-900">Working Hours</p>
                <p className="text-green-700">
                  Mon – Sun | 9:00 AM – 9:00 PM
                </p>
              </div>
            </div>

            {/* QUICK ACTION BUTTONS */}
            <div className="flex gap-4 pt-4">
              <a
                href={`tel:+${PHONE_NUMBER}`}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl text-center font-semibold"
              >
                📞 Call Now
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-center font-semibold"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold text-green-900 mb-4">
              Send us a Message
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-600"
              />

              <input
                type="email"
                placeholder="Email Address (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-600"
              />

              <textarea
                rows={4}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-600"
              />

              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold"
              >
                Send via WhatsApp 💬
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
