import BarberShopServiceItem from "@/app/_components/barbershop-service-item"
import PhoneItem from "@/app/_components/phone-item"
import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarberShopPageProps {
  params: {
    id: string
  }
}

const BarberShopPage = async ({ params }: BarberShopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: { id: params.id },
    include: {
      services: true,
    },
  })
  if (!barbershop) {
    return notFound()
  }
  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <Button
          size={"icon"}
          variant={"secondary"}
          className="absolute left-4 top-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size={"icon"}
          variant={"secondary"}
          className="absolute left-4 top-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size={"icon"}
          variant={"secondary"}
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      {/* INFO */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" />
          <p>5,0 (889 avaliações)</p>
        </div>
      </div>

      {/* DESCRIÇAO */}
      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="space-y-3 p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((service, i) => (
            <BarberShopServiceItem key={i} service={service} />
          ))}
        </div>
      </div>

      {/* CONTATO */}
      <div className="space-y-2 p-5">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarberShopPage
