import React from 'react';
import { createContext, useEffect, useContext, useCallback } from 'react';
import { getObjectStore, STORE_NAME, MODE, db } from '../utils/db';

const DBContext = createContext();

export { db };

export function useDBContext() {
  return useContext(DBContext);
}

const getFilesStore = (mode) => {
  const filesStore = getObjectStore(STORE_NAME, mode);
  return filesStore;
};

export const getFilesStoreReadOnly = () => getFilesStore(MODE.READ);
export const getFilesStoreReadWrite = () => getFilesStore(MODE.READ_WRITE);

export default function DBContextProvider({ children }) {
  // const [filesStoreReadOnly, setFilesStoreReadOnly] = useState(null)
  // const [filesStoreReadWrite, setFilesStoreReadWrite] = useState(null)

  useEffect(() => {
    if (db) {
      setTimeout(() => {
        // setFilesStoreReadOnly(getFetch(MODE.READ))
        // setFilesStoreReadWrite(getFetch(MODE.READ_WRITE))
      }, 1000);
    }
  }, []);

  return (
    <DBContext.Provider
      value={{ getFilesStoreReadOnly, getFilesStoreReadWrite, db }}
    >
      {children}
    </DBContext.Provider>
  );
}
