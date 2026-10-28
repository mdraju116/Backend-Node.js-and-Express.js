/* 

=>see step-1 : c48-5

✅✅Step-2 : Verify the token at Backend (index.js)

-go to : https://better-auth.com/docs/plugins/jwt#installation

=>go to : Verifying the token
-copy this : Example using jose with remote JWKS

        import { jwtVerify, createRemoteJWKSet } from 'jose'

        async function validateToken(token: string) {
        try {
            const JWKS = createRemoteJWKSet(
            new URL('http://localhost:3000/api/auth/jwks')
            )
            const { payload } = await jwtVerify(token, JWKS, {
            issuer: 'http://localhost:3000', // Should match your JWT issuer, which is the BASE_URL
            audience: 'http://localhost:3000', // Should match your JWT audience, which is the BASE_URL by default
            })
            return payload
        } catch (error) {
            console.error('Token validation failed:', error)
            throw error
        }
        }

        // Usage example
        const token = 'your.jwt.token' // this is the token you get from the /api/auth/token endpoint
        const payload = await validateToken(token)

-paste to index.js 

-install jose
-go to : https://www.npmjs.com/package/jose
-copy and install this : npm i jose


➡️customize the function like this : 

        //verify jwt token - c48-6
        const verifyToken= async(req,res,next)=> {
            try {
                const authHeader = req.headers.authorization;
                const token = authHeader.split(" ")[1];

                console.log(token);
                const JWKS = createRemoteJWKSet(
                    new URL('http://localhost:3000/api/auth/jwks')
                )
                const { payload } = await jwtVerify(token, JWKS);
                next();
                return payload
            } catch (error) {
                console.error('Token validation failed:', error)
                throw error
            }
        
        }

-use the function name as middleware at the api  
        
        //see my-bookings: http://localhost:5000/my-bookings/{email}
        app.get("/my-bookings/:email",verifyToken,async(req,res)=>{
            const userEmail= req.params.email;
            const result = await bookingCollections.find({email:userEmail}).toArray();
            res.send(result);
        })


-Now if you can see the jwt token at server console for this :(console.log(token);)
-then it is okay
-Well done



*/