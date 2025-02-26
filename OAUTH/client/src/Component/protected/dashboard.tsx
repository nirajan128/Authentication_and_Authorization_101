import React from "react";
import { useAuth } from "../../Context/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome, {user?.firstname}!</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default Dashboard;
