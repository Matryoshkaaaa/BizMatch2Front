import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/users/userThunks';
import UserTable from '../components/UserTable';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>회원 관리</h1>
      <UserTable users={list} />
    </div>
  );
};

export default UserManagement;
