import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserList.css'; // Import the CSS file

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchUsers();
    }
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      // After deleting, refetch users to update the list
      fetchUsers();
      alert('User deleted successfully'); // Success message
    } catch (error) {
      console.error("Error deleting user", error);
      alert('Failed to delete user'); // Error message
    }
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th> {/* New Actions Column */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><img src={user.avatar} alt={user.first_name} /></td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <button onClick={() => navigate(`/edit-user/${user.id}`)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={page === 1} onClick={prevPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}

export default UserList;
