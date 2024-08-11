import { SearchIcon } from "lucide-react"
import { Button } from "./_components/ui/button"
import Header from "./_components/ui/header"
import { Input } from "./_components/ui/input"
import Image from "next/image"

export default function Home() {
  return (
    <main className="mb-5">
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Lucas!</h2>
        <p>Segunda-feira, 05 de agosto</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative h-[150px] w-full">
          <Image
            src="/banner01.png"
            alt="Agende nos melhores com FSW BArber"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </main>
  )
}
