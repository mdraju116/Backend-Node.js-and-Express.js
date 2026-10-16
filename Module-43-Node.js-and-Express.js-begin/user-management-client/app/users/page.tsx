import { Suspense } from "react";
import Users from "../components/Users";

const userPromise =async()=> {
      const response = await fetch("http://localhost:5000/users");
      return response.json();
}


const UsersPage = async () => {

  return (
    <div>
        {/* Use suspense to remove fetching issue */}
        <Suspense fallback={<h2>loading users...</h2>}>
            <Users userPromise={userPromise()}></Users>
        </Suspense>

    </div>
  );
};

export default UsersPage;
