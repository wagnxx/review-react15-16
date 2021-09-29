import React from 'react';
// components 
import SunComp from './SunComp';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actions, actionsTypes } from './store';

const PracticePage = props => {
    const list = props.list
    const listData = list.toJS();

    return (
        <div style={{
            display:'flex'
        }}>
            <div className="left">

                <h3>practice </h3>
                <button onClick={props.handleTimesAdd.bind(this)}>time加 一</button>
                <button onClick={props.handleTimesAddAsync.bind(this)}>time Async加 一</button>
                <h3>子组件</h3>
                <SunComp a='1' b='2' />

            </div>
            <div className="right" style={{padding:'0 20px',borderLeft:'1px solid #ddd'}}>

                <button onClick={props.listAddHandle.bind(this)}>添加列表</button>
                <button onClick={props.listAddHandleAsync.bind(this)}>async添加列表</button>
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


const mapStateToProps = state => {
    return {
        list: state.getIn(['immutable', 'list'])
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleTimesAddAsync: bindActionCreators(actions.fetchAdd, dispatch),
        listAddHandleAsync: bindActionCreators(actions.fetchListAdd, dispatch),
        handleTimesAdd: () => dispatch({ type: actionsTypes.MAP_ADD }),
        listAddHandle: () => dispatch({ type: actionsTypes.LIST_ADD })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PracticePage)