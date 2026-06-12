'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Plan {
  id: string;
  name: string;
  priceMin: string;
  priceMax: string;
  desc: string;
  features: string[];
  highlighted: boolean;
}

const emptyForm = { name: '', priceMin: '', priceMax: '', desc: '', features: '', highlighted: false };

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const fetchPlans = async () => {
    const snap = await getDocs(collection(db, 'pricing'));
    setPlans(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Plan)));
    setLoading(false);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push('/admin');
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
  const load = async () => {
    await fetchPlans();
  };

  load();
}, []);

  

  const handleEdit = (plan: Plan) => {
  setEditId(plan.id);
  setForm({
    name: plan.name,
    priceMin: plan.priceMin,
    priceMax: plan.priceMax || '',
    desc: plan.desc,
    features: plan.features.join('\n'),
    highlighted: plan.highlighted,
  });
  setShowForm(true);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = {
  ...form,
  features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
};

    if (editId) {
      await updateDoc(doc(db, 'pricing', editId), data);
    } else {
      await addDoc(collection(db, 'pricing'), { ...data, createdAt: serverTimestamp() });
    }

    await fetchPlans();
    handleCancel();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'pricing', id));
    setPlans(plans.filter((p) => p.id !== id));
  };

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

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-2xl font-bold">Pricing</h2>
          <button
            onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all"
          >
            {showForm ? 'Batal' : '+ Tambah Paket'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white/5 border border-blue-500/30 rounded-2xl p-6 mb-8 space-y-4">
            <h3 className="text-white font-semibold">{editId ? 'Edit Paket' : 'Tambah Paket Baru'}</h3>
            <input
              type="text"
              placeholder="Nama paket (contoh: Starter)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            <div className="grid grid-cols-2 gap-3">
  <div>
    <p className="text-gray-400 text-xs mb-1">Harga mulai dari</p>
    <div className="relative">
      <span className="absolute left-4 top-3 text-gray-500 text-sm">Rp</span>
      <input
        type="text"
        placeholder="700.000"
        value={form.priceMin}
        onChange={(e) => setForm({ ...form, priceMin: e.target.value })}
        required
        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
      />
    </div>
  </div>
  <div>
    <p className="text-gray-400 text-xs mb-1">Harga sampai</p>
    <div className="relative">
      <span className="absolute left-4 top-3 text-gray-500 text-sm">Rp</span>
      <input
        type="text"
        placeholder="1.500.000"
        value={form.priceMax}
        onChange={(e) => setForm({ ...form, priceMax: e.target.value })}
        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
      />
    </div>
  </div>
</div>
            <input
              type="text"
              placeholder="Deskripsi singkat paket"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            <div>
              <p className="text-gray-400 text-sm mb-1">Fitur paket <span className="text-gray-600">(satu fitur per baris)</span></p>
              <textarea
                placeholder={`5 Halaman Website\nDesain Responsif\nDomain & Hosting 1 Tahun`}
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                required
                rows={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, highlighted: !form.highlighted })}
                className={`w-12 h-6 rounded-full transition-all relative ${form.highlighted ? 'bg-blue-600' : 'bg-white/10'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${form.highlighted ? 'left-6' : 'left-0.5'}`} />
              </button>
              <span className="text-gray-400 text-sm">Tandai sebagai paket populer</span>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-full transition-all"
              >
                {saving ? 'Menyimpan...' : editId ? 'Update Paket' : 'Simpan Paket'}
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
        ) : plans.length === 0 ? (
          <div className="text-gray-400 text-center py-12">Belum ada paket.</div>
        ) : (
          <div className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.id} className={`bg-white/5 border rounded-2xl p-6 ${plan.highlighted ? 'border-blue-500/50' : 'border-white/10'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-lg">{plan.name}</h3>
                      {plan.highlighted && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Populer</span>
                      )}
                    </div>
                    <p className="text-blue-400 font-bold">
  Rp {plan.priceMin}
  {plan.priceMax && <span className="text-gray-400 font-normal"> – Rp {plan.priceMax}</span>}
</p>
                    <p className="text-gray-400 text-sm mt-1">{plan.desc}</p>
                    <ul className="mt-3 space-y-1">
                      {plan.features.map((f) => (
                        <li key={f} className="text-gray-300 text-sm flex items-center gap-2">
                          <span className="text-blue-500">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-2 ml-4 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="text-blue-400 hover:text-blue-300 text-sm border border-blue-500/30 px-3 py-1 rounded-full transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="text-red-400 hover:text-red-300 text-sm border border-red-500/30 px-3 py-1 rounded-full transition-all"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}