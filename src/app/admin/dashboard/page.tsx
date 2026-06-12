'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { User } from 'firebase/auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const menus = [
  { icon: '🗂️', label: 'Portofolio', href: '/admin/projects', desc: 'Kelola project & portofolio' },
  { icon: '⚙️', label: 'Layanan', href: '/admin/services', desc: 'Kelola layanan & pricing' },
  { icon: '💰', label: 'Pricing', href: '/admin/pricing', desc: 'Kelola paket harga' },
  { icon: '✉️', label: 'Pesan Masuk', href: '/admin/messages', desc: 'Lihat pesan dari kontak' },
  { icon: '📱', label: 'Kontak', href: '/admin/contact', desc: 'Kelola info kontak & WhatsApp' },
];

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        router.push('/admin');
      }
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-blue-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">

      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-white font-bold text-lg">
          Ruang<span className="text-blue-500">.</span>Dev <span className="text-gray-400 font-normal text-sm ml-2">Admin</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300 border border-red-500/30 px-4 py-1.5 rounded-full transition-all"
          >
            Keluar
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-white text-2xl font-bold mb-2">Dashboard</h2>
        <p className="text-gray-400 text-sm mb-10">Selamat datang kembali! Kelola konten website kamu di sini.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <Link
              key={menu.label}
              href={menu.href}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{menu.icon}</div>
              <h3 className="text-white font-semibold text-lg">{menu.label}</h3>
              <p className="text-gray-400 text-sm mt-1">{menu.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}