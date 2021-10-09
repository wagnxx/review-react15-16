import React from 'react'
import { connect,useSelector } from 'react-redux'
const SunComp = props => {
    // const map = props.map;
    
    const map = useSelector(state => state.getIn(['immutable', 'map']))
    
    const times = map.get('times');
    return <div>
        a:{props.a}
        b:
        {props.b}
        times:
        {times}
    </div>
}



// const mapStateToProps = state => {
//     return {
//         map: state.getIn(['immutable', 'map']),
//     }
// }

// const mapDispatchToProps = null;
// export default connect(mapStateToProps, mapDispatchToProps)(SunComp)
export default SunComp