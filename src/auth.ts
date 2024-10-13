import NextAuth, { CredentialsSignin } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import fetcher from './utils/fetch'

class CustomLoginError extends CredentialsSignin {
  constructor(message: string) {
    super(message)
    this.code = message
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: 'jwt',
    maxAge: 3 * 24 * 60 * 60,
  },
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new CustomLoginError('Email and password are required')
        }

        try {
          const res = await fetcher(`/admins/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          const data = await res.json()
          if (res.ok || res.status === 200) {
            return data.data
          } else {
            throw new CustomLoginError(data.message || 'Masuk tidak valid')
          }
        } catch (error: any) {
          throw new CustomLoginError(error.message || 'Terjadi kesalahan yang tidak terduga')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.user.accessToken = token.accessToken as string
        session.user.id = token.id as string
        session.user.username = token.username as string
      }

      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.AUTH_SECRET,
})
