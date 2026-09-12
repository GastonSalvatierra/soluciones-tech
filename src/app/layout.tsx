import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import SmoothScroll from "@/components/shared/SmoothScroll";
import ScrollProgress from "@/components/shared/ScrollProgress";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soluciones Tech | Tecnología que impulsa tu negocio",
  description:
    "Agencia de soluciones digitales en Buenos Aires. Bots con IA para WhatsApp e Instagram, desarrollo web, automatizaciones y marketing digital.",
  keywords: [
    "soluciones tech",
    "bots con IA",
    "bot whatsapp",
    "bot instagram",
    "desarrollo web",
    "automatizaciones",
    "marketing digital",
    "gestión de redes",
    "Buenos Aires",
    "Argentina",
  ],
  icons: {
    icon: "/logo-soluciones-tech.png",
    apple: "/logo-soluciones-tech.png",
  },
  openGraph: {
    title: "Soluciones Tech | Tecnología que impulsa tu negocio",
    description:
      "Conectamos tecnología, estrategia y automatización para convertir ideas en resultados. Sistemas que piensan, construyen y operan tu negocio.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground noise">
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}