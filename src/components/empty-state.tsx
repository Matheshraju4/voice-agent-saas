"use client";

import { AlertCircleIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
}
const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col  items-center justify-center ">
      <Image src={"/empty.svg"} alt="Empty" width={240} height={240} />
      <div className="flex flex-col gap-y-6 max-w-md mx-auto text-center">
        <h1 className="text-lg font-medium">{title}</h1>
        <p className="text-sm text-muted-foreground ">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
