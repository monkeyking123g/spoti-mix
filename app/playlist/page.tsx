"use client";
import { useState, useEffect } from "react";
import { title } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import {
  getGenres,
  getToken,
  Genre,
  getPlaylistByGenre,
  Playlist,
} from "@/api";
export default function PlayList() {
  const [activeTab, setActiveTab] = useState();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const handleChangeTab = async (newTabId: string) => {
    setActiveTab(newTabId);
    const token = await getToken();
    const playlists = await getPlaylistByGenre(token, newTabId);
    console.log(playlists);
    setPlaylists(playlists);
  };

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
        {playlists.map((playlist) => {
          return (
            <Card isFooterBlurred key={playlist.id} className=" h-[400px]">
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={playlist.images[0].url}
              />
              <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <h4 className="text-white font-medium text-large">
                  {playlist.name}
                </h4>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </>
  );
}
