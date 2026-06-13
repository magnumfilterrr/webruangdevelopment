"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Plan {
  id: string;
  name: string;
  priceMin: string;
  priceMax: string;
  desc: string;
  features: string[];
  highlighted: boolean;
}

const defaultPlans: Plan[] = [
  {
    id: "1",
    name: "Starter Website",
    priceMin: "700.000",
    priceMax: "",
    desc: "Cocok untuk personal branding, UMKM, dan usaha baru.",
    features: ["Free Domain + Hosting", "1 Landing Page", "Responsive Design", "WhatsApp Integration", "Free Revisi 2x"],
    highlighted: false,
  },
  {
    id: "2",
    name: "Professional Business",
    priceMin: "2.000.000",
    priceMax: "3.500.000",
    desc: "Website profesional untuk meningkatkan kredibilitas bisnis.",
    features: ["10 Halaman Website", "Premium Design", "SEO Optimization", "Admin Dashboard", "Free Maintenance"],
    highlighted: true,
  },
  {
    id: "3",
    name: "Ultimate Business System",
    priceMin: "4.000.000",
    priceMax: "",
    desc: "Solusi lengkap untuk bisnis modern dengan fitur advanced.",
    features: ["Full Custom Website", "Premium Dashboard", "Advanced SEO", "Realtime Database", "Priority Support"],
    highlighted: false,
  },
];

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>(defaultPlans);
  const [whatsapp, setWhatsapp] = useState("085162612828");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDocs(collection(db, "pricing"));
        if (!snap.empty) {
          setPlans(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Plan)));
        }
        const contactSnap = await getDoc(doc(db, "settings", "contact"));
        if (contactSnap.exists() && contactSnap.data().whatsapp) {
          setWhatsapp(contactSnap.data().whatsapp);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handlePilihPaket = (plan: Plan) => {
    const formatted = whatsapp.replace(/^0/, "62");
    const pesan =
`Halo Ruang Development! 👋

Saya tertarik dengan paket *${plan.name}*

💰 *Harga:* ${
      plan.priceMin === "Custom"
        ? "Custom"
        : `Rp ${plan.priceMin}${plan.priceMax ? ` – Rp ${plan.priceMax}` : ""}`
    }
📝 *Deskripsi:* ${plan.desc}

✅ *Fitur yang didapat:*
${plan.features.map((f) => `• ${f}`).join("\n")}

Boleh saya konsultasi lebih lanjut?`;
    window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(pesan)}`, "_blank");
  };

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#050816] py-28 px-6">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-xs font-medium uppercase tracking-widest">Pricing</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Paket Website
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Profesional
            </span>
          </h2>

          <p className="mt-5 text-gray-400 text-base leading-relaxed">
            Harga transparan tanpa biaya tersembunyi. Pilih paket yang sesuai dengan kebutuhan bisnis Anda.
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {["✅ Tanpa Biaya Tersembunyi", "🔒 Garansi Revisi", "⚡ Fast Delivery"].map((badge) => (
              <span key={badge} className="text-xs text-gray-400 border border-white/10 rounded-full px-4 py-1.5 bg-white/5">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 ${
                plan.highlighted
                  ? "border-cyan-400/30 bg-gradient-to-b from-cyan-500/10 to-blue-600/10 shadow-xl shadow-cyan-500/10"
                  : "border-white/10 bg-white/[0.03] hover:border-cyan-400/20"
              }`}
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-24 right-0 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl" />
              </div>

              {/* Top gradient line */}
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500" />
              )}

              {/* Badge */}
              {plan.highlighted && (
                <div className="absolute top-5 right-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1 text-[10px] font-semibold text-white uppercase tracking-wider shadow-lg shadow-cyan-500/20">
                  ⭐ Popular
                </div>
              )}

              <div className="relative p-7 flex flex-col h-full">
                {/* Title */}
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Mulai dari</p>
                  <div className="flex items-end gap-1">
                    {plan.priceMin === "Custom" ? (
                      <span className="text-4xl font-bold text-white tracking-tight">Custom</span>
                    ) : (
                      <>
                        <span className="text-cyan-400 text-lg font-medium">Rp</span>
                        <span className="text-4xl font-bold text-white tracking-tight">{plan.priceMin}</span>
                      </>
                    )}
                  </div>
                  {plan.priceMax && (
                    <p className="mt-1 text-sm text-gray-500">sampai Rp {plan.priceMax}</p>
                  )}
                </div>

                {/* Divider */}
                <div className="my-6 h-px w-full bg-gradient-to-r from-cyan-500/20 to-transparent" />

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 text-xs flex-shrink-0">
                        ✓
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePilihPaket(plan)}
                  className={`mt-8 w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-semibold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                      : "border border-white/10 bg-white/[0.03] text-white hover:border-cyan-400/30 hover:bg-cyan-500/10"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Pilih Paket
                </motion.button>

                {/* Note */}
                <p className="mt-3 text-center text-xs text-gray-600">
                  Konsultasi gratis sebelum memilih
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Butuh paket custom? {" "}
            <a
            
              href="#kontak"
              className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4"
            >
            
              Hubungi kami
            </a>
            {" "} untuk diskusi lebih lanjut.
          </p>
        </motion.div>
      </div>
    </section>
  );
}