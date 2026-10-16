
const UsersPage = async () => {
  const response = await fetch("http://localhost:5000/users");
  const userData = await response.json();
  
  return (
    <div>
      <h2>Users are coming soon: {userData.length}</h2>

      {userData.map((user: { id: number; name: string }) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
};

export default UsersPage;
