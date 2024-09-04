"use client";

import useCheckUserSession from "@/hooks/useCheckUserSession";
import { LoadingScreen } from "./custom/LoadingScreen";

interface Props {
  children: React.ReactNode;
}

export default function SessionProtecter({ children }: Props) {
  const isLoading = useCheckUserSession();

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingScreen />
      </div>
    );
  }

  return <div className="h-screen flex">{children}</div>;
}
