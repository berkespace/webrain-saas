// API helper fonksiyonları - şirket ağı için optimize edilmiş

export const API_TIMEOUT = 30000 // 30 saniye
export const MAX_RETRIES = 3
export const RETRY_DELAY = 1000 // 1 saniye

export async function fetchWithRetry(
  url: string, 
  options: RequestInit = {}, 
  retries: number = MAX_RETRIES
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    
    if (retries > 0 && (error as Error).name === 'AbortError') {
      console.warn(`API timeout, retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`)
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return fetchWithRetry(url, options, retries - 1)
    }
    
    throw error
  }
}

export function createApiResponse(data: any, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  })
}

export function createErrorResponse(message: string, status: number = 500) {
  return createApiResponse({ error: message }, status)
}
