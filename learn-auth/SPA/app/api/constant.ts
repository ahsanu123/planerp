import { createClient } from "@hey-api/client-fetch"

export const BASE_URL = "http://localhost:5136"
export const defaultClient = createClient({ baseUrl: BASE_URL, credentials: 'include', mode: 'cors' })

// TODO: fix return url parameter
export const externalAuthenticationGoogleProviderUrl = "http://localhost:5136/Account/ExternalLogin?provider=Google&returnUrl=%2F"
