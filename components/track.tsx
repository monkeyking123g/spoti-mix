import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { PauseIcon, PlayIcon } from "./icons";
import { Chip } from "@nextui-org/chip";
export default function Track(data: any) {
  console.log(data);
  const [isPlay, setIsPlay] = React.useState(false);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
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

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90">
                  {data.data.name}
                </h3>
                <Chip color="primary">{data.data.album.artists[0].name}</Chip>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setIsPlay((v) => !v)}
              >
                {isPlay ? <PauseIcon /> : <PlayIcon />}
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
