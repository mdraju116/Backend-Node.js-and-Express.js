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