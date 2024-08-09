import { JwtPayload, jwtDecode } from 'jwt-decode'

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token)
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}
