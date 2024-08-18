import { Spinner } from "./ui/spinner"

const LoadingPage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner size={"large"} />
    </div>
  )
}

export default LoadingPage
