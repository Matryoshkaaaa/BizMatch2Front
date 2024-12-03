import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { approveUser, rejectUser, penalizeUser, deleteUser } from '../features/users/userThunks';

const ActionButtons = ({ user }) => {
  const dispatch = useDispatch();
  const reasonRef = useRef();

  const handleApprove = () => dispatch(approveUser(user.id));
  const handleReject = () => {
    const reason = reasonRef.current.value;
    if (reason) dispatch(rejectUser({ userId: user.id, reason }));
  };
  const handlePenalize = () => dispatch(penalizeUser(user.id));
  const handleDelete = () => dispatch(deleteUser(user.id));

  return (
    <div>
      <button onClick={handleApprove}>승낙</button>
      <input ref={reasonRef} placeholder="거절 사유 입력" />
      <button onClick={handleReject}>거절</button>
      <button onClick={handlePenalize}>패널티 부과</button>
      <button onClick={handleDelete}>탈퇴</button>
    </div>
  );
};

export default ActionButtons;
