import UserCard from "@/components/UserCard"

export interface UserType {
  _id: string
  name: string
  email: string
}

const UsersDataPage = async () => {
  const response = await fetch("http://localhost:5000/users")
  const users: UserType[] = await response.json()

  return (
    <div>
      <h2>No of Users : {users.length}</h2>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user._id} user={user}></UserCard>
        ))}
      </div>
    </div>
  )
}

export default UsersDataPage
