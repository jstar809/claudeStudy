import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "KoreaNomad — 대한민국 디지털 노마드 도시 탐색",
    template: "%s | KoreaNomad",
  },
  description: "한국 내 디지털 노마드를 위한 도시 탐색 & 커뮤니티 평가 플랫폼",
  metadataBase: new URL("https://koreanomad.kr"),
  openGraph: {
    title: "KoreaNomad — 대한민국 디지털 노마드 도시 탐색",
    description: "실제 노마드가 평가한 12개+ 도시 데이터로 나에게 맞는 도시를 찾아보세요.",
    siteName: "KoreaNomad",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KoreaNomad — 대한민국 디지털 노마드 도시 탐색",
    description: "실제 노마드가 평가한 12개+ 도시 데이터로 나에게 맞는 도시를 찾아보세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-noto-sans-kr)]">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
