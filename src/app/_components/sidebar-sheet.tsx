"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import Link from "next/link"
import Image from "next/image"
// import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
// import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog"
import SignInDialog from "./sign-in-dialog"

const SidebarSheet = () => {
  const data = {
    user: {
      name: "Lucas",
      email: "lucasset10@msn.com",
      image: "/banner.png",
    },
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* DADOS DE LOGIN */}
      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant={"ghost"} asChild>
            <Link href={"/"}>
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant={"ghost"}>
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-2"
            variant={"ghost"}
          >
            <Image
              src={option.imageUrl}
              height={18}
              width={18}
              alt={option.title}
            />
            {option.title}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 py-5">
        <Button className="justify-start gap-2" variant={"ghost"}>
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
