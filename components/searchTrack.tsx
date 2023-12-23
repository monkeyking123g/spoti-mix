import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { loadTracks } from "@/redux/slices/playerSlice";
import { useDispatch } from "react-redux";
import { Track } from "@/api/types";

export default function Track(data: { data: Track }) {
  const dispatch = useDispatch();
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
            <p>{data.data.album.artists[0].name}</p>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="shadow"
              color={data.data.preview_url ? "primary" : "danger"}
              onPress={() => {
                if (data.data.preview_url) {
                  dispatch(loadTracks([data.data.preview_url]));
                }
              }}
            >
              {data.data.preview_url ? "play" : "no preview"}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
