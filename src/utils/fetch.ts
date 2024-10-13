const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
const NODE_ENV = process.env.NODE_ENV

const fetcher = async (path: string, init?: RequestInit) => {
  let initReq: RequestInit | undefined = init

  if (!init?.method || init?.method === 'GET') {
    if (NODE_ENV === 'development') {
      initReq = {
        ...init,
        cache: 'no-store',
      }
    } else {
      initReq = {
        ...init,
        next: {
          revalidate: 3600,
        },
      }
    }
  }

  const url = `${API_URL}${path}`
  const response = await fetch(url, initReq)
  return response
}

export default fetcher
