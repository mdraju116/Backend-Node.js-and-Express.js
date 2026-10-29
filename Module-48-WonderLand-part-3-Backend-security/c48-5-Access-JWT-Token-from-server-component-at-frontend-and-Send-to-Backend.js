/* 
Access JWT Token at frontend and Send to Backend

⚠️NB: The jwt token will be generated each time after a successful user Login
and will be validate for 1/3/7.. days as the maxAge.


✅✅Step-0. Just Check the token at Cookies (browser)

✅Find the token :
-Login into the side, 
-inspect
-go to Application-storage-cookies
-You can see 2 data : 
    better-auth.session_data
    better-auth.session_token

-click on better-auth.session_data, you can see this token: 
(there is 3 dot inside it means that, it has 3 part :header, Payload/data, secretKey)

eyJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uIjp7ImV4cGlyZXN
BdCI6IjIwMjYtMTEtMDRUMTY6MDY6MDcuODEwWiIsInRva2VuIjoiMk5QR
WNyUUxQd1ZoV3NJSmN1RktDY1AzbWk1dndja0IiLCJjcmVhdGVkQXQiOiIyMDI2LTEwLTI4VDE2Oj
A2OjA3LjgxM1oiLCJ1cGRhdGVkQXQiOiIyMDI2LTEwLTI4VDE2OjA2OjA3LjgxM1oiLCJpcEFkZHJlc3
MiOiIwMDAwOjAwMDA6MDAwMDowMDAwOjAwMDA6MDAwMDowMDAwOjAwMDAiLCJ1c2VyQWdlbnQiOiJNb3ppbG
xhLzUuMCAoTGludXg7IEFuZHJvaWQgMTY7IFBpeGVsIDEwKSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBs
aWtlIEdlY2tvKSBDaHJvbWUvMTU2LjAuMC4wIE1vYmlsZSBTYWZhcmkvNTM3LjM2IiwidXNlcklkIjoiNmFkZjk1Z
TgwZmZiNmE2NTExYjAxZjIwIiwiaWQiOiI2YWUyMWQ2ZjA3YzZmYTExMGYyMDc4MjYifSwidXNlciI6eyJuYW1lIjoiU
mFqdSBBaGFtbWVkIiwiZW1haWwiOiJtZHJhai45NzAwQGdtYWlsLmNvbSIsImVtYWlsVmVyaWZpZWQiOmZhbHNlLCJjcmV
hdGVkQXQiOiIyMDI2LTEwLTI2VDE4OjAzOjIwLjU3N1oiLCJ1cGRhdGVkQXQiOiIyMDI2LTEwLTI2VDE4OjAzOjIwLjU3N1
oiLCJpZCI6IjZhZGY5NWU4MGZmYjZhNjUxMWIwMWYyMCJ9LCJ1cGRhdGVkQXQiOjE3OTMyMDM1NjgxNDUsInZlcnNpb24iO
iIxIiwiaWF0IjoxNzkzMjAzNTY4LCJleHAiOjE3OTM4MDgzNjh9.Wap2F1m5V_3DCij0kCDXtoi1YaSecSDAoY_dTxKS7jU


✅Decode the token :
-copy the full token 
-go to https://www.jwt.io/
-paste the token

-it will be decoded automatically and 
-you can see all the info




✅✅Step-1 : Access the JWT token at frontend (my-bookings/page.tsx)

 //accessing jwt token at server-component
  const jwtToken= await auth.api.getToken({
    headers : await headers(),
  })
  console.log(jwtToken?.token);


  // send the jwt token to server
  const res = await fetch(
      `http://localhost:5000/my-bookings/${user.email}`,{
            
        headers:{
              authorization : `Bearer ${jwtToken?.token}`
            }
          }
    )


✅✅Step-2 : Verify the token at Backend (index.js)

 c48-6 : Verify-JWT-on-Backend


*/