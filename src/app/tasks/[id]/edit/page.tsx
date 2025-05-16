'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function EditTaskPage() {
    const { id } = useParams();
    const router = useRouter();
    const [form, setForm] = useState({
        description: "",
        date: "",
        hourly_rate: "",
        additional_charges: ""
    });

    useEffect(() => {
        api.get(`/tasks/${id}`).then(res => {
            setForm(res.data);
        });
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put(`/tasks/${id}`, {
                ...form,
                hourly_rate: Number(form.hourly_rate),
                additional_charges: Number(form.additional_charges),
            });
            router.push("/tasks");
        } catch (err) {
            console.error("Gagal update:", err);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Tugas</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="hourly_rate"
                    value={form.hourly_rate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="additional_charges"
                    value={form.additional_charges}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
}
