"use client";
import { useState, useEffect } from "react";
import { title } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { Image } from "@nextui-org/image";
import { getGenres, getToken, getPlaylistByGenre } from "@/api";
import { Genre, Playlist } from "@/api/types";
import { useRouter } from "next/navigation";

export default function PlayList() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const skeletonArray = Array(8).fill(null);

  const handleChangeTab = async (newTabId: string) => {
    setActiveTab(newTabId);
    try {
      const token = await getToken();
      const playlists = await getPlaylistByGenre(token, newTabId);
      setPlaylists(playlists);
    } catch (err) {
      setError("Failed to fetch playlists.");
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const genres = await getGenres(token);
        setGenres(genres);
      } catch (err) {
        setError("Failed to fetch genres.");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <>
      <div className="flex justify-between p-3 items-center">
        <h1 className={title()}>PlayList</h1>
        <div className="flex  flex-col">
          <Tabs
            aria-label="Dynamic tabs"
            items={genres.slice(0, 5)}
            selectedKey={activeTab}
            onSelectionChange={handleChangeTab}
          >
            {(item: any) => <Tab key={item.id} title={item.name}></Tab>}
          </Tabs>
        </div>
      </div>
      <section className="grid grid-cols-4 gap-4">
        {load
          ? skeletonArray.map((_, index) => <PlaylistSkeleton key={index} />)
          : playlists.map((playlist) => (
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
      isFooterBlurred
      key={playlist.id}
      className="h-[400px]"
      isPressable
      onClick={() =>
        router.push(`/playlist/tracks/?href=${playlist.tracks.href}`)
      }
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

function PlaylistSkeleton() {
  return (
    <Card className="space-y-5" radius="lg">
      <Skeleton className="rounded-lg  h-[360px] w-[100%]">
        <div className="h-24 rounded-lg "></div>
      </Skeleton>
    </Card>
  );
}
