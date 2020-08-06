import { ELEMENT_TEXT } from './constants';
import { UpdateQueue, Update } from './updateQueue';
import { scheduleRoot } from './scheduler';
/**
 * 創建元素的方法
 * @param {*} type 類型 div,span
 * @param {*} config 配置對象 屬性 key,ref
 * @param  {...any} children 子類
 */
function createElement(type, config, ...children) {
  delete config.__self;
  delete config.__source;
  return {
    type,
    props: {
      ...config,
      children: children.map((child) => {
        return typeof child == 'object'
          ? child
          : {
              type: ELEMENT_TEXT,
              props: { text: child, children: [] },
            };
      }),
    },
  };
}

class Component {
  constructor(props) {
    this.props = props;
    this.updateQueue = new UpdateQueue();
  }
  setState(payload) {
    let update = new Update(payload);
    this.updateQueue.enqueueUpdate(update);
    scheduleRoot();
  }
}

Component.prototype.isReactComponent = {}; // 類組件

const React = {
  createElement,
  Component,
};

export default React;
