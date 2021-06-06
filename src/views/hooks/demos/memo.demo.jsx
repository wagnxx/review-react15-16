import React, { memo, useState } from 'react'

//memo让一个函数组件变成一个纯组件

const Counter=memo(props=>{
    console.log('Counter组件又渲染了');
    return <h1 >{props.onClick}</h1>
});
// memo情况
// export default ()=>{
//     const [count,setCount] = useState(0);
//     const data='hello world';

//     return(
//         <>
//             <span>{count}</span>
//             <input type="button"
//                 value='修改count'
//                 onClick={()=>setCount(count+1)}
//             />
//             <Counter data={data}/>
//         </>
//     );
// }



//  useMemo的情况

// export default ()=>{
//     const [count,setCount] = useState(0);

//     const double = useMemo(()=>{
//         return count * 2;
//     },[count === 3]);

//     const data='hell world';

//     return(
//         <>
//             <span>{double}</span>
//             <input type="button"
//                 value='修改count'
//                 onClick={()=>setCount(count+1)}
//             />
//             <Counter data={data}/>
//         </>
//     );
// }

// useCallback 情况

export default ()=>{
    const [count,setCount] = useState(0);

    // const double = useMemo(()=>{
    //     return count * 2;
    // },[count === 3]);

    const onClick=()=>{
        console.log('click');
    }


 

    return(
        <>
           
            <input type="button"
                value='修改count'
                onClick={()=>setCount(count+1)}
            />
            <Counter onClick={onClick}/>
        </>
    );
}