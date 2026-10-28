import { betterAuth, } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db("wonderland-db")

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
  },

  // Set trustedProviders :
  account: {
    accountLinking: {
      enabled: true,
      // Google verifies its email address; allow it to link to an existing
      // email/password account even if that account has not verified email yet.
      requireLocalEmailVerified: false,
      trustedProviders: ["google", "github"], // Add providers you trust
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),


  //jwt configuration
  plugins: [jwt()],
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 7 * 24 * 60 * 60
    }
  }



})
