/* 
-go to :  https://better-auth.com/docs/plugins/jwt#installation

✅1.Add the plugin to your auth config (auth.ts)
-copy this and paste to auth.ts: (see full code under step-2)

    import { jwt } from "better-auth/plugins"
    export const auth = betterAuth({
        plugins: [
            jwt(), 
        ]
    })

✅2.Add session (auth.ts)
-type manually under the jwt-plugins: 

session: {
  cookieCache:{
    enabled:true,
    strategy:'jwt',
    maxAge: 7*24*60*60
  }


➡️this will be like this :
    export const auth = betterAuth({
        .
        .
        .
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


✅3.Add the client plugin to your auth client (auth-client.ts)
-again copy this and paste to auth-client.ts

    import { jwtClient } from "better-auth/client/plugins"
    export const authClient = createAuthClient({
    plugins: [
        jwtClient() 
    ]
    })   

➡️This will be like this :
    export const authClient = createAuthClient({
        baseURL: process.env.BETTER_AUTH_URL,
        plugins:[jwtClient()]
    })












*/