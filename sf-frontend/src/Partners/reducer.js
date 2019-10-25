export default function (store) {
  store.on(
    'partners/update',
    (prevState, { partners, byId: partnersById }) => ({
      partners,
      partnersById,
    }),
  );
}
