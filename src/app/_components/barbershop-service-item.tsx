import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface BarberShopServiceItemProps {
  service: BarbershopService
}

const BarberShopServiceItem = ({ service }: BarberShopServiceItemProps) => {
  return (
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
              {service.price.toNumber().toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <Button variant={"secondary"} size="sm">
              <p className="text-xs">Reservar</p>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarberShopServiceItem
