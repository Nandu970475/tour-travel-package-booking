import { useEffect, useState } from "react";
import axios from "axios";

function RegisteredUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("${import.meta.env.VITE_API_URL}/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Users</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RegisteredUsers;