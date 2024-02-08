// AdminPage.js

import React from 'react';

const AdminPage = () => {
  // Sample user data
  const users = [
    { id: 1, username: 'admin1', email: 'admin1@example.com' },
    { id: 2, username: 'admin2', email: 'admin2@example.com' },
    // ... other users
  ];

  // Sample statistics
  const totalUsers = users.length;

  return (
    <div className="AdminPage">
      <h1>Admin Page</h1>

      <section>
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Statistics</h2>
        <p>Total Users: {totalUsers}</p>
        {/* Add more statistics as needed */}
      </section>
    </div>
  );
};

export default AdminPage;
