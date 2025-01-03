import { displayAsClock } from "../utility/display-as-clock"
import { useEffect, useState } from "react"

export default function Clock() {
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])


  return (
    <div>
      <b>
        {displayAsClock(date)}
      </b>
    </div>
  )
}
