import { parsePhoneNumber } from 'libphonenumber-js';
import orderBy from 'lodash/orderBy';
import parse from 'date-fns/parse';
import firebase from '../firebase';

export function getCollectionRef() {
  return firebase.getCollection('places');
}

export function getRef(id) {
  return getCollectionRef().doc(id);
}

export function mapUserForPublic(doc) {
  const data = doc.data();
  const { displayName, photoId } = data;

  return {
    id: doc.id,
    displayName,
    photoId,
  };
}

export function mapPlaces(docs) {
  const mappedDocs = [];

  docs.forEach(async (doc) => {
    const data = doc.data();
    const reviews = await Promise.all(
      (data.reviews || []).map(async ({ userRef, ...review }) => ({
        ...review,
        createdAt: review.createdAt.seconds * 1000,
        // user: mapUserForPublic(await userRef.get()),
      })),
    );

    mappedDocs.push({
      id: doc.id,
      ...data,
      reviews: orderBy(reviews, ['createdAt'], ['desc']),
    });
  });

  return mappedDocs;
}

export function mapOutputReviews(reviews) {
  return reviews.map(({ createdAt, user, ...review }) => ({
    ...review,
    createdAt: parse(createdAt),
    // userRef: getUserRef(user.id),
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
