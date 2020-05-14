import React, { Component } from 'react'

class SchedulePage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            num: 1
        }
    }


    componentDidUpdate() {
        console.log('didUpdate!')
    }

    onClickHandler = () => {
        let num = this.state.num;
        this.setState({
            num: num + 1
        })
        
        setTimeout(() => {
            this.setState({
                num: num + 2
            })
        }, 2000);
    }
    render() {
        debugger
        console.log('render tim and state value:', Date.now(), this.state.num);

        return <div>
            <h3>
                schedule page
               </h3>
            <p>
                num is:
            {this.state.num}
            </p>
            <button onClick={this.onClickHandler} key={9901}>增加</button>
        </div>
    }

}

export default SchedulePage;