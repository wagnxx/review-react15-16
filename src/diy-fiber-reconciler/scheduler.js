import {
  TAG_ROOT,
  ELEMENT_TEXT,
  TAG_TEXT,
  TAG_HOST,
  DELETION,
  UPDATE,
  TAG_CLASS,
} from './constants';
import { setProps } from './utils';
import { UpdateQueue, Update } from './updateQueue';

/**
 * 從根節點開始渲染
 * 兩個階段
 * diff階段,對比新舊 vdom,進行增量更新 或創建,render階段
 * 這個階段可以比較花時間,可以對任務進行拆分,拆分維度vdom,可以暫停
 * render階段兩個任務，１　根據ｖｄｏｍ生成ｆｉｂｅｒ樹,2 收集effectlist
 * commit階段,進行dom更新階段,不可暫停,一氣呵成
 */
let nextUnitOfWork = null;
let workInProgressRoot = null; //正在渲染的根rootFiber
let currentRoot = null; // 渲染成功之後的根rootFiber
let deletions = []; //刪除的節點

let workInProgressFiber = null; // 正在工作中的fiber
let hookIndex = 0; // hooks索引

function scheduleRoot(rootFiber) {
  // rootfiber:{tag,stateNode,props}
  if (currentRoot && currentRoot.alternate) {
    // 第二次之後的更新
    workInProgressRoot = currentRoot.alternate; // 第一次渲染出來的那個fibertree
    workInProgressRoot.alternate = currentRoot; // 讓這個樹的替身指向當前的currentRoot
    if (rootFiber) {
      workInProgressRoot.props = rootFiber.props; // 讓它的props更新成新的props
    }
  } else if (currentRoot) {
    // 第一次更新
    if (rootFiber) {
      rootFiber.alternate = currentRoot;
      workInProgressRoot = rootFiber;
    } else {
      workInProgressRoot = {
        ...currentRoot,
        alternate: currentRoot,
      };
    }
  } else {
    // 第一次渲染
    workInProgressRoot = rootFiber;
  }
  workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = null;
  nextUnitOfWork = workInProgressRoot;
}

function workLoop(deadline) {
  let shouldYield = false; // 是否要讓出時間片或者控制權
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && workInProgressRoot) {
    console.log('render end');
    commitRoot();
  }
  requestIdleCallback(workLoop, { timeout: 500 });
}

requestIdleCallback(workLoop, { timeout: 500 });

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber);
  if (currentFiber.child) {
    return currentFiber.child;
  }
  while (currentFiber) {
    completeUnitOfWork(currentFiber);
    if (currentFiber.sibling) {
      return currentFiber.sibling;
    }
    currentFiber = currentFiber.return;
  }
}

//　在完成的時候收集副作用的ｆｉｂｅｒ，然後組成effect list
function completeUnitOfWork(currentFiber) {
  let returnFiber = currentFiber.return;
  if (returnFiber) {
    //////  把自己兒子的Ｅｆｆｅｃｔ掛到父節點
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect;
    }
    if (currentFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
      }

      returnFiber.lastEffect = currentFiber.lastEffect;
    }
    //////////////////////////////////////////////////////////////
    // 把自己掛到父節點
    const effectTag = currentFiber.effectTag;
    if (effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber;
      } else {
        returnFiber.firstEffect = currentFiber;
      }
      returnFiber.lastEffect = currentFiber;
    }
  }
}

/**
 *
 * @param {*} currentFiber
 * 1.創建ｄｏｍ元素
 */
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber);
  } else if (currentFiber.tag === TAG_TEXT) {
    updateHostText(currentFiber);
  } else if (currentFiber.tag === TAG_HOST) {
    updateHost(currentFiber);
  } else if (currentFiber.tag === TAG_CLASS) {
    updateClassComponent(currentFiber);
  } else if (currentFiber.tag === TAG_FUNCTION_COMPONENT) {
    updateFunctionComponent(currentFiber);
  }
}

function updateFunctionComponent(currentFiber) {
  workInProgressFiber = currentFiber;
  hookIndex = 0;
  workInProgressFiber.hooks = [];

  let newChildren = currentFiber.type(currentFiber.props);
  reconcileChildren(currentFiber, newChildren);
}

function updateClassComponent(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = new currentFiber.type(currentFiber.props);
    currentFiber.stateNode.internalFiber = currentFiber;
    currentFiber.updateQueue = new UpdateQueue();
  }
  currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate(
    currentFiber.stateNode.state
  );
  let newElement = currentFiber.stateNode.render();
  const newChildren = [newElement];
  reconcileChildren(currentFiber, newChildren);
}

function updateHost(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber);
  }
  const newChildren = currentFiber.props.children;
  reconcileChildren(currentFiber, newChildren);
}

function createDOM(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {
    return document.createTextNode(currentFiber.props.text);
  } else if (currentFiber.tag === TAG_HOST) {
    let stateNode = document.createElement(currentFiber.type);
    updateDOM(stateNode, {}, currentFiber.props);
    return stateNode;
  }
}
function updateDOM(stateNode, oldProps, newProps) {
  if (stateNode.setAttribute) setProps(stateNode, oldProps, newProps);
}

function updateHostText(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber);
  }
}

function updateHostRoot(currentFiber) {
  let newChildren = currentFiber.props.children[element];
  reconcileChildren(currentFiber, newChildren);
}

