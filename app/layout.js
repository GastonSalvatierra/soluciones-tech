import { Sora } from "next/font/google";
import "@/globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata = {
  title: "Soluciones Tech OK - Programación Web, Marketing Digital y IT",
  description: "Soluciones digitales a medida: programación web, marketing digital, publicidad para ventas y gestión de redes sociales. Buenos Aires, Argentina.",
  keywords: "programación web, marketing digital, IT, redes sociales, Buenos Aires",
  authors: [{ name: "Soluciones Tech OK" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sora.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#0D1117] text-white">
        {children}
      </body>
    </html>
  );
}
