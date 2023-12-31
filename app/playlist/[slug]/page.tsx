"use client";
import React, { useEffect, useState } from "react";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { getToken, getPlaylistByGenre } from "@/api";
import { Playlist } from "@/api/types";
import { useRouter } from "next/navigation";

export default function PlayList({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const playlists = await getPlaylistByGenre(token, slug);
      setPlaylists(playlists);
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="grid grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard playlist={playlist} key={playlist.id} />
        ))}
      </section>
    </>
  );
}

function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const router = useRouter();
  return (
    <Card
      isPressable
      onClick={() =>
        router.push(`/playlist/tracks/?href=${playlist.tracks.href}`)
      }
      isFooterBlurred
      key={playlist.id}
      className="h-[400px]"
    >
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src={playlist.images[0].url}
      />
      <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <h4 className="text-white font-medium text-large">{playlist.name}</h4>
      </CardFooter>
    </Card>
  );
}
