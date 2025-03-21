import PhotoCard from "@/components/PhotoCard";
import { Photo } from "@/types/types";

export default async function PhotoListPage() {
  const res = await fetch("http://localhost:8080/api/photos", {
    cache: "no-store",
  });

  const data = await res.json();
  const photos: Photo[] = data.photos;

  return (
    <main className="p-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {photos.map((photo, index) => (
        <PhotoCard key={photo.id} photo={photo} index={index} />
      ))}
    </main>
  );
}
