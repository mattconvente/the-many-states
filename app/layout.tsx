import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "@/app/globals.css";
import { TheManyStatesProvider } from "@/app/context/TheManyStatesContext";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Many States",
  description: "The Many States is a web application that generates a United States flag where the visible stars in the blue canton represent which States someone has visited. The stars are ordered based on each State's admission to the Union.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body
        className={`${nunitoSans.className} antialiased p-12 m-0`}
      >
        <TheManyStatesProvider>
          <Header />
          <main className="pt-10 pb-12 m-0 font-[family-name:var(--font-nunito-sans)]">
            {children}
          </main>
          <Footer />
        </TheManyStatesProvider>
      </body>
    </html>
  );
}
