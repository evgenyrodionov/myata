import { mapUser } from './mappers';

export async function mapDocs(docs) {
  const mapped = [];

  docs.forEach(doc => mapped.push(mapUser(doc)));

  return Promise.all(mapped);
}
