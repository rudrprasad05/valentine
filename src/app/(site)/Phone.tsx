"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Heart, Phone, Video, WifiOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { CallBtn } from "./Call";
import { Button } from "@/components/ui/button";
import { Props } from "./page";
import { useSearchParams } from "next/navigation";

export type Foo = {
  constant: number;
  who: string;
  msg: string;
  type: "TEXT" | "IMG" | "TYPING";
};

let MSG: Foo[] = [
  { constant: 1, who: "POOKIE", msg: "Heyyy", type: "TEXT" },
  { constant: 1, who: "ME", msg: "Hi...", type: "TEXT" },
  { constant: 1, who: "POOKIE", msg: "wyd? busy?", type: "TEXT" },
  { constant: 1, who: "ME", msg: "nahh", type: "TEXT" },
  { constant: 1, who: "ME", msg: "what up?", type: "TEXT" },
  { constant: 1, who: "POOKIE", msg: "so... i had a question", type: "TEXT" },
  { constant: 1, who: "POOKIE", msg: "/gif1.gif", type: "IMG" },
  { constant: 1, who: "POOKIE", msg: "will you be my valentine", type: "TEXT" },
];

export const PhoneComponent = ({ type }: { type: string }) => {
  const isGuy = type == "guy";
  const params = useSearchParams();
  const [ticking, setTicking] = useState(true),
    [count, setCount] = useState(0);

  const [tempMsg, setTempMsg] = useState(MSG);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [tempMsg]);

  const unsend = () => {
    setTempMsg((prev) => prev.filter((_, index) => index !== prev.length - 1));
  };

  return (
    <Card
      style={{
        backgroundImage: `url('/bg.jpeg')`,
        backgroundColor: `rgb(0,0,0,0.5)`,
      }}
      className="max-w-md bg-background my-auto mx-auto max-h-screen overflow-clip relative"
    >
      <CardHeader className="flex border-b flex-row justify-between px-6 py-3">
        <div className="flex gap-3 items-center">
          <Avatar className={cn("rounded-full border border-primary")}>
            <AvatarImage
              className="object-cover"
              src={isGuy ? "my_pic.jpeg" : "abs.jpeg"}
            />
            <AvatarFallback>{"ILY"}</AvatarFallback>
          </Avatar>
          <h1 className="text-secondary">Pookie 😘</h1>
        </div>

        <div className="flex gap-3 text-secondary">
          <CallBtn />
          <Video />
        </div>
      </CardHeader>
      <CardContent className="p-6 text-right h-[500px] overflow-scroll">
        <ScrollArea className="">
          {tempMsg.map((msg, index) => {
            if (msg.type == "TEXT") {
              return (
                <HandleText
                  unsend={unsend}
                  index={index}
                  key={msg.msg}
                  msg={msg}
                />
              );
            } else if (msg.type == "IMG") {
              return (
                <HandleImg
                  constant={msg.constant}
                  index={index}
                  key={msg.msg}
                  msg={msg}
                />
              );
            } else if (msg.type == "TYPING") {
              return <HandleTyping index={index} key={msg.msg} msg={msg} />;
            }
          })}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="px-6 md:py-3 h-16 md:border-t border-background">
        <div className="flex gap-3 w-full items-center">
          <div className="grow gap-6 flex">
            <Button
              className="grow"
              onClick={() => {
                setTempMsg((prev) => [
                  ...prev,
                  {
                    who: "ME",
                    msg: "Yes",
                    type: "TEXT",
                    constant: 0,
                  },
                ]);
              }}
            >
              ✅ Yes
            </Button>
            <Button
              className="grow"
              onClick={() => {
                setTempMsg((prev) => [
                  ...prev,
                  {
                    who: "ME",
                    msg: "No",
                    type: "TEXT",
                    constant: 0,
                  },
                ]);
              }}
            >
              🛑 No
            </Button>
          </div>

          <Heart
            onClick={() => {
              setTempMsg((prev) => [
                ...prev,
                {
                  who: "ME",
                  msg: "/heart.png",
                  type: "IMG",
                  constant: 0,
                },
              ]);
            }}
            className="text-primary"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

const HandleTyping = ({ msg, index }: { msg: any; index: number }) => {
  return (
    <motion.div
      className="flex gap-3 relative left-[-250px]  text-primary-foreground text-sm"
      animate={{
        transitionEnd: {
          display: "none",
        },
      }}
      transition={{ delay: 1 * index + 1 }}
    >
      <p className="rounded-md bg-primary px-3 py-2">{msg.msg}</p>
    </motion.div>
  );
};

const HandleText = ({
  msg,
  index,
  unsend,
}: {
  msg: Foo;
  index: number;
  unsend: () => void;
}) => {
  if (msg.who == "ME") {
    return <MyMessage index={index} msg={msg} constant={msg.constant} />;
  }

  return <PookieMessage index={index} msg={msg.msg} constant={msg.constant} />;
};

const HandleImg = ({
  msg,
  index,
  constant,
}: {
  msg: Foo;
  index: number;
  constant: number;
}) => {
  if (msg.msg.toLowerCase() == "yes") {
    return (
      <>
        <div className="w-full flex items-center mb-2 relative">
          <motion.div
            className="relative ml-auto right-[-250px]  text-primary-foreground text-sm"
            animate={{ x: -250 }}
            transition={{ delay: 1 * index * constant }}
          >
            <div className={cn("flex gap-3 ml-auto")}>
              <p className="rounded-md bg-secondary text-secondary-foreground px-3 py-2">
                yes 😘
              </p>
              <MyAvatar />
            </div>
          </motion.div>
        </div>
        <div className="w-full flex items-center mb-2 relative">
          <motion.div
            className="flex gap-3 relative left-[-250px]  text-primary-foreground text-sm"
            animate={{ x: 250 }}
            transition={{ delay: 1 }}
          >
            <div className="flex gap-3 items-center">
              <PookieAvatar />
              <Image
                className="rounded-md"
                src={"/gif2.gif"}
                alt="pookie"
                height={150}
                width={150}
              />
            </div>
          </motion.div>
        </div>
      </>
    );
  }
  if (msg.who == "ME")
    return (
      <div className="w-full flex items-center mb-2 relative">
        <motion.div
          className="flex gap-3 relative ml-auto right-[-250px]  text-primary-foreground text-sm"
          animate={{ x: -250 }}
          transition={{ delay: 1 * index * constant }}
        >
          <div>
            <Image
              className="rounded-md"
              src={msg.msg}
              alt="pookie"
              height={150}
              width={150}
            />
          </div>
          <MyAvatar />
        </motion.div>
      </div>
    );

  return (
    <div className="w-full flex items-center mb-2 relative">
      <motion.div
        className="flex gap-3 relative left-[-250px]  text-primary-foreground text-sm"
        animate={{ x: 250 }}
        transition={{ delay: 1 * index * constant }}
      >
        <div className="flex gap-3 items-center">
          <PookieAvatar />
          <Image
            className="rounded-md"
            src={msg.msg}
            alt="pookie"
            height={150}
            width={150}
          />
        </div>
      </motion.div>
    </div>
  );
};

const MyMessage = ({
  msg,
  index,
  constant,
}: {
  msg?: Foo;
  index: number;
  constant: number;
}) => {
  if (msg?.msg.toLowerCase() == "yes") {
    return <HandleImg msg={msg} index={0} constant={0} />;
  }
  return (
    <div className="w-full flex items-center mb-2 relative">
      <motion.div
        className="relative ml-auto right-[-250px]  text-primary-foreground text-sm"
        animate={{ x: -250 }}
        transition={{ delay: 1 * index * constant }}
      >
        {msg?.msg.toLowerCase() == "no" && (
          <div className="flex gap-3 text-sm items-center">
            <WifiOff className="w-3 h-3 text-red-500" />
            Message not sent
          </div>
        )}
        <div
          className={cn(
            "flex gap-3 ml-auto",
            msg?.msg.toLowerCase() == "no" && "w-min"
          )}
        >
          <p className="flex gap-1 rounded-md text-secondary-foreground bg-secondary px-3 py-2">
            {msg?.msg as string} <p>😠</p>
          </p>
          <MyAvatar />
        </div>
      </motion.div>
    </div>
  );
};

const PookieMessage = ({
  msg,
  index,
  constant,
}: {
  msg?: string;
  index: number;
  constant: number;
}) => {
  return (
    <div className="w-full  flex items-center mb-2 relative">
      <motion.div
        className="flex gap-3 relative left-[-250px]  text-primary-foreground text-sm"
        animate={{ x: 250 }}
        transition={{ delay: 1 * index * constant }}
      >
        <PookieAvatar />
        <p className="rounded-md bg-primary px-3 py-2">{msg}</p>
      </motion.div>
    </div>
  );
};

const PookieAvatar = () => {
  const params = useSearchParams();
  const isGuy = params.get("type");
  return (
    <Avatar
      className={cn("w-6 h-6 mt-auto rounded-full border border-primary")}
    >
      <AvatarImage
        className="object-cover"
        src={isGuy ? "abs.jpeg" : "my_pic.jpeg"}
      />
      <AvatarFallback>{"ILY"}</AvatarFallback>
    </Avatar>
  );
};

const MyAvatar = () => {
  const params = useSearchParams();
  const isGuy = params.get("type");
  return (
    <Avatar
      className={cn("w-6 h-6 mt-auto rounded-full border border-primary")}
    >
      <AvatarImage
        className="object-cover"
        src={isGuy ? "my_pic.jpeg" : "abs.jpeg"}
      />
      <AvatarFallback>{"ILY"}</AvatarFallback>
    </Avatar>
  );
};
