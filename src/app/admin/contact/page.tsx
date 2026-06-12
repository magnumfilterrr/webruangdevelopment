'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ContactSettings {
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  instagram: string;
  address: string;
}

const defaultSettings: ContactSettings = {
  whatsapp: '085162612828',
  whatsappMessage: 'Halo Ruang Development, saya ingin konsultasi mengenai pembuatan website.',
  email: '',
  instagram: '',
  address: '',
};

export default function ContactSettings() {
  const [form, setForm] = useState<ContactSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push('/admin');
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    const fetchContact = async () => {
      const snap = await getDoc(doc(db, 'settings', 'contact'));
      if (snap.exists()) {
        setForm(snap.data() as ContactSettings);
      }
      setLoading(false);
    };
    fetchContact();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await setDoc(doc(db, 'settings', 'contact'), form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-blue-400 animate-pulse">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-white font-bold text-lg">
          Ruang<span className="text-blue-500">.</span>Dev <span className="text-gray-400 font-normal text-sm ml-2">Admin</span>
        </h1>
        <Link href="/admin/dashboard" className="text-sm text-gray-400 hover:text-white transition-all">
          ← Dashboard
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h2 className="text-white text-2xl font-bold mb-2">Kelola Kontak</h2>
        <p className="text-gray-400 text-sm mb-8">Pengaturan kontak yang tampil di website dan tombol WhatsApp.</p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* WhatsApp */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <span className="text-green-400">📱</span> WhatsApp
            </h3>
            <div>
              <p className="text-gray-400 text-xs mb-1">Nomor WhatsApp</p>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500 text-sm">+62</span>
                <input
                  type="text"
                  placeholder="85162612828"
                  value={form.whatsapp.replace(/^62/, '0')}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Pesan otomatis saat customer klik tombol WhatsApp</p>
              <textarea
                placeholder="Halo, saya ingin konsultasi..."
                value={form.whatsappMessage}
                onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Info Kontak Lainnya */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <span>📬</span> Info Kontak Lainnya
            </h3>
            <div>
              <p className="text-gray-400 text-xs mb-1">Email</p>
              <input
                type="email"
                placeholder="ruangdevelopment@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Instagram</p>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500 text-sm">@</span>
                <input
                  type="text"
                  placeholder="ruangdevelopment"
                  value={form.instagram.replace('@', '')}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Alamat</p>
              <textarea
                placeholder="Jl. Contoh No. 123, Kota, Provinsi"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-full transition-all"
          >
            {saved ? '✓ Tersimpan!' : saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </button>
        </form>
      </main>
    </div>
  );
}