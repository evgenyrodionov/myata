import firebase from 'react-native-firebase';
import { parsePhoneNumber } from 'libphonenumber-js';
import orderBy from 'lodash/orderBy';
import keyBy from 'lodash/keyBy';
import parse from 'date-fns/parse';
import { mapUserForPublic } from '../Profile/mappers';
import { getRef as getUserRef } from '../Profile/api';
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

export async function mapDocs(docs) {
  const mappedDocs = [];

  docs.forEach((doc) => {
    mappedDocs.push(map(doc));
  });

  return Promise.all(mappedDocs);
}

export function keyById(docs) {
  return keyBy(docs, 'id');
}

export function mapOutputReviews(reviews) {
  return reviews.map(review => ({
    id: review.id,
    createdAt: parse(review.createdAt),
    rating: review.rating,
    text: review.text,
    userRef: getUserRef(review.user.id),
  }));
}

export function mapOutput(data) {
  return {
    ...data,
    reviews: mapOutputReviews(data.reviews),
    phoneNumber: parsePhoneNumber(data.phoneNumber, 'RU').number,
    waPhoneNumber: parsePhoneNumber(data.waPhoneNumber, 'RU').number,
  };
}

export function saveReviews(id, reviews) {
  return getRef(id).update({
    reviews: mapOutputReviews(reviews),
  });
}
