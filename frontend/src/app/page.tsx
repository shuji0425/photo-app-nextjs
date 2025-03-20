import PhotoList from "@/components/PhotoList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center my-4">Gallery</h1>
        <PhotoList />
      </div>
    </main>
  );
}
