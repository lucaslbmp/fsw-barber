"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemprops {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemprops) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado com sucesso!")
  }
  return (
    <div className="space-y-2 p-5">
      <div className="flex justify-between">
        {/* ESQUERDA  */}
        <div className="flex items-center gap-2 text-sm">
          <SmartphoneIcon />
          <p>{phone}</p>
        </div>

        {/* DIREITA */}
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => handleCopyPhoneClick(phone)}
        >
          Copiar
        </Button>
      </div>
    </div>
  )
}

export default PhoneItem
