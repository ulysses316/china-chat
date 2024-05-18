'use client'
import Image from "next/image";
import Button from "@/components/common/Button";
import { useSession, signIn, signOut } from "next-auth/react"
import Footer from "@/components/common/Footer";

export default function Home() {
  const user = useSession();
  return (
    <>
      <div
        className={`border-highlighter border bg-fondo h-[95dvh] w-full flex justify-center items-center`}>
        <div className="flex justify-center items-center flex-col w-5/6 sm:w-1/2 gap-4">
          <Image src={"/logo.png"} width={250} height={250}></Image>
          <p className="text-highlighter text-center">
            Esta pagina la construi para mi esposa, para poder estar en comunicacion en todo momento.
          </p>
          <div className="flex gap-4">
            {user.status === "authenticated" ? (
              <Button onClick={signOut}>Cerrar sesion</Button>
            ) : (

              <Button href={"/auth/signin"}>Iniciar sesion</Button>
            )}
            <Button onClick={() => alert("Todavia no se puede jeje")}>Solicitar Acceso</Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}