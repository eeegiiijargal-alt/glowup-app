import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-purple-50 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        GlowUp ✨
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Хамгийн хөөрхөн төрхөө хамтдаа бүтээе
      </p>
      <Link
        href="/onboarding/12"
        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-500 text-white font-semibold text-lg"
      >
        Эхлэх
      </Link>
    </main>
  );
}