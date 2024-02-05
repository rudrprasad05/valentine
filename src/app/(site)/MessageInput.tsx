import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, SendHorizontal } from "lucide-react";
import React from "react";
import { Foo } from "./Phone";

const MessageInput = ({ arr }: { arr: Foo[] }) => {
  return (
    <div className="flex gap-3 w-full items-center">
      <div className="grow">
        <Button
          onClick={() => {
            arr.push({
              who: "ME",
              msg: "Yes",
              type: "TEXT",
              constant: 0,
            });
          }}
        >
          Yes
        </Button>
        <Button
          onClick={() => {
            arr.push({
              who: "ME",
              msg: "No",
              type: "TEXT",
              constant: 0,
            });
          }}
        >
          No
        </Button>
      </div>

      <Heart
        onClick={() => {
          arr.push({
            who: "ME",
            msg: "/heart.png",
            type: "IMG",
            constant: 0,
          });
          console.log("first");
        }}
        className="text-primary"
      />
    </div>
  );
};

export default MessageInput;
