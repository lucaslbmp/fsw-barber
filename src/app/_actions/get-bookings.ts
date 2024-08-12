"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsProps {
  serviceId: string
  date: Date
}

export const getBookings = ({ serviceId, date }: GetBookingsProps) => {
  return db.booking.findMany({
    where: {
      service: {
        id: serviceId,
      },
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
