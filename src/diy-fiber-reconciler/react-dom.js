import { TAG_ROOT } from './constants';
/**
 * render 是把一個元素渲染到容器內部
 */

function render(element, container) {
  let rootFiber = {
    tag: TAG_ROOT,
    stateNode: container, // 元素是原生時,指向dom節點
    props: {
      children: [element],
    },
  };

  scheduleRoot(rootFiber);
  
}

const ReactDOM = {
  render,
};

export default ReactDOM;
