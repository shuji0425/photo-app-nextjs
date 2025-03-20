import PhotoList from "@/components/PhotoList";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Gallery</h1>
      <PhotoList />
    </main>
  );
}
