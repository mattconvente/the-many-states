import Image from "next/image";
import { USMap } from "./us-map";

export default function Home() {
  return (
    <div className="min-h-screen p-0 m-0 font-[family-name:var(--font-nunito-sans)]">
      <header className="flex justify-center px-8 pt-8">
        <Image
          src="/the-many-states-logo.svg"
          alt="The Many States logo"
          width={275}
          height={32}
          priority
        />
      </header>
      <main className="flex flex-col p-8 items-center">
        <p className="font-normal max-w-5xl text-center">The Many States is a web application that generates a United States flag where the visible stars in the blue canton represent which States someone has visited. The stars are ordered based on each State&apos;s admission to the Union.</p>
        <div className="w-full max-w-5xl">
          <USMap />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
