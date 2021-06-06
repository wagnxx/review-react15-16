const DB_NAME = 'fe_2';
const STORE_NAME = 'person';
const DB_VERSION = 3;

function CreateDB(dbName, dbVersion, opts) {
  this.init(dbName, dbVersion);
  this.__opts__ = opts;
  let DBOpenRequest = this.openDB();
  this.eventListener(DBOpenRequest);
}
CreateDB.prototype.init = function (dbName, dbVersion) {
  this.name = dbName;
  this.version = dbVersion;
};
CreateDB.prototype.openDB = function () {
  return window.indexedDB.open(this.name, this.version);
};
CreateDB.prototype.createDefaultStore = function () {
  if (!db.objectStoreNames.contains(STORE_NAME)) {
    this.db.createObjectStore(STORE_NAME, {
      keyPath: 'id',
      autoIncrement: true,
    });
    // personStore.createIndex('name', 'name', { unique: false });
    // personStore.createIndex('email', 'email', { unique: true });
  }
};
CreateDB.prototype.eventListener = function (DBOpenRequest) {
  DBOpenRequest.onerror = function (event) {
    console.log('db open err', event.target.errorCode);
  };
  DBOpenRequest.onsuccess = function (event) {
    this.db = event.target.result;
  };

  DBOpenRequest.onupgradeneeded = function (event) {
    this.db = event.target.result;
    if (
      this.__opts__.callback &&
      typeof this.__opts__.callback === 'function'
    ) {
      this.__opts__.callback(this.db);
    } else {
      this.createDefaultStore();
    }
  };
};
CreateDB.prototype.createStore = function (storeName) {
  if (!db.objectStoreNames.contains(storeName)) {
    return this.db.createObjectStore(storeName, {
      keyPath: 'id',
      autoIncrement: true,
    });
  }
};
CreateDB.prototype.getStore = function (storeName, mode) {
  var tx = this.db.transaction([storeName], mode);
  return tx.objectStore(storeName);
};

let dbInstFunctory = function (n = DB_NAME, v = DB_VERSION, o = {}) {
  let db;
  return function create() {
    if (db) return db;
    return (db = new CreateDB(n, v, o));
  };
};

let db = dbInstFunctory()();

function getObjectStore(store_name = STORE_NAME, mode = MODE.READ) {
  return db.getStore(store_name, mode);
}

const MODE = {
  READ_WRITE: 'readwrite',
  READ: 'readonly',
};

export { getObjectStore, STORE_NAME, MODE, db };
