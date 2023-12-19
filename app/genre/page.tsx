"use client";
import { useEffect, useState } from "react";
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { getGenres, getToken, Genre } from "@/api";
export default function GenrePage() {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const genres = await getGenres(token);

      if (genres) {
        setGenres(genres);
      }
    };
    fetchData();
  }, []);

  return genres.map((genre) => (
    <Card key={genre.id} className={`border-none`}>
      <Image
        alt={`Track ${genre.name}`}
        className="object-cover"
        height={genre.icons[0].height}
        src={genre.icons[0].url}
        width="100%"
      />
    </Card>
  ));
}
