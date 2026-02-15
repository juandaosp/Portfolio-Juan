import { BentoGrid } from "@/components/Dashboard/BentoGrid";
import ChatWindow from "@/components/Chatbot/ChatWindow";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] py-20 px-4 relative overflow-hidden">
      {/* Atmospheric Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] pointer-events-none" />

      <BentoGrid />
      <ChatWindow />
      <SpeedInsights />
      <Analytics />
    </main>
  );
}