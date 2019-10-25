import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default class FirebaseClass {
  constructor(config) {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  getRef = (collection, doc) => this.db.collection(collection).doc(doc);

  getCollection = collection => this.db.collection(collection);

  getCollectionOnSnapshot = (collection, cb) =>
    this.db.collection(collection).onSnapshot(cb);

  getDocOnSnapshot = (collection, docId, cb) =>
    this.db
      .collection(collection)
      .doc(docId)
      .onSnapshot(cb);

  getById = (collection, id) =>
    this.db
      .collection(collection)
      .doc(id)
      .get();

  add = (collection, data) => this.db.collection(collection).add(data);

  setWithKey = (collection, key, data) =>
    this.db
      .collection(collection)
      .doc(key)
      .set(data);

  // FIXME
  // addOrUpdate = (collection, data) => {
  //   const col = this.db.collection(collection);

  //   return col
  //     .where('id', '==', data.id)
  //     .where('offerKind', '==', data.offerKind)
  //     .get()
  //     .then(res => res.docs)
  //     .then(docs => {
  //       if (docs.length > 0) {
  //         const { id } = docs[0];

  //         return this.update(collection, id, data);
  //       }

  //       return this.add(collection, data);
  //     });
  // };

  // FIXME
  // add = (collection, { user, ...data }) =>
  //   this.db.collection(collection).add({
  //     ...data,
  //     updatedBy: user.email,
  //     updatedAt: new Date(),
  //   });

  delete = (collection, id) =>
    this.db
      .collection(collection)
      .doc(id)
      .delete();

  update = (collection, id, data) =>
    this.db
      .collection(collection)
      .doc(id)
      .update(data);
}
