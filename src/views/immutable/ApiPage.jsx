import React from 'react'
import { Map, List } from 'immutable'
export default () => {
    // console.log('map',Map)
    // console.log('list',List)
    window.a = Map({
        select: 'users',
        filter: Map({
            name: 'cam'
        })
    });
    let b = window.a.set('select', 'people');
    // console.log('a==b', a === b);
    // console.log('a.filter==b.filter', a.get('filter') === b.get('filter'));
    // console.log('a', a);
    console.log('b', b);
    return (
        <div>
            <h3>API page</h3>
            <strong>

                Immutable.js 的几种数据类型
            </strong>
            <ul style={{ padding: '8px' }}>

                <li>List: 有序索引集，类似JavaScript中的Array。</li>
                <li>Map: 无序索引集，类似JavaScript中的Object。</li>
                <li>OrderedMap: 有序的Map，根据数据的set()进行排序。</li>
                <li>Set: 没有重复值的集合。</li>
                <li>OrderedSet: 有序的Set，根据数据的add进行排序。</li>
                <li>Stack: 有序集合，支持使用unshift()和shift()添加和删除。</li>
                <li>Record: 一个用于生成Record实例的类。类似于JavaScript的Object，但是只接收特定字符串为key，具有默认值。</li>
                <li>Seq: 序列，但是可能不能由具体的数据结构支持。</li>
                <li>Collection: 是构建所有数据结构的基类，不可以直接构建。</li>

            </ul>

            用的最多就是List和Map，所以在这里主要介绍这两种数据类型的API。

        </div>
    )
}