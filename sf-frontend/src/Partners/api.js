export async function mapDoc(doc) {
  const { ...data } = doc.data();

  return {
    id: doc.id,
    ...data,
  };
}

export async function mapDocs(docs) {
  const mapped = [];

  docs.forEach(doc => mapped.push(mapDoc(doc)));

  return Promise.all(mapped);
}
