import React, { useEffect, useState } from "react";
import { getUsers } from "services/user";

export default function UserDashboard() {
  const [userList, setUserList] = useState([]);

  const fetchUserList = async () => {
    const response = await getUsers();
    setUserList(response);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div>
      <div>UserDashboard</div>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
          {userList.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
