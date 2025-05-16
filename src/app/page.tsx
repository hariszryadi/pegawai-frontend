export default function Home() {
  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Selamat Datang</h1>
      <p className="text-gray-600 mb-6">Silakan mulai dengan memilih daftar tugas.</p>
      <a
        href="/tasks"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Lihat Daftar Tugas
      </a>
    </main>
  );
}
