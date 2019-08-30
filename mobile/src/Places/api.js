import firebase from 'react-native-firebase';
import { parsePhoneNumber } from 'libphonenumber-js';
import orderBy from 'lodash/orderBy';
import { mapUserForPublic } from '../Profile/mappers';
import { salesByPlaceId } from '../data';

const firestore = firebase.firestore();

export function getCollectionRef() {
  return firestore.collection('places');
}

export function getRef(id) {
  return getCollectionRef().doc(id);
}

export async function map(doc) {
  const data = doc.data();

  const reviews = await Promise.all(
    (data.reviews || []).map(async ({ userRef, ...review }) => ({
      ...review,
      createdAt: review.createdAt.seconds * 1000,
      user: mapUserForPublic(await userRef.get()),
    })),
  );

  return {
    id: doc.id,
    ...data,
    sales: salesByPlaceId[doc.id] || [],
    reviews: orderBy(reviews, ['createdAt'], ['desc']),
  };
}

export function mapDocs(docs) {
  const mappedDocs = [];

  docs.forEach(async (doc) => {
    mappedDocs.push(await map(doc));
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
