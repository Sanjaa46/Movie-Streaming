import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthPopup() {
    const { showAuthPopup, authMode, openLogin, openSignup, closeAuthPopup, login, signup } = useAuth();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (!showAuthPopup) return null;

    const resetForm = () => {
        setEmail(""); setUsername(""); setPassword(""); setConfirm(""); setError("");
    };

    const switchToLogin = () => { resetForm(); openLogin(); };
    const switchToSignup = () => { resetForm(); openSignup(); };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (authMode === "signup") {
            if (password !== confirm) {
                setError("Нууцүг таарахгүй байна.");
                return;
            }
            if (password.length < 6) {
                setError("Нууцүг хамгийн багадаа 6 тэмдэгттэй байна.");
                return;
            }
        }

        setLoading(true);
        try {
            if (authMode === "login") {
                await login(email, password);
            } else {
                await signup(username, email, password);
            }
            resetForm();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Алдаа гарлаа.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-999 flex items-center justify-center"
            onClick={(e) => { if (e.target === e.currentTarget) closeAuthPopup(); }}
        >
            <div className="relative bg-[#141414] border border-white/10 w-[420px] rounded-2xl p-8 flex flex-col gap-6 shadow-2xl">
                {/* Close button */}
                <button
                    type="button"
                    onClick={closeAuthPopup}
                    className="absolute top-4 right-4 bg-transparent text-white/50 hover:text-white text-xl leading-none p-1"
                    aria-label="Хаах"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-center text-white">
                    {authMode === "login" ? "Нэвтрэх" : "Бүртгүүлэх"}
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {authMode === "signup" && (
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-white/60 font-medium">Хэрэглэгчийн нэр</label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#FF770B] transition-colors"
                                type="text"
                                placeholder="Нэрээ оруулна уу"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-white/60 font-medium">Имэйл</label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#FF770B] transition-colors"
                            type="email"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-white/60 font-medium">Нууцүг</label>
                        <input
                            className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#FF770B] transition-colors"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete={authMode === "login" ? "current-password" : "new-password"}
                        />
                    </div>

                    {authMode === "signup" && (
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-white/60 font-medium">Нууцүг давтах</label>
                            <input
                                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white placeholder-white/30 outline-none focus:border-[#FF770B] transition-colors"
                                type="password"
                                placeholder="••••••••"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                    )}

                    {authMode === "login" && (
                        <a href="#" className="text-xs text-[#FF770B] text-right hover:underline">
                            Нууцүгээ мартсан уу?
                        </a>
                    )}

                    {error && (
                        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-[#FF770B] hover:bg-[#e06800] disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-white transition-colors mt-1"
                    >
                        {loading ? "Уншиж байна..." : authMode === "login" ? "Нэвтрэх" : "Бүртгүүлэх"}
                    </button>
                </form>

                <p className="text-center text-xs text-white/40">
                    {authMode === "login" ? (
                        <>Бүртгэлгүй юу?{" "}
                            <button type="button" onClick={switchToSignup} className="text-[#FF770B] hover:underline bg-transparent p-0 font-semibold cursor-pointer text-xs align-baseline border-none outline-none">
                                Бүртгүүлэх
                            </button>
                        </>
                    ) : (
                        <>Бүртгэлтэй юу?{" "}
                            <button type="button" onClick={switchToLogin} className="text-[#FF770B] hover:underline bg-transparent p-0 font-semibold cursor-pointer text-xs align-baseline border-none outline-none">
                                Нэвтрэх
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}