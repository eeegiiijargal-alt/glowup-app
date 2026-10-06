"use client";

import { Lock, Sparkles } from "lucide-react";

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50 px-4 py-12">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Таны үр дүн бэлэн боллоо ✨
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">💎 Face Card</h2>
            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
              ҮНЭГҮЙ
            </span>
          </div>
          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center text-gray-500 text-sm">
            [Таны Face Card энд харагдана]
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Таны нүүрний онцлог, өнгө, стильд тохирсон зөвлөмж.
          </p>
        </div>

        {[
          { title: "🎨 Өнгөний палитр", desc: "Танд тохирох 12 өнгө" },
          { title: "📘 Glow up playbook", desc: "30 хоногийн алхам алхмаар төлөвлөгөө" },
        ].map((item) => (
          <div
            key={item.title}
            className="relative bg-white rounded-3xl shadow p-6 border border-gray-200 overflow-hidden"
          >
            <div className="blur-sm pointer-events-none select-none opacity-40">
              <h2 className="font-bold text-gray-900 mb-2">{item.title}</h2>
              <p className="text-xs text-gray-500">{item.desc}</p>
              <div className="mt-4 h-24 rounded-2xl bg-gray-100" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
              <Lock className="w-6 h-6 text-gray-500 mb-2" />
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Түгжигдсэн
              </p>
              <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-500 text-white text-sm font-semibold">
                Нээх — 9,900₮
              </button>
            </div>
          </div>
        ))}

        <div className="text-center">
          <button className="inline-flex items-center gap-2 text-sm text-purple-600 font-semibold">
            <Sparkles className="w-4 h-4" /> Бүгдийг багцаар авах
          </button>
        </div>
      </div>
    </main>
  );
}