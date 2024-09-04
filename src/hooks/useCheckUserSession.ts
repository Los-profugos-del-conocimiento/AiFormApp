"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { UserSession } from "@/interfaces/IUser";
import useAxios from "./useAxios";

const useCheckUserSession = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      } else {
        setIsLoading(false); // La sesión es válida, dejar de cargar
      }
    }
  }, [data, error, loading]);

  return isLoading;
};

export default useCheckUserSession;
