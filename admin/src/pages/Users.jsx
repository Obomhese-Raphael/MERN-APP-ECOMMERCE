// components/admin/Users.js
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import Loader from "./Loader";

const Users = ({token}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/users/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Error fetching users");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [token, backendUrl]);

  if (loading) {
    return <div className="text-center py-8">
      <Loader />
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">
                  {user.name}
                </td>
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center capitalize">
                  {user.isAdmin ? "Admin" : "User"}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;