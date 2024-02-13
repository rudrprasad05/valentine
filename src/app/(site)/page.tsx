import Image from "next/image";
import { PhoneComponent } from "./Phone";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export type Props = {
  searchParams: { type: string | undefined };
};

export default function Home({ searchParams }: Props) {
  if (searchParams.type == undefined)
    return (
      <div
        style={{
          backgroundImage: `url('/bg.jpeg')`,
        }}
        className="w-screen h-screen"
      >
        <div className="bg-background/10 w-screen h-screen py-12 md:py-6 backdrop-blur-sm">
          <div className="px-6 py-4 bg-card w-full md:w-[520px] mx-auto rounded-md">
            <div>
              <p className="text-3xl">You are...</p>
            </div>
            <div className="pt-6">
              <div className="flex gap-6">
                <Link
                  className={`${buttonVariants({ variant: "default" })} grow`}
                  href={"?type=guy"}
                >
                  ♂️ Male
                </Link>
                <Link
                  className={`${buttonVariants({ variant: "default" })} grow`}
                  href={"?type=girl"}
                >
                  ♀️ Female
                </Link>
              </div>
              <div className="pt-6 w-full">
                <Link
                  className={`w-full ${buttonVariants({
                    variant: "secondary",
                  })}`}
                  href={"?type=girl"}
                >
                  Idc just here for the vibes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div
      style={{
        backgroundImage: `url('/bg.jpeg')`,

        // backdropFilter: `blur(20px)`,
      }}
      className="w-screen max-h-screen"
    >
      <div className="bg-background/10 w-screen h-screen py-0 md:py-6 backdrop-blur-sm">
        <PhoneComponent type={searchParams.type} />
      </div>
    </div>
  );
}
