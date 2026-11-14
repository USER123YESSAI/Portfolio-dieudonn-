"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, AlertCircle, ArrowLeft, LogIn, Loader2 } from "lucide-react";
import { login } from "@/lib/api";
import { setToken } from "@/lib/auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);
      setToken(data.token);
      router.push("/admin/dashboard");
    } catch {
      setError("Identifiants incorrects. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f7f2] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#2d6a4f] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Retour sur le site public</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#2d6a4f] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold font-serif-custom text-[#14261c]">
            Espace Administrateur
          </h1>
          <p className="text-[#4b5563] text-sm mt-1">
            Connectez-vous pour gérer votre portfolio
          </p>
        </div>

        {/* Card Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#dce4d7] rounded-2xl p-8 space-y-5 shadow-sm"
        >
          {error && (
            <div className="flex items-center gap-2 text-red-700 text-sm bg-red-50 border border-red-200 p-3.5 rounded-lg">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-[#14261c] mb-1.5"
            >
              Adresse Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#dce4d7] rounded-lg text-sm text-[#14261c] placeholder:text-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-1 focus:ring-[#2d6a4f] transition-all"
              placeholder="routouangdieudonnesouloukna@gmail.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-[#14261c] mb-1.5"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#dce4d7] rounded-lg text-sm text-[#14261c] placeholder:text-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-1 focus:ring-[#2d6a4f] transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#2d6a4f] hover:bg-[#1b4332] disabled:opacity-50 text-white font-semibold text-sm rounded-lg shadow-sm transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Connexion en cours...</span>
              </>
            ) : (
              <>
                <LogIn size={16} />
                <span>Se connecter</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Portfolio Dieudonné Routouang Souloukna — Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
}
