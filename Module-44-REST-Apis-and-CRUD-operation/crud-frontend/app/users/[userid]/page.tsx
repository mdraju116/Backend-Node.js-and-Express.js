

const UserDetailsPage = async ({params}:{params:Promise<{userid:string}>}) => {

    const {userid}=await params;
    
    const response = await fetch(`http://localhost:5000/users/${userid}`);
    const user = await response.json();


    return (
        <div>
            <h2>Id:{userid}</h2>
            <p>Name:{user.name}</p>
            <p>Email:{user.email}</p>
        </div>
    );
};

export default UserDetailsPage;