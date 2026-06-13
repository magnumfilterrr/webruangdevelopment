"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { title: "50+", subtitle: "Project Selesai" },
  { title: "100%", subtitle: "Responsive Design" },
  { title: "24/7", subtitle: "Support & Maintenance" },
];

const floatingCards = [
  { icon: "🚀", label: "Fast Performance", value: "99/100", color: "cyan" },
  { icon: "🔒", label: "Secure & Reliable", value: "SSL Ready", color: "blue" },
  {
    icon: "📱",
    label: "Mobile Friendly",
    value: "All Devices",
    color: "indigo",
  },
];

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Website Profesional untuk Bisnis Modern.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Glow Effects */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-200px] right-[-120px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Shapes */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-10 hidden lg:block"
      >
        <div className="w-20 h-20 border border-cyan-400/20 rounded-2xl rotate-12 backdrop-blur-sm bg-white/5" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-16 hidden lg:block"
      >
        <div className="w-28 h-28 border border-blue-400/20 rounded-full backdrop-blur-sm bg-white/5" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 pb-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 mb-8 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm font-medium tracking-wide text-cyan-300">
                RUANG DEVELOPMENT
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white font-bold"
            >
              {text}
              <span className="text-cyan-400 animate-pulse">|</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 max-w-xl text-lg text-gray-400 leading-relaxed"
            >
              Kami membantu UMKM, startup, dan bisnis modern membangun website
              yang cepat, premium, dan meningkatkan kredibilitas brand secara
              digital.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#kontak"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-white font-semibold shadow-2xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/40"
              >
                <span className="relative z-10">Mulai Project Sekarang</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
              >
                Lihat Portfolio
                <span className="text-cyan-400">→</span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-9 grid grid-cols-3 gap-4"
            >
              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-center"
                >
                  <h3 className="text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">{item.subtitle}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex flex-col gap-4 relative"
          >
            {/* Main Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 bg-white/10 rounded-full h-6 px-3 flex items-center">
                  <span className="text-gray-400 text-xs">
                    ruangdevelopment.my.id
                  </span>
                </div>
              </div>
              {/* Fake website preview */}
              <div className="space-y-3">
                <div className="h-3 bg-white/10 rounded-full w-3/4" />
                <div className="h-3 bg-cyan-500/20 rounded-full w-1/2" />
                <div className="h-2 bg-white/5 rounded-full w-full" />
                <div className="h-2 bg-white/5 rounded-full w-5/6" />
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-xl bg-white/5 border border-white/10"
                    />
                  ))}
                </div>
                <div className="h-8 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 w-1/3" />
              </div>
            </motion.div>

            {/* Feature Cards */}
            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                whileHover={{ x: -5 }}
                className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 ${
                  index === 1 ? "ml-8" : index === 2 ? "ml-4" : ""
                }`}
              >
                <div className="text-2xl">{card.icon}</div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">
                    {card.label}
                  </p>
                  <p className="text-gray-400 text-xs">{card.value}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-cyan-400" />
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050816] to-transparent" />
    </section>
  );
}
