import React from 'react';
import ActionButtons from './ActionButtons';

const UserTable = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>상태</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.status}</td>
            <td>
              <ActionButtons user={user} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
