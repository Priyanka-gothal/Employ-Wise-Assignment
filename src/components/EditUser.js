import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUser.css'; // Import the CSS file

const EditUser = () => {
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      console.log('Fetched User:', response.data.data); // Log fetched user data
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log('Updating User:', user); // Log user data before updating
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      console.log('User updated successfully'); // Log success message
      navigate('/users');
    } catch (error) {
      console.error("Error updating user", error);
    }
  };
  
  const handleDelete = async () => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      console.log('User deleted successfully'); // Log success message
      navigate('/users');
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };
  

  return (
    <div className="edit-user-container"> {/* Added CSS class */}
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
          required
        />
        <button type="submit">Update</button>
      </form>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default EditUser;
