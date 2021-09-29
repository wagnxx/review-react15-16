import React from 'react'
import { connect } from 'react-redux'
const SunComp = props => {
    const map = props.map;
    const times = map.get('times');

    return <div>
        a:{props.a}
        b:
        {props.b}
        times:
        {times}
    </div>
}



const mapStateToProps = state => {
    return {
        map: state.getIn(['immutable', 'map']),
    }
}

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(SunComp)