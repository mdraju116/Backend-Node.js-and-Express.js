import toast from "react-hot-toast"
import { authClient } from "./auth-client"

//accessing jwt token for client component  (who use "use client")
export const getClientToken = async () => {
  const { data, error } = await authClient.token()
  if (error || !data?.token) {
    toast.error("Error accessing JWT token")
    return
  }
  const jwtToken = data.token
  return jwtToken
}
