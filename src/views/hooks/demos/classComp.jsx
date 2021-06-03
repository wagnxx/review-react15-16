import React from 'react'

export class ClassComp extends React.Component {

  state = {
    msg:'hello'
  }

  componentDidMount() {
    this.setState({msg:'mounted comp'})
    setTimeout(() => {
      this.setState({msg:'updateed comp'})

      
    }, 100);
  }

  render() {
    return <div>
      value: 
      <p>
        {this.state.msg}
      </p>
    </div>
  }
}