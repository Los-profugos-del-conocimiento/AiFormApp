"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { UserSession } from "@/interfaces/IUser";
import useAxios from "./useAxios";
import { cookies } from "next/headers";

const useCheckUserSession = (): void => {

  const { data, error, loading } = useAxios<
    UserSession | { message: string; statusCode: number }
  >({
    url: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth`,
    method: "get",
    withCredentials: true,
  });

  useEffect(() => {
    if (!loading) {
      if (error || (data && "statusCode" in data && data.statusCode === 401)) {
        redirect("/auth/signin");
      }
    }
  }, [data, error, loading]);
};

export default useCheckUserSession;
