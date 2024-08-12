import { Search } from "lucide-react"
import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    title?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.title,
        mode: "insensitive",
      },
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">{`Resultados para ${searchParams.title}`}</h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barberShop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
