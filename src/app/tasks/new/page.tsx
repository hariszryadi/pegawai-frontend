'use client'

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NewTaskPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        description: "",
        date: "",
        hourly_rate: "",
        additional_charges: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/tasks", {
                ...form,
                hourly_rate: Number(form.hourly_rate),
                additional_charges: Number(form.additional_charges),
            });
            router.push("/tasks");
        } catch (err) {
            console.error("Gagal menyimpan:", err);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Tambah Tugas Baru</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="description"
                    placeholder="Deskripsi Tugas"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="hourly_rate"
                    placeholder="Tarif per Jam (Rp)"
                    value={form.hourly_rate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="additional_charges"
                    placeholder="Biaya Tambahan (Rp)"
                    value={form.additional_charges}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                    >
                        Kembali
                    </button>
                
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Simpan Tugas
                    </button>
                </div>
            </form>
        </div>
    );
}
