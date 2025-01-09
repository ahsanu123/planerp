import { dirname } from "path"
import { fileURLToPath } from "url"

/**
 * @param url - default to import.meta.url
 * @returns 
 */
export function getDirname(url: string): string {
  const __filename = fileURLToPath(url)
  const __dirname = dirname(__filename)
  return __dirname
}
