import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p className="text-center mt-10">Please login</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      <div className="border rounded-xl p-5">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <p className="text-lg font-semibold">Name: {user.displayName}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
