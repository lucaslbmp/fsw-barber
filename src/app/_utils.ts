import { Rating } from "@prisma/client"

export const getRatingAvg = (array: Array<Rating>) =>
  array.length
    ? (
        array.reduce((acc, val) => acc + val.value.toNumber(), 0) / array.length
      ).toFixed(1)
    : "?"
