import { Button } from "./_components/ui/button"
import Header from "./_components/header"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./_components/ui/carousel"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const barberShops = await db.barbershop.findMany({
    include: { ratings: true },
  })
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
    include: { ratings: true },
  })
  const boookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: { service: { include: { barbershop: true } } },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <main className="mb-5">
      <Header />
      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "bem vindo"}!
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd", { locale: ptBR })}
          </span>
          <span>&nbsp;de&nbsp;</span>
          <span className="capitalize">
            {format(new Date(), "MMMM", { locale: ptBR })}
          </span>
        </p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner01.png"
            alt="Agende nos melhores com FSW BArber"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        {!!boookings.length && (
          <>
            <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
              Agendamentos
            </h2>

            <Carousel className="mx-12 max-w-full">
              <CarouselContent>
                {boookings.map((booking) => (
                  <CarouselItem
                    key={booking.id}
                    className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <BookingItem
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                    {/* <div>aaa</div> */}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </>
        )}

        {/* RECOMENDADOS */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <Carousel className="mx-12 max-w-full">
          <CarouselContent>
            {barberShops.map((barberShop) => (
              <CarouselItem
                key={barberShop.id}
                className="basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
              >
                <BarbershopItem barberShop={barberShop} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* RECOMENDADOS */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <Carousel className="mx-12 max-w-full">
          <CarouselContent>
            {popularBarberShops.map((barberShop) => (
              <CarouselItem
                key={barberShop.id}
                className="basis-full xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
              >
                <BarbershopItem key={barberShop.id} barberShop={barberShop} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  )
}
