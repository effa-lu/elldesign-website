import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorDot from "@/components/CursorDot";
import PageFade from "@/components/PageFade";

export const metadata: Metadata = {
  title: "ELL Design Studio",
  description:
    "Independent spatial design practice — Los Angeles and Hong Kong.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CursorDot />

        <PageFade />

        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
