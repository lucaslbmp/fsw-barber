import { Barbershop, Rating } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { StarIcon } from "lucide-react"
import { Badge } from "./ui/badge"
import Link from "next/link"
import { getRatingAvg } from "../_utils"

interface BarberhopProps {
  barberShop: Barbershop & { ratings: Rating[] }
}

const BarbershopItem = ({ barberShop }: BarberhopProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pb-2 pt-1">
        {/* IMAGEM */}
        <div className="relative h-[159px] w-full">
          <Image
            fill
            className="rounded-2xl object-cover"
            src={barberShop.imageUrl}
            alt="barbershop-image"
          />

          {/* RATING */}
          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">
              {getRatingAvg(barberShop.ratings)}
            </p>
          </Badge>
        </div>

        {/* TEXTO */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barberShop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barberShop.address}</p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershops/${barberShop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
