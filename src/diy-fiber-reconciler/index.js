import React from './react';
import ReactDOM from './react-dom';

const ADD = 'ADD';
function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + 1 };

    default:
      return state;
  }
}

function FunctionCounter(props) {
  const [countState, dispath] = React.useReducer({ count: 0 });
  return (
    <div>
      <span>{countState.count}</span>
      <button onClick={() => dispath({ type: ADD })}>加1</button>
    </div>
  );
}

class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  onClick = () => {
    this.setState((state) => ({ number: state.number + 1 }));
  };

  render() {
    return (
      <div>
        <span>{this.state.number}</span>
        <button onClick={this.onClick}>加1</button>
      </div>
    );
  }
}

ReactDOM.render(<ClassCounter />, document.getElementById('root'));
