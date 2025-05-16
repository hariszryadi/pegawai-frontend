'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AddAssignmentPage() {
    const { id } = useParams(); // task id
    const router = useRouter();
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        employee_id: "",
        hours_spent: ""
    });

    useEffect(() => {
        api.get("/employees").then(res => setEmployees(res.data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/assignments", {
                task_id: Number(id),
                employee_id: Number(form.employee_id),
                hours_spent: Number(form.hours_spent),
            });
            router.push(`/tasks/${id}`);
        } catch (err) {
            console.error("Gagal menambah assignment:", err);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Tambah Assignment</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    name="employee_id"
                    value={form.employee_id}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">-- Pilih Pegawai --</option>
                    {employees.map((emp: any) => (
                        <option key={emp.id} value={emp.id}>
                            {emp.name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    name="hours_spent"
                    placeholder="Jam kerja"
                    value={form.hours_spent}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
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
                        Simpan Assignment
                    </button>
                </div>

            </form>
        </div>
    );
}
