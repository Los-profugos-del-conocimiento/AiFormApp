"use client";

import useCheckUserSession from "@/hooks/useCheckUserSession";

interface Props {
  children: React.ReactNode;
}

export default function SessionProtecter({ children, ...rest }: Props) {
  useCheckUserSession();
  return <div className="h-screen flex">{children}</div>;
}
