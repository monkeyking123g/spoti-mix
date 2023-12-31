"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { getToken, getTracks } from "@/api";
import { SpotifyTrack } from "@/api/types";
import { loadTracks } from "@/redux/slices/playerSlice";
import { useDispatch } from "react-redux";
import Error from "@/app/error";

interface TrackCardProps {
  data: SpotifyTrack;
  dispatch: any;
}

const PHONK_LIST =
  "https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt/tracks/";

export default function TrackPage() {
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const tracks = await getTracks(token, PHONK_LIST);

        if (tracks) {
          setTracks(tracks);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoad(false);
      }
    };
    fetchData();
  }, []);

  if (load) {
    const skeletonArray = Array(20).fill(null);
    return skeletonArray.map((_, index) => <TrackSkeleton key={index} />);
  }

  if (error) {
    return <Error error={error} reset={() => history.back()}></Error>;
  }

  return tracks.map((data) => (
    <TrackCard data={data} dispatch={dispatch} key={data.track.id} />
  ));
}

function TrackCard({ data, dispatch }: TrackCardProps) {
  return (
    <Card key={data.track.id} className="pt-1">
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
      <CardFooter className="flex justify-between ">
        {data.track.preview_url ? (
          <Button
            onClick={() => {
              if (data.track.preview_url) {
                dispatch(loadTracks([data.track.preview_url]));
              }
            }}
            variant="shadow"
            color="primary"
            size="md"
            radius="sm"
          >
            Play
          </Button>
        ) : (
          <Button variant="shadow" color="danger">
            Nou preview
          </Button>
        )}
        <h4 className="font-bold text-large">00:25</h4>
      </CardFooter>
    </Card>
  );
}

function TrackSkeleton() {
  return (
    <Card className="space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-60 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <div className="flex justify-between">
          <Skeleton className="w-2/5 rounded-lg grid grid-cols-2 gap-2">
            <div className="h-6 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-14 rounded-lg grid grid-cols-2 gap-2">
            <div className="h-3 w-2 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </div>
    </Card>
  );
}
