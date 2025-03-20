"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Delete user function
  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      console.log("Deleting user with ID:", userId);

      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      const result = await res.json();
      console.log("Delete response:", result);

      if (!res.ok) throw new Error(result.error || "Failed to delete user");

      // Remove user from state after deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Sign Out Button */}
      <button
        onClick={() => signOut()}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign Out
      </button>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
