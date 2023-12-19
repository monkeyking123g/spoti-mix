"use client";
import { useState } from "react";
import { title } from "@/components/primitives";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
export default function PlayList() {
  const tracks = [1, 2, 4, 5, 5, 6, 1, 2, 4, 5, 5, 6];
  let tabs = [
    {
      id: "photos",
      label: "Photos",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "music",
      label: "Music",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: "videos",
      label: "Videos",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleChangeTab = (newTabId: string) => {
    setActiveTab(newTabId);
  };

  return (
    <>
      <div className="flex justify-between p-3 items-center">
        <h1 className={title()}>PlayList</h1>
        <div className="flex  flex-col">
          <Tabs
            aria-label="Dynamic tabs"
            items={tabs}
            selectedKey={activeTab}
            onSelectionChange={handleChangeTab}
          >
            {(item: any) => <Tab key={item.id} title={item.label}></Tab>}
          </Tabs>
        </div>
      </div>
      <section className="grid grid-cols-4 gap-4">
        {tracks.map((i) => {
          return (
            <Card key={i} className=" h-[400px]">
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  What to watch
                </p>
                <h4 className="text-white font-medium text-large">
                  Stream the Acme event
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src="https://source.unsplash.com/random/200x200?sig=1"
              />
            </Card>
          );
        })}
      </section>
    </>
  );
}
