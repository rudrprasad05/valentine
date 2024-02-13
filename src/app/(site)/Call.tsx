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
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const icons = [
  { name: Mic },
  { name: MessageCircle },
  { name: Volume2 },
  { name: Video },
  { name: Laptop2 },
  { name: Plus },
];

export const CallBtn = () => {
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
        <Phone />
      </DialogTrigger>
      <DialogContent className="md:min-w-[250px] w-[230px]">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">Pookie 😘</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogDescription className="flex-row text-center items-center">
          {format(minutes, seconds)}
        </DialogDescription>
        <DialogDescription className="flex-row text-center items-center">
          Network Quality <span className="text-green-400">Excellent</span>
        </DialogDescription>
        <div className="grid grid-cols-3 gap-4 md:gap-8 px-4 md:px-16">
          {icons.map((icon, i) => (
            <Card
              key={i}
              className="grid rounded-full place-items-center aspect-square"
            >
              <icon.name className="md:h-8 md:w-8 w-4 h-4 " />
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-8 px-4 md:px-16">
          <div></div>
          <Card className="bg-rose-500 rounded-full grid place-items-center aspect-square">
            <Phone className="md:h-8 md:w-8 w-4 h-4 " />
          </Card>
          <div></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
