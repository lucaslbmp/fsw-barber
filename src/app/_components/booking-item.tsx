"use client"

import { Prisma } from "@prisma/client"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { useState } from "react"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)
  const {
    service: { barbershop },
  } = booking
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar reserva. Tente novamente.")
    }
  }
  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }
  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger className="w-full">
          <Card className="min-w-[90%]">
            <CardContent className="flex justify-between p-0">
              {/* ESQUERDA */}
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge
                  variant={isConfirmed ? "default" : "secondary"}
                  className="w-fit"
                >{`${isConfirmed ? "Confirmado" : "Finalizado"}`}</Badge>
                <h3>{booking.service.name}</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>
                  <p className="text-sm">{barbershop.name}</p>
                </div>
              </div>

              {/* DIREITA */}
              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm">
                  {format(booking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, "dd", { locale: ptBR })}
                </p>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>

        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações de reserva
            </SheetTitle>
          </SheetHeader>

          <div className="relative mt-6 flex h-[180px] w-full items-end">
            <Image
              alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
              src="/map.png"
              fill
              className="rounded-xl object-cover"
            />

            <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
              <CardContent className="flex items-center gap-3 px-5 py-3">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>
                  <p className="text-xs">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Badge
              variant={isConfirmed ? "default" : "secondary"}
              className="w-fit"
            >
              {`${isConfirmed ? "Confirmado" : "Finalizado"}`}
            </Badge>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">{booking.service.name}</h2>
                  <span className="text-sm font-bold">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(booking.service.price))}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-sm text-gray-400">Data</h2>
                  <span className="text-sm">
                    {format(booking.date, "d 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-sm text-gray-400">Horário</h2>
                  <span className="text-sm">
                    {format(booking.date, "HH:mm", {
                      locale: ptBR,
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h2 className="text-sm text-gray-400">Barbearia</h2>
                  <span className="text-sm">{barbershop.name}</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {barbershop.phones.map((phone, i) => (
                <PhoneItem key={i} phone={phone} />
              ))}
            </div>
          </div>

          <SheetFooter className="mt-6">
            <div className="flex items-center gap-3">
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  Voltar
                </Button>
              </SheetClose>
              {isConfirmed && (
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button variant="destructive" className="w-full">
                      Cancelar Reserva
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <DialogHeader>
                      <DialogTitle>
                        Você deseja cancelar sua reserva?
                      </DialogTitle>
                      <DialogDescription>
                        Ao cancelar, você perderá sua reserva e não poderá
                        recuperá-la. Essa ação é irreversível.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row gap-3">
                      <DialogClose asChild>
                        <Button variant="secondary" className="w-full">
                          Voltar
                        </Button>
                      </DialogClose>
                      <DialogClose className="w-full">
                        <Button
                          variant="destructive"
                          onClick={handleCancelBooking}
                          className="w-full"
                        >
                          Confirmar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default BookingItem
