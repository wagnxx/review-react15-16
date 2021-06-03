const DB_NAME = 'fe_2';
const STORE_NAME = 'person';
const DB_VERSION = 3;

let db;
let DBOpenRequest = window.indexedDB.open(DB_NAME, DB_VERSION);
DBOpenRequest.onerror = function (event) {
  console.log('db open err', event.target.errorCode);
};
DBOpenRequest.onsuccess = function (event) {
  db = event.target.result;
};

DBOpenRequest.onupgradeneeded = function (event) {
  db = event.target.result;
  let personStore;
  if (!db.objectStoreNames.contains(STORE_NAME)) {
    personStore = db.createObjectStore(STORE_NAME, {
      keyPath: 'id',
      autoIncrement: true,
    });
    // personStore.createIndex('name', 'name', { unique: false });
    // personStore.createIndex('email', 'email', { unique: true });
  }
};

function getObjectStore(store_name, mode) {
  var tx = db.transaction([store_name], mode);
  return tx.objectStore(store_name);
}

const MODE = {
  READ_WRITE:'readwrite',
  READ:'readonly'
}

export { getObjectStore,STORE_NAME, MODE };
