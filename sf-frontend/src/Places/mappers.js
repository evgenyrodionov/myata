import { parsePhoneNumber } from 'libphonenumber-js';

export function mapPlaces(docs) {
  const mappedDocs = [];

  docs.forEach((doc) => {
    const data = doc.data();

    mappedDocs.push({
      id: doc.id,
      ...data,
    });
  });

  return mappedDocs;
}

export function mapOutput(data) {
  return {
    ...data,
    phoneNumber: parsePhoneNumber(data.phoneNumber, 'RU').number,
    waPhoneNumber: parsePhoneNumber(data.waPhoneNumber, 'RU').number,
  };
}
