"use client";

import { useState, use, useRef } from "react";
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
    subtitle: "Нүүрний шинжилгээ, Таны өнгө, Гоо сайхны хөтөч энэ хаягт ирнэ.",
    cta: "Үр дүнгээ авах",
    next: "/result",
  },
};

const DELIVERABLES = [
  { id: "face", name: "Нүүрний шинжилгээ", free: true, icon: "💎" },
  { id: "palette", name: "Таны өнгө", free: false, icon: "🎨" },
  { id: "playbook", name: "Гоо сайхны хөтөч", free: false, icon: "📘" },
];

export default function OnboardingStep({ params }: { params: Promise<{ step: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const step = STEPS[resolvedParams.step] ?? STEPS["12"];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      return alert("Зургийн хэмжээ 5MB-аас бага байх ёстой");
    }
    setImageName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return alert("Зөв имэйл оруулна уу");
    if (!image) return alert("Нүүрний зургаа оруулна уу");
    setLoading(true);
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, step: resolvedParams.step, image }),
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
            {/* Зураг оруулах */}
            <div className="mb-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              
              {image ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-rose-200">
                  <img
                    src={image}
                    alt="Таны зураг"
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImageName("");
                    }}
                    className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-white shadow"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-xs text-white truncate">{imageName}</p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-[3/4] rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50/50 hover:bg-rose-50 flex flex-col items-center justify-center gap-2 transition"
                >
                  <span className="text-4xl">📷</span>
                  <span className="text-sm font-semibold text-rose-600">
                    Нүүрний зургаа оруулах
                  </span>
                  <span className="text-xs text-gray-500">
                    JPG, PNG (5MB хүртэл)
                  </span>
                </button>
              )}
            </div>

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