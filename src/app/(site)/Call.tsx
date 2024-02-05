"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { useState } from "@/types";
import { Phone } from "lucide-react";

export const CallBtn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Phone />
      </DialogTrigger>
      <DialogContent className="min-w-[720px]">
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
          <DialogDescription>Create New Product</DialogDescription>
        </DialogHeader>
        <DialogDescription>Calling Tanisha</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
