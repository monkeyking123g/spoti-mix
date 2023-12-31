"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { ChipProps, Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { getToken, getTracks } from "@/api";
import { SpotifyTrack } from "@/api/types";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { useDispatch } from "react-redux";
import { loadTracks } from "@/redux/slices/playerSlice";

const columns = [
  { name: "IMAGE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "PREVIEW", uid: "preview" },
  { name: "ACTIONS", uid: "actions" },
];

export default function PlayListTracks(params: {
  searchParams: { href: string };
}) {
  const [tracks, setTracks] = React.useState<SpotifyTrack[]>([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      const tracks = await getTracks(token, params.searchParams.href);
      setTracks(tracks);
    }
    fetchData();
  }, []);

  const renderCell = React.useCallback(
    (track: SpotifyTrack, columnKey: React.Key) => {
      const cellValue = track[columnKey as keyof SpotifyTrack];

      switch (columnKey) {
        case "image":
          return (
            <Image
              height={50}
              width={50}
              className="object-cover"
              alt="NextUI hero Image"
              src={track.track.album.images[0].url}
            />
          );
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {track.track.name}
              </p>
            </div>
          );
        case "preview":
          return (
            <Chip
              className="capitalize"
              color={track.track.preview_url ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {track.track.preview_url ? "YES" : "NO"}
            </Chip>
          );
        case "actions":
          return (
            <Button
              disabled={!track.track.preview_url}
              onClick={() => {
                if (track.track.preview_url) {
                  dispatch(loadTracks([track.track.preview_url]));
                }
              }}
              color={track.track.preview_url ? "primary" : "default"}
              size="md"
            >
              Play
            </Button>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <ScrollShadow hideScrollBar orientation="horizontal" className="h-[700px]">
      <Table selectionMode="single">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={"start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={tracks}>
          {(item) => (
            <TableRow key={item.track.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollShadow>
  );
}
