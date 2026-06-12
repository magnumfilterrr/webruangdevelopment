"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Service {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

const emptyForm = { icon: "🌐", title: "", desc: "" };
const icons = ["🌐", "🛒", "📱", "⚙️", "🔍", "🚀", "💼", "🎨"];

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const fetchServices = async () => {
    const snap = await getDocs(collection(db, "services"));
    setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Service));
    setLoading(false);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push("/admin");
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
  const load = async () => {
    await fetchServices();
  };

  load();
}, []);

  

  const handleEdit = (service: Service) => {
    setEditId(service.id);
    setForm({ icon: service.icon, title: service.title, desc: service.desc });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (editId) {
      await updateDoc(doc(db, "services", editId), form);
    } else {
      await addDoc(collection(db, "services"), {
        ...form,
        createdAt: serverTimestamp(),
      });
    }
    await fetchServices();
    handleCancel();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "services", id));
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-white font-bold text-lg">
          Ruang<span className="text-blue-500">.</span>Dev{" "}
          <span className="text-gray-400 font-normal text-sm ml-2">Admin</span>
        </h1>
        <Link
          href="/admin/dashboard"
          className="text-sm text-gray-400 hover:text-white transition-all"
        >
          ← Dashboard
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-2xl font-bold">Layanan</h2>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditId(null);
              setForm(emptyForm);
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all"
          >
            {showForm ? "Batal" : "+ Tambah Layanan"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-blue-500/30 rounded-2xl p-6 mb-8 space-y-4"
          >
            <h3 className="text-white font-semibold">
              {editId ? "Edit Layanan" : "Tambah Layanan Baru"}
            </h3>
            <div>
              <p className="text-gray-400 text-sm mb-2">Pilih icon:</p>
              <div className="flex gap-3 flex-wrap">
                {icons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setForm({ ...form, icon })}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all ${
                      form.icon === icon
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              placeholder="Nama layanan"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            <textarea
              placeholder="Deskripsi layanan"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              required
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-full transition-all"
              >
                {saving
                  ? "Menyimpan..."
                  : editId
                    ? "Update Layanan"
                    : "Simpan Layanan"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 border border-white/10 text-gray-400 hover:text-white py-3 rounded-full transition-all"
              >
                Batal
              </button>
            </div>
          </form>
        )}

        {/* List */}
        {loading ? (
          <div className="text-blue-400 animate-pulse">Memuat data...</div>
        ) : services.length === 0 ? (
          <div className="text-gray-400 text-center py-12">
            Belum ada layanan.
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{service.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-400 hover:text-blue-300 text-sm border border-blue-500/30 px-3 py-1 rounded-full transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="text-red-400 hover:text-red-300 text-sm border border-red-500/30 px-3 py-1 rounded-full transition-all"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
