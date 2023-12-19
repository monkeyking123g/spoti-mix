"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";

export default function TrackPage() {
  const tracks = [1, 2, 4, 5, 5, 6, 1, 2, 4, 5, 5, 6];
  return tracks.map(() => {
    return (
      <Card className="py-4">
        <CardHeader className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://source.unsplash.com/random/200x200?sig=1"
            width={270}
          />
        </CardHeader>
        <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
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