function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0;
  let prevSbling;

  let oldFiber = currentFiber.alternate && currentFiber.alternate.child;
  if (oldFiber)
    oldFiber.firstEffect = oldFiber.lastEffect = oldFiber.nextEffect = null;
  while (newChildIndex < newChildren.length || oldFiber) {
    let newChild = newChildren[newChildIndex];
    let newFiber;
    const sameType = oldFiber && newChild && oldFiber.type === newFiber.type;

    let tag;
    if (
      newChild &&
      typeof newChild.type === 'function' &&
      newChild.type.prototype.isReactComponent
    ) {
      tag = TAG_CLASS;
    } else if (newChild && typeof newChild.type === 'function') {
      tag = TAG_FUNCTION_COMPONENT;
    } else if (newChild && newChild.type === ELEMENT_TEXT) {
      tag = TAG_TEXT;
    } else if (newChild && typeof newChild.type === 'string') {
      tag = TAG_HOST;
    } // beginWork創建ｆｉｂｅｒ，在completeUnitOfwork時收集Ｅｆｆｅｃｔ

    if (sameType) {
      if (oldFiber.alternate) {
        // 說明至少已經更新一次了
        newFiber = oldFiber.alternate; // 如果有上次的fiber就拿過來 作爲這次的fiber
        newFiber.props = newChild.props;
        newFiber.alternate = oldFiber;
        newFiber.effectTag = UPDATE;
        newFiber.updateQueue = oldFiber.updateQueue || new UpdateQueue();
        newFiber.nextEffect = null;
      } else {
        newFiber = {
          tag: oldFiber.tag,
          type: oldFiber.type,
          props: newChild.props,
          stateNode: oldFiber.stateNode,
          alternate: oldFiber,
          return: currentFiber,
          effectTag: UPDATE, //副作用標識,render時收集副作用，　增加，刪除，更新
          updateQueue: new UpdateQueue(),
          nextEffect: null, //effect list　順序和完成時一樣
        };
      }
    } else {
      if (newChild) {
        newFiber = {
          tag,
          type: newChild.type,
          props: newChild.props,
          stateNode: null,
          return: currentFiber,
          effectTag: PLACEMENT, //副作用標識,render時收集副作用，　增加，刪除，更新
          nextEffect: null, //effect list　順序和完成時一樣
        };
      }

      if (oldFiber) {
        oldFiber.effectTag = DELETION;
        deletions.push(oldFiber);
      }
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (newFiber) {
      if (newChildIndex == 0) {
        currentFiber.child = newFiber;
      } else {
        prevSbling.sibling = newFiber;
      }
      prevSbling = newFiber;
    }
    newChildIndex++;
  }
}

/////// commit phyase
function commitRoot() {
  deletions.forEach(commitWork);
  let currentFiber = workInProgressRoot.firstEffect;

  while (currentFiber) {
    commitWork(currentFiber);
    currentFiber = currentFiber.nextEffect;
  }
  deletions.length = 0;
  currentRoot = workInProgressRoot;
  workInProgressRoot = null;
}

function commitWork(currentFiber) {
  if (!currentFiber) return;
  while (
    currentFiber.tag !== TAG_HOST &&
    currentFiber.tag !== TAG_ROOT &&
    currentFiber.tag !== TAG_TEXT
  ) {
    currentFiber = currentFiber.return;
  }

  let returnFiber = currentFiber.return;
  let returnDOM = returnFiber.stateNode;
  if (currentFiber.effectTag == PLACEMENT) {
    let nextFiber = currentFiber;
    // 如果掛載的節點不是dom節點,比如是類組件fiber,一直找第一個兒子,直到找到一個真dom節點
    while (nextFiber.tag != TAG_TEXT && nextFiber.tag !== TAG_HOST) {
      nextFiber = currentFiber.child;
    }
    returnDOM.appendChild(nextFiber.stateNode);
  } else if (currentFiber.effectTag === DELETION) {
    commitDeletion(currentFiber, returnDOM);
    // returnDOM.removeChild(currentFiber.stateNode);
  } else if (currentFiber.effectTag === UPDATE) {
    if (currentFiber.type === ELEMENT_TEXT) {
      if (currentFiber.alternate.props.text !== currentFiber.props.text) {
        currentFiber.stateNode.textContent = currentFiber.props.text;
      } else {
        if (currentFiber.type === TAG_CLASS) {
          return (currentFiber.effectTag = null);
        }
        updateDOM(
          currentFiber.stateNode,
          currentFiber.alternate.props,
          currentFiber.props
        );
      }
    }
  }

  returnFiber.effectTag = null;
}

function commitDeletion(currentFiber, returnDOM) {
  if (currentFiber.tag != TAG_TEXT || currentFiber.tag !== TAG_HOST) {
    returnDOM.removeChild(currentFiber.stateNode);
  } else {
    commitDeletion(currentFiber.child);
  }
}

// hooks of function
/**
 *
 * @param {*} reducer
 * @param {*} initialValue
 */
export function useReducer(reducer, initialValue) {
  let newdHook =
    workInProgressFiber.alternate &&
    workInProgressFiber.alternate.hooks &&
    workInProgressFiber.alternate.hooks[hookIndex];

  if (newdHook) {
    newdHook.state = newdHook.updateQueue.forceUpdate(newdHook.state);
  } else {
    newHook = {
      state: initialValue,
      updateQueue: new UpdateQueue(),
    };
  }
  const dispatch = (action) => {
    newHook.updateQueue.enqueueUpdate(
      new Update(reducer ? reducer(newHook.state, action) : action)
    );
    scheduleRoot();
  };
  workInProgressFiber.hooks[hookIndex++] = newHook;
  return [newHook.state, dispatch];
}

export function useState(initialValue) {
  return useReducer(null, initialValue);
}

export { scheduleRoot };
