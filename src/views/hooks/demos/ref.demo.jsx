import React, { createRef, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'

// forwardRef和useImperativeHandle是一对
const ContextComp = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({

        method() {
            console.log('ref方法执行了');
        }

    }));


    return <p>子组件</p>
});


export default () => {

    const ref = useRef();

    useEffect(() => {
        //执行三个生命周期，DidMount,DidUpdate,WillUnmount
        console.log('component update');
        ref.current.method();
        return () => {
            console.log('unbind');
        }
    }, []);

    return <>
        <ContextComp ref={ref} />
    </>
};