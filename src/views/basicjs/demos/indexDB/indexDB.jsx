import React from 'react'

import { getObjectStore, STORE_NAME, MODE } from './utils'
import { useState } from 'react';
import { useEffect } from 'react';

export default () => {
  const [dataList, setDataList] = useState([]);
  const addFile = (e) => {
    const [file] = e.target.files;
    saveFileToDB(file, file.name).onsuccess = () => responseAndReset()
  }


  const batchReSet = (fileList) => {
    let blobList = fileList.map(file => {
      return {
        // ...file,
        src: URL.createObjectURL(file),
        id: file.id,
        name: file.name,
        checked: false
      }
    });
    setDataList([...blobList])
  }

  const saveFileToDB = (file) => {
    const personStore = getObjectStore(STORE_NAME, MODE.READ_WRITE);
    return personStore.add(file);
  }

  const getFetch = () => {
    const personStore = getObjectStore(STORE_NAME, MODE.READ);
    const req = personStore.getAll();
    return req;
  }


  const responseAndReset = () => {
    const req = getFetch();
    req.onsuccess = function () {
      batchReSet(req.result)
    };
  }

  const delItems = () => {
    let checkedList = dataList.filter(item => item.checked);
    let delTasks = checkedList.map(item => personStore.delete(item.id));

    const personStore = getObjectStore(STORE_NAME, MODE.READ_WRITE);

    Promise.all(delTasks).then(r => responseAndReset())

  }
  const checkedChanged = (item) => {
    item.checked = !item.checked;
    setDataList([...dataList])
    console.log(dataList)
  }


  useEffect(() => {
    setTimeout(responseAndReset, 100);
  }, [])


  return (
    <div>
      <h2>
        <input type="file" onChange={addFile} />
        <button onClick={delItems}>删 除</button>

      </h2>
      <div id="show"  >
        <ul>
          {
            !dataList.length ? '' :
              dataList.map((item, index) => {
                return <li key={index}>
                  <label>
                    <img src={item.src} alt='' height='100'></img>
                    <span>{item.name}</span>
                    <input type="checkbox" checked={item.checked} onChange={() => checkedChanged(item)} />
                  </label>
                </li>
              })
          }
        </ul>
      </div>
    </div>
  )
}


