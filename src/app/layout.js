import Header from "@/components/Header";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Scheduler",
  description: "Meeting Scheduling application",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-white bg-black `}>
          <Header />

          <main className="min-h-screen p-2" >{children}</main>

          <footer className="text-center bg-purple-950 p-2">Made with ❤️ by Anirudh</footer>

        </body>
      </html>
    </ClerkProvider>
  );
}
