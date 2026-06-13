"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  category: string;
  tech: string[];
  color: string;
  imageUrl: string;
  projectUrl: string;
}

const defaultProjects: Project[] = [
  { id: "1", title: "SMK Nuurul Muttaqiin", category: "Website Sekolah", tech: ["Flutter Web", "Firebase"], color: "from-blue-600/20 to-purple-600/20", imageUrl: "", projectUrl: "" },
  { id: "2", title: "Ruang Development", category: "Agency Website", tech: ["Next.js", "TypeScript"], color: "from-cyan-600/20 to-blue-600/20", imageUrl: "", projectUrl: "" },
  { id: "3", title: "Toko UMKM Online", category: "E-Commerce", tech: ["Next.js", "Firebase"], color: "from-blue-600/20 to-cyan-600/20", imageUrl: "", projectUrl: "" },
];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snap = await getDocs(collection(db, "projects"));
        if (!snap.empty) {
          setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project)));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="relative overflow-hidden bg-[#050816] py-28 px-6">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
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
              Portfolio Kami
            </span>
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight">
            Project Digital
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Yang Telah Kami Kerjakan
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            Website modern, dashboard bisnis, dan platform digital yang
            dirancang dengan performa tinggi dan desain premium.
          </p>

          {/* Stats */}
          <div className="mt-10 flex items-center justify-center gap-8">
            {[
              { value: `${projects.length}+`, label: "Project Selesai" },
              { value: "100%", label: "Client Puas" },
              { value: "Fast", label: "Delivery" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30"
            >
              {/* Glow Hover */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-32 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
              </div>

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />

                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width:768px)100vw,33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="text-7xl font-bold text-white/10"
                    >
                      {project.title.charAt(0)}
                    </motion.div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-black/20 to-transparent opacity-80" />

                {/* Tech badges */}
                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                  {project.tech.slice(0, 2).map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-black/30 backdrop-blur-md px-3 py-1 text-xs text-white">
                      {t}
                    </span>
                  ))}
                </div>
                

                {/* Hover Button */}
                {project.projectUrl && (
                  <a
                  
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
                  >
                  
                    <div className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-4 text-sm font-semibold text-white shadow-2xl shadow-cyan-500/20">
                      Lihat Project <span>→</span>
                    </div>
                  </a>
                )}
              </div>

              {/* Content */}
              <div className="relative p-7">
                <span className="text-sm font-medium text-cyan-400">{project.category}</span>
                <h3 className="mt-3 text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300">
                  {project.title}
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="rounded-full border border-cyan-500/10 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 h-[1px] w-full bg-gradient-to-r from-cyan-500/20 to-transparent" />

                {/* Bottom row */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Project #{String(index + 1).padStart(2, '0')}
                  </span>
                  {project.projectUrl && (
                    <a
                    
                      href={project.projectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      Visit <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
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

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs text-cyan-300 font-medium uppercase tracking-wider">
                  Punya Ide Project?
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Wujudkan Ide
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> Bisnis Anda</span>
              </h3>

              <p className="text-gray-400 max-w-xl mx-auto mb-8">
                Kami siap membantu membangun website dan sistem digital modern
                sesuai kebutuhan bisnis Anda. Konsultasi gratis, tanpa komitmen.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                
                  href="#kontak"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-2xl shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/40"
                >
                  Mulai Project Sekarang <span>→</span>
                </a>
                <a
                
                  href="#layanan"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
                >
                  Lihat Layanan
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}