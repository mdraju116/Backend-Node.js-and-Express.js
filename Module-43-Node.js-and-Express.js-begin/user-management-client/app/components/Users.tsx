import { use } from "react";


interface UserProps{
     id: number; 
     name: string; 
     email: string 
}



const Users = ({ userPromise }: {userPromise: Promise<UserProps[]>}) => {
  const userData = use(userPromise);

  return (
    <div>
      <h2>Users are coming soon: {userData.length}</h2>

      {userData.map((user) => (
        <p key={user.id}> {user.name} :{user.email} </p>
      ))}

    </div>
  );
};

export default Users;
