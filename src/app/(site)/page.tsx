import Image from "next/image";
import { PhoneComponent } from "./Phone";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url('/bg.jpeg')`,
        // backdropFilter: `blur(20px)`,
      }}
      className="w-screen max-h-screen py-12 md:py-6 backdrop-blur-sm"
    >
      <PhoneComponent />
    </div>
  );
}
