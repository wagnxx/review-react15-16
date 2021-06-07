import React, { lazy, Suspense, useState } from 'react'

import { getFilesStoreReadOnly, getFilesStoreReadWrite, db } from '../../../../contexts/DBContextProvider';


let data = null;
let promise = null;

const fetchData = (id) => {
  if (promise) throw promise;
  if (data || data === undefined) {
    let t = data;
    data = null;
    return t;
  };

  promise = new Promise((resolve, reject) => {


    let stores = getFilesStoreReadWrite();

    if (stores) {
      deal(stores)
    } else {
      setTimeout(() => {
        stores = getFilesStoreReadWrite();
        deal(stores)

      }, 1000)

    }

    function deal(stores) {
      try {

        const req = stores.get(id)
        req.onsuccess = function (e) {
          console.log(e.target.result)
          data = e.target.result;
          resolve()
          promise = null;
        }
      } catch (err) {
        data = undefined;
        promise = null
        console.log('deal catch error', err)
        reject()
      }
    }


  });

  throw promise;
}




const Comp = ({ id, onScan }) => {
  const data = fetchData(id);

  if (data === undefined) return <span>{id}资源不存在</span>



  let chunks = data.chunks;
  chunks = chunks.sort((a, b) => a.id - b.id);
  chunks = chunks.map(item => item.blob);
  let blobs = new Blob(chunks);
  let url = window.URL.createObjectURL(blobs);
  // setImmediate(() => window.URL.revokeObjectURL(url))


  return <img src={url} alt={id} style={{ width: '100%' }} onClick={() => onScan(url)} />
}

export default ({ id, onScan }) => {

  return (
    <Suspense fallback={'loading ...' + id} >
      <Comp id={id} onScan={onScan} />

    </Suspense>
  );

}