
"use client";
import React, {useEffect, } from "react";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure, ModalProps} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { SearchIcon } from "./icons";
import { getToken, getSearch} from '@/api'
import Track from "./track";
export default function Search() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside"); 
    const handleKeyDown = (event: any) => {
        if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
           onOpen();
        }
    };  

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  async function searchTimeout(e: any) {
    const searchValue = e.target.value;

    // Set a timeout of 300 milliseconds
    const timeout = 300;

    // Clear any existing timeouts
    clearTimeout(this.searchTimer);

    // Set a new timeout
    this.searchTimer = setTimeout(async () => {
        const token = await getToken();
        const searchResponse = await getSearch(token, searchValue, 'track');
        console.log(searchResponse.tracks.items);
    }, timeout);
}

  const searchInput = (
    <Input
        onChange={name}
        aria-label="Search"
        classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
        }}
        endContent={
            <Kbd className="hidden lg:inline-block">
                esc
            </Kbd>
        }
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            
        }
        type="search"
    />
);
const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior} closeButton={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{searchInput}</ModalHeader>
              <ModalBody>
                <p>
                    <Track></Track>
                </p>
                <p>
                    <Track></Track>
                </p>
                <p>
                    <Track></Track>
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
