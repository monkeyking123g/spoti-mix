"use client";
import { useEffect, useState } from "react";
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/skeleton";
import { getGenres, getToken } from "@/api";
import { Genre } from "@/api/types";
import { useRouter } from "next/navigation";

export default function GenrePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const fetchedGenres = await getGenres(token);

        if (fetchedGenres) {
          setGenres(fetchedGenres);
        }
      } catch (err) {
        setError("Failed to fetch genres");
      } finally {
        setLoad(false);
      }
    };
    fetchData();
  }, []);

  if (load) {
    const skeletonArray = Array(8).fill(null);
    return (
      <>
        {skeletonArray.map((_, index) => (
          <GenreSkeleton key={index} />
        ))}
      </>
    );
  }

  if (error) {
    return <h2>Something went wrong!</h2>;
  }

  return genres.map((genre) => (
    <Card
      isPressable
      onClick={() => router.push(`/playlist/${genre.id}`)}
      key={genre.id}
      className="border-none"
    >
      <Image
        isZoomed
        alt={`Track ${genre.name}`}
        className="object-cover"
        height={genre.icons[0].height}
        src={genre.icons[0].url}
        width={298}
      />
    </Card>
  ));
}

function GenreSkeleton() {
  return (
    <Card className="space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg  h-[275px]">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
}
