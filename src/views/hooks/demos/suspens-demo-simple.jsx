import React, { lazy, Suspense } from 'react'
//suspense 和lazy 共为一体
// import {useFetch} from 'react-hooks-fetch'
const LazyComp = lazy(() => import('../components/lazy'));

let promise = null;
let data;

const getData = id => {
    if (promise) throw promise;
    if (data) return data;
    promise = new Promise(resolve => {
        setTimeout(() => {
            data = `data is ${id}`;
            resolve();
            promise = null;
            setTimeout(()=>{
                data = null;
            })
        }, id * 1000)
    })
    throw promise;
}

const Comp = ({ idn }) => {
    console.log(idn)
    const data = getData(idn);

    return <p>Comp data: {data}</p>
}

export default () => (
    <Suspense fallback={'loading ...'} maxDuration={11}>
        <Comp idn={1} />
        <p>suspense 内部普通组件</p>
        <LazyComp />
        <Suspense fallback={'loading ...222'} maxDuration={22}>
            <Comp idn={2} />
            <p>suspense2 内部普通组件</p>
            {/* <LazyComp /> */}

        </Suspense>
    </Suspense>
);