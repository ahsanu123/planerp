import { getRandomArbitrary } from "../utility/random-arbitrary"
import "./Calendar.css"

const TOTAL_DAYS_TO_SHOW = 42
const DAY_TO_DISPLAY = 7

interface CalendarObject {
  year: number,
  month: number,
  date: number,
  totalDays: number,
}

const sundayStartdays = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
]

const indoDays = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
]

function generateCalendarObject(currentDate: Date) {

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const date = currentDate.getDate()
  const day = new Date(year, month, 1).getDay()

  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ]

  const calendar: CalendarObject = {
    year,
    month,
    date,
    totalDays: new Date(year, month, 0).getDate(),
  }

  const currentDay = indoDays[day - 1]
  const firstDateIndex = sundayStartdays.findIndex((item) => item === currentDay)

  for (let i = 0; i < TOTAL_DAYS_TO_SHOW; i++) {
    if (i < firstDateIndex)
      days.push("-")
    else if (i >= firstDateIndex + calendar.totalDays)
      days.push("-")
    else
      days.push((i - firstDateIndex + 1).toString())
  }

  return days
}

export default function Calendar() {

  const date = new Date()
  const days = generateCalendarObject(date)

  const gridComponent = (date: string, amount?: number | string) => {
    const includeDash = date.includes("-")
    return (
      <div
        className={`component ${includeDash ? "stripe" : ""}`}
      >
        <p>
          {(!includeDash && amount)
            ? `Ambil ${amount}` : "🚧"
          }
        </p>
        <sub>
          <b>
            {date}
          </b>
        </sub>
      </div>
    )
  }
  return (
    <>
      <h5>
        🌕 {date.toLocaleDateString("id-id", { month: 'long' })}
      </h5>
      <div
        className="ams-calendar"
      >
        {days.map((item, index) => (
          <>
            {index < DAY_TO_DISPLAY
              ? (<b>{item}</b>)
              : gridComponent(item, getRandomArbitrary(1, 4).toFixed())
            }
          </>
        ))}

        <hr />
      </div>
    </>
  )
}
