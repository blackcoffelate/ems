/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AxiosError } from "axios";
import api from "../services/api";
import { useAppData } from "../contexts/AppDataContext";

const AuthPage: React.FC = () => {
    const { login } = useAppData();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const payload = { email, password, device: 'pwa-react-client' };
            const response = await api.post("/token", payload);

            if (response.data && response.data.token) {
                login(response.data.token, response.data.data);
            } else {
                setError("Login gagal: Respons tidak valid.");
            }

        } catch (err) {
            console.error("Error saat login:", err);
            const axiosError = err as AxiosError<any>;
            if (axiosError.response) {
                setError(axiosError.response.data.message || "Email atau password salah.");
            } else {
                setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src="https://cdn.pixabay.com/video/2022/12/28/144584-785095786_tiny.mp4"
                autoPlay
                loop
                muted
                playsInline
            ></video>

            <div className="absolute inset-0 bg-gradient-to-t from-green-400/80 via-green-500/80 to-blue-800/80"></div>

            <div className="relative flex flex-col min-h-screen">
                <section className="h-[25vh] flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-bold drop-shadow-md">EMS</h1>
                    <p className="text-sm opacity-90 mt-1">Electrical Management System</p>
                </section>

                <section className="flex-1 bg-white rounded-t-3xl shadow-lg p-6 sm:p-8">
                    <div className="max-w-md mx-auto">
                        <div className="flex flex-col items-center justify-center mb-8">
                            <h1 className="text-2xl font-bold drop-shadow-md">Welcome Back</h1>
                            <p className="text-sm opacity-90 mt-1">Silakan masuk untuk melanjutkan</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-600">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="name@example.com"
                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3331d6]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3331d6]"
                                />
                            </div>

                            {error && <div className="text-sm text-red-600">{error}</div>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-green-400 text-white font-medium py-3 mt-2 hover:opacity-95 transition disabled:opacity-60"
                            >
                                {loading ? "Memproses..." : "Masuk"}
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AuthPage;