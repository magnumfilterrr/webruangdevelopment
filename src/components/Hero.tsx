"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-200px] right-[-120px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl"
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-32 left-10 hidden lg:block"
      >
        <div className="w-20 h-20 border border-cyan-400/20 rounded-2xl rotate-12 backdrop-blur-sm bg-white/5" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-32 right-16 hidden lg:block"
      >
        <div className="w-28 h-28 border border-blue-400/20 rounded-full backdrop-blur-sm bg-white/5" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="max-w-4xl">
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
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-white"
          >
            {text}
            <span className="text-cyan-400 animate-pulse">|</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="mt-8 max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            Kami membantu UMKM, startup, dan bisnis modern membangun
            website yang cepat, premium, dan meningkatkan kredibilitas
            brand secara digital.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
            }}
            className="mt-12 flex flex-col sm:flex-row gap-5"
          >
            <a
              href="#kontak"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-white font-semibold shadow-2xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/40"
            >
              <span className="relative z-10">
                Mulai Project Sekarang
              </span>

              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 text-white font-semibold transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
            >
              Lihat Portfolio
            </a>
          </motion.div>

          {/* Stats */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.9,
            }}
            className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "50+",
                subtitle: "Project Selesai",
              },
              {
                title: "100%",
                subtitle: "Responsive Design",
              },
              {
                title: "24/7",
                subtitle: "Support & Maintenance",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
              >
                <h3 className="text-3xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  {item.subtitle}
                </p>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050816] to-transparent" />
    </section>
  );
}