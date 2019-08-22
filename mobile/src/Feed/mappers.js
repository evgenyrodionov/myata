// eslint-disable-next-line import/prefer-default-export
export function mapNews(docs) {
  const mappedDocs = [];

  docs.forEach(doc =>
    mappedDocs.push({
      id: doc.id,
      ...doc.data(),
      eventAt: doc.data().eventAt.seconds * 1000,
    }));

  return mappedDocs;
}
