import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import VoiceAgentButton from "@/components/voice/VoiceAgentButton";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-[#0A0A0A] min-h-screen">
        {children}
      </main>
      <Footer />
      <ChatWidget />
      <VoiceAgentButton />
    </>
  );
}
