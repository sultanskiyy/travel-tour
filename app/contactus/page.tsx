"use client";

import { FormEvent, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactUs() {
  const [loading, setLoading] = useState<boolean>(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setOk(null);
    setErr(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to send");

      setOk("Message sent ✅");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "Something went wrong";
      setErr(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative h-60 md:h-75 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-4xl font-extrabold">
            Contact Us
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-330 mx-auto px-4 lg:pb-60 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 grid place-items-center">
                <FaMapMarkerAlt className="text-emerald-500" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 mb-3">Location</p>

                <p className="text-gray-500 text-xs mb-1 font-semibold">
                  Travel Agency
                </p>
                <p className="text-gray-400 text-xs leading-5">
                  1234 Michigan Ave, Miami Beach
                </p>

                <p className="text-gray-500 text-xs mt-4 mb-1 font-semibold">
                  Tour Operator
                </p>
                <p className="text-gray-400 text-xs leading-5">
                  500 Ocean Drive, Miami
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 grid place-items-center">
                <FaPhoneAlt className="text-emerald-500" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 mb-3">Give us a call</p>

                <p className="text-gray-500 text-xs mb-1 font-semibold">
                  Mobile Number
                </p>
                <p className="text-gray-400 text-xs leading-5">
                  +998 (90) 123-45-67
                </p>

                <p className="text-gray-500 text-xs mt-4 mb-1 font-semibold">
                  Office Number
                </p>
                <p className="text-gray-400 text-xs leading-5">
                  +998 (71) 200-00-00
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 grid place-items-center">
                <FaEnvelope className="text-emerald-500" />
              </div>
              <div className="text-sm w-full">
                <p className="font-semibold text-gray-900 mb-3">
                  Write for anything
                </p>

                <p className="text-gray-500 text-xs mb-1 font-semibold">quotes</p>
                <p className="text-gray-400 text-xs leading-5">
                  quote@travel.com and information.
                </p>

                <p className="text-gray-500 text-xs mt-4 mb-1 font-semibold">
                  Consulting
                </p>
                <p className="text-gray-400 text-xs leading-5">
                  info@travel.com every day.
                </p>

                <div className="mt-5 flex gap-3">
                  <button className="bg-sky-500 hover:bg-sky-600 transition text-white text-xs font-semibold px-4 py-2 rounded-md">
                    All Demos
                  </button>
                  <button className="bg-emerald-500 hover:bg-emerald-600 transition text-white text-xs font-semibold px-4 py-2 rounded-md">
                    Purchase Theme
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="h-140 md:h-155 w-full pt-0">
          <iframe
            title="Map"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=London%20Eye&z=14&output=embed"
          />
        </div>

        {/* ✅ FIX: map drag ishlashi uchun wrapper click-through */}
        <div className="absolute left-0 right-0 top-0 pointer-events-none">
          <div className="max-w-330 mx-auto px-4 sm:px-6">
            {/* ✅ FIX: form o'zi ishlashi uchun pointer-events-auto */}
            <div className="-translate-y-56 md:-translate-y-64 bg-gray-100 rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto z-10 relative pointer-events-auto">
              <p className="text-emerald-500 text-sm text-center mb-2">
                Your Next Trip
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900">
                Get in Touch
              </h2>

              <p className="text-center text-gray-500 text-sm mt-3">
                Write to us for personalized travel advice or for information on
                group travel and last minute travel, all travel is insured and
                safe.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <input
                  name="name"
                  required
                  placeholder="Type your name"
                  className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Insert your email"
                  className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Your message"
                  rows={5}
                  className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400"
                />

                <button
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 transition text-white text-sm font-semibold py-3 rounded-md"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>

                {ok && (
                  <p className="text-center text-sm text-emerald-600">{ok}</p>
                )}
                {err && (
                  <p className="text-center text-sm text-red-500">{err}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}