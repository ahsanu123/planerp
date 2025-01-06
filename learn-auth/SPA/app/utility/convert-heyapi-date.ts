import { parseISO } from "date-fns"

export function toDate(date: Date) {
  return parseISO(date.toString())
}
