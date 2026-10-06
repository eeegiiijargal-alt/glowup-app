"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Lock, Check } from "lucide-react";

const STEPS: Record<string, {
  title: string;
  subtitle: string;
  cta: string;
  next: string;
}> = {
  "12": {
    title: "Хаашаа илгээх вэ?",
    subtitle: "Face Card, өнгөний палитр, Glow up playbook энэ хаягт ирнэ.",
    cta: "Үр дүнгээ авах",
    next: "/result",
  },
};

const DELIVERABLES = [
  { id: "face", name: "Face Card", free: true, icon: "💎" },
  { id: "palette", name: "Өнгөний палитр", free: false, icon: "🎨" },
  { id: "playbook", name: "Glow up playbook", free: false, icon: "📘" },
];

export default function OnboardingStep({ params }: { params: Promise<{ step: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const step = STEPS[resolvedParams.step] ?? STEPS["12"];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return alert("Зөв имэйл оруулна уу");
    setLoading(true);
    await fetch("/api/lead", {
      method: "POST",
      body: JSON.stringify({ email, step: resolvedparams.step }),
    });
    router.push(step.next);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden">
            <div className="h-full w-[80%] bg-gradient-to-r from-rose-400 to-purple-500 rounded-full" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Алхам 12 / 15</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-rose-100">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-rose-400" />
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-wide">
              Сүүлийн алхам
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h1>
          <p className="text-sm text-gray-600 mb-6">{step.subtitle}</p>

          <ul className="space-y-3 mb-6">
            {DELIVERABLES.map((d) => (
              <li
                key={d.id}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  d.free
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <span className="text-xl">{d.icon}</span>
                <span className="flex-1 text-sm font-medium text-gray-800">
                  {d.name}
                </span>
                {d.free ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <Check className="w-3 h-3" /> Үнэгүй
                  </span>
                ) : (
                  <Lock className="w-4 h-4 text-gray-400" />
                )}
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="Имэйл хаягаа оруулна уу"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-purple-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? "Илгээж байна..." : step.cta}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            Зөвхөн таны үр дүнг илгээнэ. Спам биш.
          </p>
        </div>
      </div>
    </main>
  );
}