"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import {
  getGenres,
  getToken,
  Genre,
  getPlaylistByGenre,
  Playlist,
  getTracks,
} from "@/api";

const PHONK_LIST =
  "https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt/tracks/";

export default function TrackPage() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const tracks = await getTracks(token, PHONK_LIST);
      if (tracks) {
        setTracks(tracks);
      }
    };
    fetchData();
  }, []);
  return tracks.map((data) => {
    return (
      <Card key={data.track.id} className="py-4">
        <CardHeader className="overflow-visible py-2">
          <Image
            alt={data.track.name}
            className="object-cover rounded-xl"
            src={data.track.album.images[1].url}
            width={270}
          />
        </CardHeader>
        <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{data.track.name}</h4>
        </CardBody>
        <CardFooter className="flex justify-between">
          <Button
            className=" text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Play
          </Button>

          <Button
            className="text-tiny text-white bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            Pause
          </Button>
        </CardFooter>
      </Card>
    );
  });
}
