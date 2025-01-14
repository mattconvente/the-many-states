import type { Metadata } from "next";
import { Libre_Caslon_Text } from "next/font/google";
import "@/app/globals.css";
import { ViewTransitions } from "next-view-transitions";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { defaultOpenGraphMetadata, defaultTwitterMetadata } from "@/app/metadata/metadata";

const libreCaslonText = Libre_Caslon_Text({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.themanystates.com"),
  alternates: {
    canonical: '/',
  },
  title: "The Many States",
  description: "The Many States is a web application where people can create a personalized United States flag based on the States they've visited. Each visible star in the flag's blue canton represents a visited state, and the stars are ordered based on each State's admission to the Union.",
  openGraph: defaultOpenGraphMetadata,
  twitter: defaultTwitterMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body
          className={`${libreCaslonText.className} antialiased p-6 lg:p-12 mx-auto my-0 max-w-[1728px]`}
        >
          <Header />
          <main className="pt-4 pb-8 lg:pt-10 lg:pb-10 m-0">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
