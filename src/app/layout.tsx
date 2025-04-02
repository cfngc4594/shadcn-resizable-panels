import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shadcn Resizable Panels",
  description: "A Next.js project showcasing dynamic UI layouts with ShadCN's Resizable component",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
