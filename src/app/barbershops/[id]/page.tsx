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
  const barberShop = await db.barbershop.findUnique({
    where: { id: params.id },
  })
  if (!barberShop) {
    return notFound()
  }
  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-[250px] w-full">
        <Image
          src={barberShop.imageUrl}
          alt={barberShop.name}
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
        <h1 className="mb-3 text-xl font-bold">{barberShop.name}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" />
          <p className="text-sm">{barberShop.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" />
          <p>5,0 (889 avaliações)</p>
        </div>
      </div>

      {/* DESCRIÇAO */}
      <div className="space-y-2 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barberShop.description}</p>
      </div>
    </div>
  )
}

export default BarberShopPage
