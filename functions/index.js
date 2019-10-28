// https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Twilio = require('twilio');
const nanoid = require('nanoid/generate');
const request = require('request');
const qs = require('qs');

const toDate = require('date-fns/toDate');
const { ru: ruLocale } = require('date-fns/locale');
const { format, utcToZonedTime } = require('date-fns-tz');

const util = require('util');

const nanoidAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://myata24com.firebaseio.com',
});

const firestore = app.firestore();

const initialState = {
  balance: 300,
  cashback: 3,
  friends: [],
  notifications: {
    invoice: true,
    new_event_in_favorited_place: true,
    new_place: true,
    new_place_in_my_town: true,
  },
  visits: [],
};

exports.onUserCreate = functions.auth.user().onCreate((user) => {
  const userData = user.toJSON();
  const phoneNumber = userData.phoneNumber.replace(/\+/, '');
  const data = {
    referralId: nanoid(nanoidAlphabet, 10),
    ...initialState,
  };
  const options = {};

  return firestore
    .collection('users')
    .doc(phoneNumber)
    .set(data, options)
    .then(() => console.info(`document ${phoneNumber} created`))
    .catch(err => console.error(`document ${phoneNumber} errored with ${err}`));
});

exports.onPosterWebhook = functions.https.onRequest(async (req, res) => {
  console.log(JSON.stringify(req.body));
  const {
    account, action, object_id: id, object: kind,
  } = req.body;

  if (kind === 'transaction' && action === 'closed') {
    const posterRef = await firestore
      .collection('accounts_poster')
      .doc(account);

    const { token } = posterRef.data();
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1;
    const day = now.getUTCDate();

    const date = `${year}-${month}-${day}`;
    const params = qs.stringify(
      {
        date_from: date,
        date_to: date,
        token,
      },
      { addQueryPrefix: true },
    );

    // request(
    //   `https://joinposter.com/api/transactions.getTransactions${params}`,
    //   async (request, response, body) => {

    //   }
    // );

    return res.sendStatus(200);
  }

  return res.sendStatus(200);
});

exports.onPosterLogin = functions.https.onRequest((req, res) => {
  const { code, account } = req.query;
  console.log(JSON.stringify({ code, account }));

  if (code && account) {
    request.post(
      {
        url: `https://${account}.joinposter.com/api/v2/auth/access_token`,
        formData: {
          code,
          application_id: '658',
          application_secret: '30b438535a4b8fede763a9e48af57477',
          redirect_uri:
            'https://us-central1-myata24com.cloudfunctions.net/onPosterLogin',
          grant_type: 'authorization_code',
        },
      },
      async (err, response, body) => {
        if (err) console.error(err);
        console.log(body);

        const { account_number: id, access_token: token } = JSON.parse(body);

        await firestore
          .collection('accounts_poster')
          .doc(account)
          .set({
            id,
            token,
          });

        return res.redirect(
          `https://${account}.joinposter.com/manage/access/integration`,
        );
      },
    );
  }
});

const {
  sid,
  token,
  phone_number: twilioPhoneNumber,
} = functions.config().twilio;

const client = new Twilio(sid, token);

function validE164(num) {
  return /^\+?[1-9]\d{1,14}$/.test(num);
}

exports.onNewReservation = functions.firestore
  .document('/reservations/{requestId}')
  .onCreate((doc) => {
    const data = doc.data();

    const {
      placeTitle,
      count,
      phoneNumber,
      toPhoneNumber,
      reservationAt,
    } = data;

    if (!validE164(toPhoneNumber)) {
      throw new Error('number must be E164 format!');
    }

    const zonedTime = utcToZonedTime(
      toDate(reservationAt.seconds * 1000),
      'Europe/Moscow',
    );

    const date = format(zonedTime, 'dd MMM HH:mm', {
      locale: ruLocale,
      timeZone: 'Europe/Moscow',
    });

    const textMessage = {
      body: `Бронь ${count} чел ${date} ${phoneNumber} ${placeTitle}`,
      to: toPhoneNumber,
      from: twilioPhoneNumber,
    };

    return client.messages
      .create(textMessage)
      .then(message => console.log(message.sid, 'success'))
      .catch(err => console.log(err));
  });

exports.calculateRating = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Europe/Moscow')
  .onRun(async () => {
    const places = await firestore.collection('places').get();

    return places.forEach((doc) => {
      const data = doc.data();

      if ((data.reviews || []).length > 0) {
        const allRatings = data.reviews.reduce(
          (acc, review) => acc + review.rating,
          0,
        );

        doc.ref.update({
          rating: (allRatings / data.reviews.length).toFixed(2),
        });
      }
    });
  });

// function listAllUsers(req, res) {
//   admin
//     .auth()
//     .listUsers(1000)
//     .then(listUsersResult => {
//       const users = listUsersResult.users.map(user => user.toJSON());

//       return res.send(users);
//     })
//     .catch(error => {
//       console.log('Error listing users:', error);
//     });
// }
// exports.listAllUsers = functions.https.onRequest(listAllUsers);
