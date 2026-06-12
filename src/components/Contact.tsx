"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Contact() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    email: "",
    instagram: "",
    address: "",
    whatsapp: "085162612828",
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "contact"));

        if (snap.exists()) {
          setContactInfo(snap.data() as typeof contactInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchContact();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      setSent(true);

      setForm({
        nama: "",
        email: "",
        pesan: "",
      });

      setTimeout(() => {
        setSent(false);
      }, 3000);
    } catch {
      alert("Gagal mengirim pesan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="kontak"
      className="relative overflow-hidden bg-[#050816] py-24"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Glow */}
        <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

              <span className="text-cyan-300 text-xs font-medium uppercase tracking-widest">
                Contact Us
              </span>
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight">
              Mari Bangun
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Project Anda
              </span>
            </h2>

            <p className="mt-6 text-gray-400 leading-relaxed text-base">
              Konsultasikan kebutuhan website atau sistem digital
              bisnis Anda bersama tim profesional Ruang Development.
            </p>

            {/* Contact Cards */}
            <div className="mt-10 space-y-4">
              {contactInfo.whatsapp && (
                <motion.a
                  whileHover={{
                    x: 5,
                  }}
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-xl">
                    📱
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      WhatsApp
                    </p>

                    <p className="text-white font-medium">
                      {contactInfo.whatsapp}
                    </p>
                  </div>
                </motion.a>
              )}

              {contactInfo.email && (
                <motion.div
                  whileHover={{
                    x: 5,
                  }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                    ✉️
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Email
                    </p>

                    <p className="text-white font-medium">
                      {contactInfo.email}
                    </p>
                  </div>
                </motion.div>
              )}

              {contactInfo.instagram && (
                <motion.div
                  whileHover={{
                    x: 5,
                  }}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-xl">
                    📸
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Instagram
                    </p>

                    <p className="text-white font-medium">
                      @{contactInfo.instagram}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl"
          >
            {/* Glow */}
            <div className="absolute -top-20 right-0 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <h3 className="text-2xl font-bold text-white">
                Konsultasi Gratis
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Isi form berikut dan tim kami akan segera
                menghubungi Anda.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* Input */}
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    placeholder="Masukkan nama"
                    value={form.nama}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nama: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400/30 focus:bg-cyan-500/[0.03]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="email@gmail.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400/30 focus:bg-cyan-500/[0.03]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Pesan
                  </label>

                  <textarea
                    placeholder="Ceritakan kebutuhan project Anda..."
                    rows={5}
                    value={form.pesan}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pesan: e.target.value,
                      })
                    }
                    required
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-cyan-400/30 focus:bg-cyan-500/[0.03]"
                  />
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40 disabled:opacity-50"
                >
                  {sent
                    ? "✓ Pesan Berhasil Dikirim"
                    : loading
                    ? "Mengirim..."
                    : "Kirim Pesan"}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
          }}
          className="mt-20 border-t border-white/10 pt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            © 2025 Ruang Development — Web & Mobile Solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
}