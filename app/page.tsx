import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen p-0 m-0 font-[family-name:var(--font-nunito-sans)]">
      <header className="flex px-8 py-4 bg-[--header-background]">
        <Image
          src="/the-many-states-logo-stacked.svg"
          alt="The Many States logo"
          width={56}
          height={64}
          priority
        />
      </header>
      <main className="p-8">
        <p className="font-normal">The Many States is a web application that generates a United States flag where the visible stars in the blue canton represent which States someone has visited. The stars are ordered based on each State&apos;s admission to the Union.</p>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
