"use client"

import { forwardRef } from "react"
import { StarIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

type RatingProps = React.InputHTMLAttributes<HTMLInputElement> & {
  defaultValue: number
}

const Rating = forwardRef<HTMLInputElement, RatingProps>((props, ref) => {
  const name = props.name ?? "unknown"
  const { register, setValue, getValues, watch } = useFormContext()
  //const [rating, setRating] = useState(toNumber(value))

  return (
    <div className={"flex " + props.className}>
      <input {...props} className="hidden" {...register(name)} ref={ref} />
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <StarIcon
            key={"star-" + i}
            strokeWidth={1}
            color="#26272b"
            size={42}
            className={`cursor-pointer ${i < +watch(name) ? "fill-primary" : "fill-trasparent"}`}
            onClick={() =>
              setValue(name, i === +getValues(name) - 1 ? 0 : i + 1)
            }
          />
        ))}
    </div>
  )
})
Rating.displayName = "Rating"
export default Rating
