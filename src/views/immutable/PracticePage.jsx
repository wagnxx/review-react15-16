import React from 'react';
// components 
import SunComp from './SunComp';

import { bindActionCreators } from 'redux';
import { actions, actionsTypes } from './store';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';

const PracticePage = props => {
    const list = useSelector(state => state.getIn(['immutable', 'list']))
    const listData = list.toJS();

    const dispatch = useDispatch();

    const handleTimesAddAsync = bindActionCreators(actions.fetchAdd, dispatch);
    const listAddHandleAsync = bindActionCreators(actions.fetchListAdd, dispatch);
    const handleTimesAdd =  () => dispatch({ type: actionsTypes.MAP_ADD });
    const listAddHandle = () => dispatch({ type: actionsTypes.LIST_ADD });

    return (
        <div style={{
            display:'flex'
        }}>
            <div className="left">

                <h3>practice </h3>
                <button onClick={handleTimesAdd.bind(this)}>time加 一</button>
                <button onClick={handleTimesAddAsync.bind(this)}>time Async加 一</button>
                <h3>子组件</h3>
                <SunComp a='1' b='2' />

            </div>
            <div className="right" style={{padding:'0 20px',borderLeft:'1px solid #ddd'}}>

                <button onClick={listAddHandle.bind(this)}>添加列表</button>
                <button onClick={listAddHandleAsync.bind(this)}>async添加列表</button>
                <div>
                    <ul>
                        {
                            listData.length ? listData.map((item, index) => (
                                <li key={index}>
                                    name:   {item.name}
                                    count:   {item.count}
                                </li>
                            ))
                                : ''
                        }
                    </ul>
                </div>
            </div>

        </div>)
}

export default PracticePage;