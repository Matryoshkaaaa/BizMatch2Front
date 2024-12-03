export const approveMember = (email) => ({
  type: "APPROVE_MEMBER",
  payload: email,
});

export const removeMember = (email) => ({
  type: "REMOVE_MEMBER",
  payload: email,
});
