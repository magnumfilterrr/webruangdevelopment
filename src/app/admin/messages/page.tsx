"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Message {
  id: string;
  nama: string;
  email: string;
  pesan: string;
  createdAt: Date | null;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push("/admin");
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Message));
      setLoading(false);
    };
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "messages", id));
    setMessages(messages.filter((m) => m.id !== id));
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
        <h2 className="text-white text-2xl font-bold mb-8">Pesan Masuk</h2>

        {loading ? (
          <div className="text-blue-400 animate-pulse">Memuat pesan...</div>
        ) : messages.length === 0 ? (
          <div className="text-gray-400 text-center py-12">
            Belum ada pesan masuk.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{msg.nama}</h3>
                    <p className="text-blue-400 text-sm">{msg.email}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-red-400 hover:text-red-300 text-sm border border-red-500/30 px-3 py-1 rounded-full transition-all"
                  >
                    Hapus
                  </button>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {msg.pesan}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
