import React, { lazy, Suspense } from 'react'
//suspense 和lazy 共为一体
// import {useFetch} from 'react-hooks-fetch'
const LazyComp = lazy(() => import('../components/lazy'));

function fetchApi() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('fettch data:sucess');
        }, 3000);
    })
}

const cached = {};
const createFetcher = promiseTask => {
    let ref = cached;

    return () => {
        const task = promiseTask();
        task.then(res => {
            ref = res;
        });
        console.log("cahched,ref", cached, ref);
        if (ref === cached) {
            throw task
        }

        return ref;
    }
}


function requestData() {
    return createFetcher(fetchApi)
}


function SuspenseComp() {
    // const {error,data}=useFetch('a.php')
    // if(error) return null;
    // if(data==null) return null;
    const data = requestData();
    return <p>{data}</p>
}


export default () => (
    <Suspense fallback={'loading'}>
        <SuspenseComp />
        <LazyComp />
    </Suspense>
);