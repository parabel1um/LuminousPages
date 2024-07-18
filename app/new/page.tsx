import Image from "next/image";

export default function NewPage() {
  return (
    <div>
      <main className="flex items-center justify-between min-h-screen main left-0">
        <div className="flex items-center">
          <Image
            src="/Luminous_Pages.png"
            width={300}
            height={120}
            alt="Luminous Pages Logo"
          />
        </div>
      </main>
    </div>
  );
}
