import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoTraveller - Premium AI Travel Concierge",
  description: "Your expert AI companion for customized dream journeys, live navigation, and real-time travel insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#050814] text-slate-50 font-sans">
        <div className="min-h-screen bg-[#050814] text-slate-100 flex relative overflow-hidden">
          {/* Sidebar Navigation */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 ml-0 lg:ml-56 xl:ml-64 min-h-screen overflow-y-auto pt-20 pb-10 lg:py-10 px-4 md:px-10 scrollbar-thin">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
