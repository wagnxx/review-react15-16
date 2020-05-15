import React from 'react';
import Immutable from 'immutable';
// components 
import SunComp from './SunComp';

export default class PracticePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Immutable.Map({ times: 1 })
        }
    }
    handleAdd() {
        this.setState(({ data }) => ({
            data: data.update('times', v => v + 1)
        }));
    }
    render() {
        const times = this.state.data.get('times');
        return (
            <div>
                <h3>practice </h3>

                <p>
                    <span>

                        times:
                    </span>
                    <span style={{ color: '#f00' }}>{times}</span>
                    <button onClick={this.handleAdd.bind(this)}>加 一</button>
                </p>
                <hr />
                <h3>子组件</h3>
                <SunComp a='1' b='2' times={times} />
            </div>)
    }
}