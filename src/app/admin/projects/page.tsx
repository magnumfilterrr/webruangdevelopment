"use client";
import { useEffect, useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    tech: "",
    color: "from-blue-600/20 to-purple-600/20",
    projectUrl: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push("/admin");
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    const fetchProjects = async () => {
      const snap = await getDocs(collection(db, "projects"));
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Project));
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let imageUrl = editId
      ? projects.find((p) => p.id === editId)?.imageUrl || ""
      : "";

    if (imageFile) {
      const fileId = crypto.randomUUID();

      const imageRef = ref(storage, `projects/${fileId}_${imageFile.name}`);

      await uploadBytes(imageRef, imageFile);

      imageUrl = await getDownloadURL(imageRef);
    }

    const data = {
      ...form,
      tech: form.tech.split(",").map((t) => t.trim()),
      imageUrl,
    };

    if (editId) {
      await updateDoc(doc(db, "projects", editId), data);
    } else {
      await addDoc(collection(db, "projects"), {
        ...data,
        createdAt: serverTimestamp(),
      });
    }

    const snap = await getDocs(collection(db, "projects"));
    setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Project));
    handleCancel();
    setSaving(false);
  };

  const handleEdit = (project: Project) => {
    setEditId(project.id);
    setForm({
      title: project.title,
      category: project.category,
      tech: project.tech.join(", "),
      color: project.color,
      projectUrl: project.projectUrl || "",
    });
    setImagePreview(project.imageUrl || "");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm({
      title: "",
      category: "",
      tech: "",
      color: "from-blue-600/20 to-purple-600/20",
      projectUrl: "",
    });
    setImageFile(null);
    setImagePreview("");
  };

  const handleDelete = async (project: Project) => {
    // Hapus gambar dari storage kalau ada
    if (project.imageUrl) {
      try {
        const imageRef = ref(storage, project.imageUrl);
        await deleteObject(imageRef);
      } catch {
        // Abaikan kalau gambar tidak ditemukan
      }
    }
    await deleteDoc(doc(db, "projects", project.id));
    setProjects(projects.filter((p) => p.id !== project.id));
  };

  const colors = [
    "from-blue-600/20 to-purple-600/20",
    "from-blue-600/20 to-cyan-600/20",
    "from-cyan-600/20 to-blue-600/20",
    "from-purple-600/20 to-pink-600/20",
  ];

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
          <h2 className="text-white text-2xl font-bold">Portofolio</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all"
          >
            {showForm ? "Batal" : "+ Tambah Project"}
          </button>
        </div>

        {/* Form Tambah */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 space-y-4"
          >
            <h3 className="text-white font-semibold">Tambah Project Baru</h3>

            <input
              type="text"
              placeholder="Nama project"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            <input
              type="text"
              placeholder="Kategori (contoh: Website Sekolah)"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            <input
              type="text"
              placeholder="Teknologi (pisah dengan koma, contoh: Next.js, Firebase)"
              value={form.tech}
              onChange={(e) => setForm({ ...form, tech: e.target.value })}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            <input
              type="url"
              placeholder="Link project (contoh: https://smknuurul.sch.id)"
              value={form.projectUrl}
              onChange={(e) => setForm({ ...form, projectUrl: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />

            {/* Upload Gambar */}
            <div>
              <p className="text-gray-400 text-sm mb-2">Gambar project:</p>
              <label className="block w-full border-2 border-dashed border-white/10 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500/50 transition-all">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={400}
                    height={200}
                    className="mx-auto rounded-lg object-cover h-40 w-full"
                  />
                ) : (
                  <div className="text-gray-500">
                    <p className="text-2xl mb-2">📁</p>
                    <p className="text-sm">Klik untuk upload gambar</p>
                    <p className="text-xs mt-1">PNG, JPG, WEBP (maks 2MB)</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Warna fallback */}
            <div>
              <p className="text-gray-400 text-sm mb-2">
                Warna fallback (jika tidak ada gambar):
              </p>
              <div className="flex gap-3">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setForm({ ...form, color: c })}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${c} border-2 transition-all ${
                      form.color === c
                        ? "border-blue-500 scale-110"
                        : "border-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Tombol submit form */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-full transition-all"
              >
                {saving
                  ? "Menyimpan..."
                  : editId
                    ? "Update Project"
                    : "Simpan Project"}
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

        {/* List Project */}
        {loading ? (
          <div className="text-blue-400 animate-pulse">Memuat data...</div>
        ) : projects.length === 0 ? (
          <div className="text-gray-400 text-center py-12">
            Belum ada project. Tambahkan project pertamamu!
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex justify-between items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div
                    className={`w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br ${project.color}`}
                  >
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/30 font-bold text-xl">
                        {project.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {project.title}
                    </h3>
                    <p className="text-blue-400 text-sm">{project.category}</p>
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 text-xs hover:text-blue-400 transition-all"
                      >
                        {project.projectUrl}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-400 hover:text-blue-300 text-sm border border-blue-500/30 px-3 py-1 rounded-full transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
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
