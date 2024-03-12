"use client";

import Image from "next/image";
import AiFormFull from "@/app/images/AiFormFull.jpg";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

export default function SignInPage() {

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-500">
        <div className="p-8 bg-slate-600 shadow-md rounded-lg w-[90vw] md:w-[40vw]">
          <div className="flex flex-col items-center">
            {/* Image Placeholder - Replace the src with your desired image */}
            <Image
              src={AiFormFull}
              alt="AiForm Logo"
              width={400}
              height={400}
              className="mb-4"
            />

            {/* Login Text */}
            <p className="mb-4 text-center text-slate-200">
              Antes de usar nuestra aplicación, inicia sesión para continuar.
            </p>

            {/* Google Sign-in Button */}
            <Button
              onClick={() => {}}
              className="flex items-center justify-center px-4 py-2 mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              asChild
            >
              <Link
                href={
                  "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&response_type=code&client_id=529497607039-ci9s8bc5qbfvl0o3ku39us2rscc2v52p.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fauth%2Fgoogle"
                }
              >
                <FaGoogle size={24} className="mr-4" />
                Inicia sesión con Google
              </Link>
            </Button>

            <Link
              href="/"
              className="mt-4 text-sm hover:underline text-gray-950"
            >
              Cancelar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
