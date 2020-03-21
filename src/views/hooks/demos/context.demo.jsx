import React, { createContext, useContext, useState } from 'react'

const TestContext = createContext('default');

const ContextComp=(props,ref)=>{
    const context = useContext(TestContext);
    return (
        <p>
            {context}
        </p>
    );
}


export default ()=>{
    const [name,setName]=useState('tom');
    return(
        <>
            <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
            <TestContext.Provider value={name}>
                <ContextComp/>
            </TestContext.Provider>
        </>
    );
}