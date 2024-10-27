const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

const fetcher = async (path: string, init?: RequestInit) => {
  const url = `${API_URL}${path}`
  const response = await fetch(url, init)
  return response
}

export default fetcher
