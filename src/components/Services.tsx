"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Service {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

const defaultServices = [
  { id: "1", icon: "🌐", title: "Website Company Profile", desc: "Tampilkan bisnis kamu secara profesional dengan website modern dan elegan." },
  { id: "2", icon: "🛒", title: "Toko Online", desc: "Jual produk secara online dengan sistem cepat, aman, dan mudah dikelola." },
  { id: "3", icon: "📱", title: "Landing Page", desc: "Halaman promosi modern yang dioptimalkan untuk meningkatkan konversi." },
  { id: "4", icon: "⚙️", title: "Web App & Dashboard", desc: "Sistem dashboard dan manajemen bisnis yang powerful dan scalable." },
  { id: "5", icon: "🔍", title: "SEO Optimization", desc: "Optimasi SEO agar website mudah ditemukan di Google dan mesin pencari." },
  { id: "6", icon: "🚀", title: "Maintenance & Support", desc: "Support teknis dan maintenance profesional setelah website selesai dibuat." },
];

export default function Services() {
  const [services, setServices] = useState<Service[]>(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDocs(collection(db, "services"));
        if (!snap.empty) {
          setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service)));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="layanan" className="relative overflow-hidden bg-[#050816] py-28 px-6">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm tracking-wide text-cyan-300 font-medium uppercase">
              Layanan Kami
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight">
            Solusi Digital Modern
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Untuk Bisnis Anda
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Kami membantu bisnis berkembang melalui website premium, dashboard
            modern, dan solusi digital yang cepat, aman, serta profesional.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 transition-all duration-500 hover:border-cyan-400/30 hover:bg-white/[0.05] flex flex-col"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-24 right-0 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl" />
              </div>

              {/* Top Border */}
              <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 group-hover:w-full" />

              {/* Number */}
              <span className="absolute top-6 right-6 text-5xl font-bold text-white/5 group-hover:text-white/10 transition-all duration-500 select-none">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 5, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 text-3xl backdrop-blur-md"
              >
                {service.icon}
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300">
                {service.title}
              </h3>

              <p className="mt-4 text-gray-400 leading-relaxed flex-1">
                {service.desc}
              </p>

              {/* Learn More */}
              
            </motion.div>
          ))}
        </div>
        

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-xl p-12 text-center">
            {/* Background glow */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-cyan-500/10 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs text-cyan-300 font-medium uppercase tracking-wider">
                  Konsultasi Gratis
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Siap Meningkatkan
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> Bisnis Anda?</span>
              </h3>

              <p className="text-gray-400 max-w-xl mx-auto mb-8">
                Konsultasikan kebutuhan website atau sistem bisnis Anda bersama
                tim profesional kami. Gratis, tanpa komitmen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                
                  href="#kontak"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-2xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/40"
                >
                  Mulai Konsultasi
                  <span>→</span>
                </a>
                <a
                
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
                >
                  Lihat Harga
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}