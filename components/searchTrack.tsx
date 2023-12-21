import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { PauseIcon, PlayIcon } from "./icons";
import { Chip } from "@nextui-org/chip";
import { loadTracks } from '@/redux/slices/playerSlice';
import { useDispatch } from "react-redux";
import { SpotifyTrack } from "@/api";

export default function Track(data: {data: SpotifyTrack}) {
  const dispatch = useDispatch()
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-3 gap-1">
          <div className="">
            <Image
              alt="Album cover"
              className="object-cover"
              height={70}
              isBlurred
              width={70}
              shadow="none"
              src={data.data.album.images[2].url}
            />
          </div>

          <div className="truncate">
            <h3 className="font-semibold text-foreground/90">
              {data.data.name}
            </h3>
            <Chip color="primary">{data.data.album.artists[0].name}</Chip>
          </div>
          <div className="flex items-center justify-center">
            <Button
              isIconOnly
              className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 p-1"
              radius="full"
              variant="light"
              onPress={() => {
                if(data.data.preview_url) {
                  dispatch(loadTracks([data.data.preview_url]))
                }
              }}
            >
             {data.data.preview_url ? 'play' : 'no preview' }
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
