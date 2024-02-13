"use client";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { useState } from "@/types";
import {
  Laptop2,
  LucideIcon,
  MessageCircle,
  Mic,
  Phone,
  Plus,
  Video,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const VideoBtn = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const params = useSearchParams();
  const isGuy = params.get("type");

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev + 1 >= 60) {
          setMinutes((prev) => prev + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const format = (min: number, sec: number) => {
    let str;
    let minS;
    let secS;
    if (min < 10) {
      minS = `0${min}`;
    } else {
      minS = `${min}`;
    }
    if (sec < 10) {
      secS = `0${sec}`;
    } else {
      secS = `${sec}`;
    }
    return `${minS}:${secS}`;
  };
  return (
    <Dialog
      onOpenChange={() => {
        setSeconds(0);
        setMinutes(0);
      }}
    >
      <DialogTrigger asChild>
        <Video />
      </DialogTrigger>
      <DialogContent className="min-w-[250px]">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">Pookie 😘</DialogTitle>
          <DialogDescription className="flex-row text-center items-center">
            {format(minutes, seconds)}
          </DialogDescription>
          <DialogDescription className="flex-row text-center items-center">
            Network Quality <span className="text-green-400">Excellent</span>
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Image src={"/roll.gif"} alt="get wrecked" height={520} width={520} />
          <div className="p-6 absolute bottom-0 right-0">
            <Image
              src={"/donkey.jpg"}
              sizes="(max-width: 768px) 100vw, 33vw"
              alt="get wrecked"
              height={120}
              width={120}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 md:gap-8 px-4 md:px-16">
          <Card className="rounded-full grid place-items-center aspect-square">
            <Volume2 className="md:h-8 md:w-8 w-6 h-6 " />
          </Card>
          <Card className="bg-rose-500 rounded-full grid place-items-center aspect-square">
            <Phone className="md:h-8 md:w-8 w-6 h-6 " />
          </Card>
          <Card className="rounded-full grid place-items-center aspect-square">
            <Mic className="md:h-8 md:w-8 w-6 h-6 " />
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
