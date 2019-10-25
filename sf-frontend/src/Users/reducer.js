export default function (store) {
  store.on('users/update', (prevState, { users, byId: usersById }) => ({
    users,
    usersById,
  }));
}
