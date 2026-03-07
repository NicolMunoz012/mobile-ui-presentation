import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diseño de Interfaces para Apps Móviles",
  description: "Presentación académica — Diseño de Software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
