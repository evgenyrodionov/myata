import { parsePhoneNumberFromString } from 'libphonenumber-js';

import parse from 'date-fns/parse';

export const mapPermissionsToBoolean = {
  granted: true,
  denined: false,
  undetermined: false,
};

export function mapPhoneNumberToId(phoneNumber) {
  return phoneNumber.replace(/\+/, '');
}

export function mapUserBasic(doc) {
  const data = doc.data();
  const phoneNumber = doc.id;

  const formattedPhoneNumber = parsePhoneNumberFromString(
    String(`+${phoneNumber}`),
  ).formatInternational();

  return {
    ...data,
    id: doc.id,
    formattedPhoneNumber,
  };
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

export async function mapUser(doc, ref) {
  const data = mapUserBasic(doc);

  const visits = await Promise.all(
    (data.visits || []).map(async ({ placeRef, ...visit }) => {
      const place = await placeRef.get();

      return {
        ...visit,
        createdAt: parse(visit.createdAt.seconds * 1000),
        place: {
          id: place.id,
          ...place.data(),
        },
      };
    }),
  );

  const superBalance = await Promise.all(
    (data.superBalance || []).map(async ({ placeRef, ...balance }) => {
      const place = await placeRef.get();

      return {
        ...balance,
        place: {
          id: place.id,
          ...place.data(),
        },
      };
    }),
  );

  const friends = await Promise.all(
    (data.friends || []).map(async (friendRef) => {
      const friend = await friendRef.get();

      return {
        id: friend.id,
        ...friend.data(),
      };
    }),
  );

  return {
    ...data,
    ref,
    visits,
    friends,
    superBalance,
  };
}
