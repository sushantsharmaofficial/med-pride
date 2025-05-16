import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainNavbar from "@/components/layouts/Navbar/mainNavbar";
import Footer from "@/components/layouts/Footer/footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediPride",
  description:
    "MediPride is a platform for connecting patients with healthcare providers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#ffffff",
              color: "#333333",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
              borderRadius: "0.5rem",
            },
            success: {
              iconTheme: {
                primary: "#0087ff", // Using secondary color from theme
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
        <MainNavbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
