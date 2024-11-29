export const approveMember = (id) => ({
  type: "APPROVE_MEMBER",
  payload: id,
});

export const removeMember = (id) => ({
  type: "REMOVE_MEMBER",
  payload: id,
});
