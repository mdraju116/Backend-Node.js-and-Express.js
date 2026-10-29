/* 

✅✅✅Make the token-accessing functions Reusable 

✅✅1.For Server Component
-create a file inside the lib/access-jwt-at-server-component.ts
-cut the accessing function from (add-destination/page.tsx)
-paste here and modify like this

        import { headers } from "next/headers";
        import { auth } from "./auth";

        //accessing jwt token for server-component
        export const getServerToken =async()=>{
            const jwtToken= await auth.api.getToken({
                headers : await headers(),
            })
            //   console.log(jwtToken?.token);
            return jwtToken;
        }

-now call the function at (add-destination/page.tsx) like this :

        //accessing jwt token for server-component 
        const jwtToken= await getServerToken() ; // @/lib/access-jwt-at-server-component"
        
-no need to change the sending process



✅✅2.For Client Component (who use "use client")

-create a file inside the lib/access-jwt-at-client-component.ts
-cut the accessing function from (add-destination/page.tsx)
-paste here and modify like this

        import toast from "react-hot-toast";
        import { authClient } from "./auth-client";


        //accessing jwt token for client component  
        export const getClientToken = async () => {
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                toast.error("Error accessing JWT token")
                return
            }
            const jwtToken = data.token;
            return jwtToken;
        }

-now call the function at (add-destination/page.tsx) like this :

        //accessing jwt token for client component 
        const jwtToken = await getClientToken(); // (@/lib/access-jwt-at-client-component")

-no need to change the sending process


-Now you can just call the function whereas you need.

⚠️NB: If you send the token from frontend (by accessing token & using headers), 
   then must be received at backend (by calling verifyToken) at the corresponding API



*/