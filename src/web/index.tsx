// interface IYd {
//   str: string;
// }
// class Index {
//   private data: IYd;
//   constructor(data: IYd) {
//     this.data = data;
//   }
//   og() {
//     console.log(this.data);
//   }
// }
import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from './pages/App';

ReactDom.render(<App />, document.getElementById('main'));
