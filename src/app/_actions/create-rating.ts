"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"
import { Decimal } from "@prisma/client/runtime/library"

interface CreateRatingParams {
  value: Decimal
  barbershopId: string
}

const createRating = async (params: CreateRatingParams) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Usuário nao autenticado!")
  }
  await db.rating.create({
    data: { ...params, userId: (session.user as any)?.id },
  })
}

export default createRating
