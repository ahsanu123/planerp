import { createClient } from "@hey-api/client-fetch"

export const BASE_URL = "http://localhost:5136"
export const defaultClient = createClient({ baseUrl: BASE_URL, credentials: 'include', mode: 'cors' })
