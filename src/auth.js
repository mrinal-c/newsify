import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      authorization: 'https://accounts.spotify.com/authorize?scope=user-top-read%20user-read-email'
    })
  ],
  callbacks: {
    jwt({token, user, account}) {
      if (account?.provider === "spotify") {
        token.accessToken = account.access_token;
        // token.accessTokenExpiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      // session.accessTokenExpiresAt = token.accessTokenExpiresAt;
      return session;
    }
  },
  session: {
    maxAge: 60 * 60
  },
  pages: {
    error: '/error'
  }
})