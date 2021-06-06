import React,{useCallback} from 'react'

import { getObjectStore, STORE_NAME, MODE } from './utils'
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import { Card } from 'antd';

const { Meta } = Card;

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

  const getFetch = useCallback(()=>{
    const personStore = getObjectStore(STORE_NAME, MODE.READ);
    const req = personStore.getAll();
    return req;
  },[])

  const responseAndReset =useCallback(() => {
    const req = getFetch();
    req.onsuccess = function () {
      batchReSet(req.result) 
    };
  },[getFetch]);

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
    setTimeout(responseAndReset, 1000);
  }, [responseAndReset])


  return (
    <div>
      <h2 style={{ margin: '10px 0' }}>
        <Row>
          <Col span={8}><input type="file" onChange={addFile} /></Col>
          <Col span={8} offset={8}>
            <Button type='danger' onClick={delItems}>删 除</Button>
          </Col>
        </Row>



      </h2>
      <div id="show"  >
        <ul>

          {
            !dataList.length ? '' :
              dataList.map((item, index) => {
                return <li key={index}><Card
                  hoverable
                  style={{ width: '100%',height:'100%' }}
                  cover={<img alt="example" src={item.src} />}
                >
                  <Meta title={item.name} description={'id :' + item.id} />
                  <input type="checkbox" checked={item.checked} onChange={() => checkedChanged(item)} />
                </Card>
                </li>


              })
          }

        </ul>
      </div>
    </div>
  )
}


