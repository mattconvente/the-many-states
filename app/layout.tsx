import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

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
        className={`${nunitoSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
