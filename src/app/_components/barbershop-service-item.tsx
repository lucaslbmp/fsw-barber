"use client"

import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { format, set } from "date-fns"
import createBooking from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

interface BarberShopServiceItemProps {
  service: BarbershopService
  barbershop: string
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const BarberShopServiceItem = ({
  service,
  barbershop,
}: BarberShopServiceItemProps) => {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return
      const [hours, mins] = selectedTime?.split(":").map(Number)
      const newDate = set(selectedDay, { minutes: mins, hours: hours })
      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })
      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Error ao criar reserva!")
    }
  }

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          {/* IMAGE */}
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px] basis-[98px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-xs">{service.description}</p>
            {/* PREÇO E BOTAO */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </span>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"secondary"} size="sm">
                    <p className="text-xs">Reservar</p>
                  </Button>
                </SheetTrigger>

                <SheetContent className="px-0">
                  <SheetHeader className="mx-auto">
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid py-5">
                    <Calendar
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      mode="single"
                      locale={ptBR}
                    />
                  </div>

                  {selectedDay && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid px-5 [&::-webkit-scrollbar]:hidden">
                      {TIME_LIST.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-full"
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {selectedTime && selectedDay && (
                    <div className="my-5">
                      <Card>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <span className="text-sm font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <span className="text-sm">
                              {format(selectedDay, "d 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                            <span className="text-sm">{barbershop}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  <SheetFooter className="mt-5 px-5">
                    <SheetClose asChild>
                      <Button
                        onClick={handleCreateBooking}
                        disabled={!selectedDay || !selectedTime}
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BarberShopServiceItem
