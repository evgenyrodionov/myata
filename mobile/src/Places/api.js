import firebase from 'react-native-firebase';
import { parsePhoneNumber } from 'libphonenumber-js';
import orderBy from 'lodash/orderBy';
import keyBy from 'lodash/keyBy';
import parse from 'date-fns/parse';

import geodist from 'geodist';
import * as Location from 'expo-location';
import { Permissions } from 'react-native-unimodules';

import { mapUserForPublic } from '../Profile/mappers';
import { getRef as getUserRef } from '../Profile/api';
import { salesByPlaceId, productsByPlacesId } from '../data';

const firestore = firebase.firestore();

export function getCollectionRef() {
  return firestore.collection('places');
}

export function getRef(id) {
  return getCollectionRef().doc(id);
}

async function getDistance(place) {
  if (place.address.lat && place.address.lon) {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      try {
        const { coords } = await Location.getCurrentPositionAsync({});

        const distance = geodist(
          {
            lat: coords.latitude,
            lon: coords.longitude,
          },
          {
            lat: place.address.lat,
            lon: place.address.lon,
          },
          { unit: 'km', exact: true },
        );

        return parseFloat(parseFloat(distance).toFixed(2));
      } catch (e) {
        //
      }
    }

    return undefined;
  }

  return undefined;
}

export async function map(doc) {
  const data = doc.data();

  const reviews = await Promise.all(
    (data.reviews || []).map(async ({ userRef, ...review }) => ({
      ...review,
      createdAt: review.createdAt.seconds * 1000,
      user: userRef && mapUserForPublic(await userRef.get()),
    })),
  );

  return {
    id: doc.id,
    ...data,
    address: {
      ...data.address,
      // distance: await getDistance(data),
    },
    sales: salesByPlaceId[doc.id] ? salesByPlaceId[doc.id] : [],
    products: productsByPlacesId[doc.id] ? productsByPlacesId[doc.id] : [],
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
  return reviews.map(({ createdAt, user, ...review }) => ({
    ...review,
    createdAt: parse(createdAt),
    userRef: getUserRef(user.id),
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
