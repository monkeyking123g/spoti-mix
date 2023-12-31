"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalProps,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "./icons";
import { getToken, getSearch } from "@/api";
import Track from "./searchTrack";
import { SpotifyTrack } from "@/api/types";

export default function Search() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    useState<ModalProps["scrollBehavior"]>("inside");
  const [searchValue, setSearchValue] = useState<SpotifyTrack[]>([]);
  let searchTimer: NodeJS.Timeout;

  const handleKeyDown = (event: any) => {
    if (event.key === "k" && event.ctrlKey) {
      event.preventDefault();
      onOpen();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const searchTimeout = async (e: { target: { value: string } }) => {
    const inputValue = e.target.value;
    const timeout = 500;

    clearTimeout(searchTimer);

    searchTimer = setTimeout(async () => {
      const token = await getToken();
      const searchResponse = await getSearch(token, inputValue, "track");
      setSearchValue(searchResponse.tracks?.items);
    }, timeout);
  };

  const searchInput = (
    <Input
      onChange={searchTimeout}
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        hideCloseButton={true}
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {searchInput}
              </ModalHeader>
              <ModalBody>
                {searchValue &&
                  searchValue
                    .slice(0, 5)
                    .map((track: SpotifyTrack, index: number) => {
                      return (
                        <p>
                          <Track key={index} data={track} />
                        </p>
                      );
                    })}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
