"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

export default function Contact() {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });
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
        if (snap.exists()) setContactInfo(snap.data() as typeof contactInfo);
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
      setForm({ nama: "", email: "", pesan: "" });
      setTimeout(() => setSent(false), 3000);
    } catch {
      alert("Gagal mengirim pesan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    contactInfo.whatsapp && {
      href: `https://wa.me/${contactInfo.whatsapp.replace(/^0/, "62")}`,
      icon: "📱",
      bg: "bg-green-500/10",
      label: "WhatsApp",
      value: contactInfo.whatsapp,
    },
    contactInfo.email && {
      href: `mailto:${contactInfo.email}`,
      icon: "✉️",
      bg: "bg-blue-500/10",
      label: "Email",
      value: contactInfo.email,
    },
    contactInfo.instagram && {
      href: `https://instagram.com/${contactInfo.instagram}`,
      icon: "📸",
      bg: "bg-pink-500/10",
      label: "Instagram",
      value: `@${contactInfo.instagram}`,
    },
    contactInfo.address && {
      href: "#",
      icon: "📍",
      bg: "bg-orange-500/10",
      label: "Alamat",
      value: contactInfo.address,
    },
  ].filter(Boolean);

  return (
    <section id="kontak" className="relative overflow-hidden bg-[#050816] py-28 px-6">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
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

            <p className="mt-6 text-gray-400 leading-relaxed">
              Konsultasikan kebutuhan website atau sistem digital bisnis Anda
              bersama tim profesional Ruang Development. Gratis, tanpa komitmen.
            </p>

            {/* Response time badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 text-xs font-medium">
                Respon dalam 1x24 jam
              </span>
            </div>

            {/* Contact Cards */}
            <div className="mt-8 space-y-3">
              {contactCards.map((card, i) => card && (
                <motion.a
                  key={i}
                  whileHover={{ x: 5 }}
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/20 group"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.bg} text-xl flex-shrink-0`}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{card.label}</p>
                    <p className="text-white font-medium text-sm">{card.value}</p>
                  </div>
                  <span className="text-gray-600 group-hover:text-cyan-400 transition-colors">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl"
          >
            <div className="absolute -top-20 right-0 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl" />
            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500" />

            <div className="relative">
              <h3 className="text-2xl font-bold text-white">Konsultasi Gratis</h3>
              <p className="mt-2 text-sm text-gray-400">
                Isi form berikut dan tim kami akan segera menghubungi Anda.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs text-gray-400 uppercase tracking-wider">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Ahmad"
                      value={form.nama}
                      onChange={(e) => setForm({ ...form, nama: e.target.value })}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-600 outline-none transition-all duration-300 focus:border-cyan-400/30 focus:bg-cyan-500/[0.03] text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs text-gray-400 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-600 outline-none transition-all duration-300 focus:border-cyan-400/30 focus:bg-cyan-500/[0.03] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs text-gray-400 uppercase tracking-wider">
                    Pesan
                  </label>
                  <textarea
                    placeholder="Ceritakan kebutuhan project Anda... (jenis website, fitur yang diinginkan, budget, dll)"
                    rows={5}
                    value={form.pesan}
                    onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                    required
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-600 outline-none transition-all duration-300 focus:border-cyan-400/30 focus:bg-cyan-500/[0.03] text-sm"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-sm font-semibold text-white shadow-xl shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40 disabled:opacity-50"
                >
                  {sent ? "✓ Pesan Berhasil Dikirim!" : loading ? "Mengirim..." : "Kirim Pesan →"}
                </motion.button>

                <p className="text-center text-xs text-gray-600">
                  Dengan mengirim form ini, Anda menyetujui untuk dihubungi oleh tim kami.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 border-t border-white/10 pt-10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center overflow-hidden">
                <Image src="/putih.png" alt="Logo" width={28} height={28} className="object-contain" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Ruang Development</p>
                <p className="text-gray-500 text-xs">Web & Mobile Solutions</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              {["Layanan", "Portfolio", "Pricing", "Kontak"].map((item) => (
                <a
                
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-500 hover:text-cyan-400 transition-colors text-sm"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Ruang Development
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}