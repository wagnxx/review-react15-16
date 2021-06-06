import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
// import {getObjectStore} from '../utils/db'
const PREFIX = 'whatsapp-clone-';

const WindwoSizeContext = createContext();
export const useWindowResized = () => useContext(WindwoSizeContext);
export default function WindowResizeContextProvider({ children }) {
  const [screenWidth, setscreenWidth] = useState();
  const [isPhoneClient, setIsPhoneClient] = useState(function () {
    if (screenWidth <= 600) return true;
    return false;
  });

  // const controllFunc = useCallback(controllFre,
  //   []
  // )

  function resize() {
    const width = window.innerWidth;
    console.log('hiiiiii  I AM Risized =====> ', width);

    setscreenWidth(width);
    if (width <= 600) {
      setIsPhoneClient(true);
    } else {
      setIsPhoneClient(false);
    }
  }

  useEffect(function () {
    resize();
    window.onresize = debounce.call(window, resize, 200);
  }, []);

  return (
    <WindwoSizeContext.Provider value={{ screenWidth,isPhoneClient }}>
      {children}
    </WindwoSizeContext.Provider>
  );
}

function controllFre(fn, time) {
  let timeout;

  return function () {
    let ctx = this;
    if (timeout) {
      clearTimeout(timeout);
    }

    let callNow = !timeout;

    timeout = setTimeout(function () {
      timeout = null;
    }, time);

    callNow && fn.apply(ctx, arguments);
  };
}

function debounce(func, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

function throttle(fn, wait) {
  let lastTime = Date.now();

  return function () {
    let args = arguments;
    let now = Date.now();

    if (now - lastTime > wait) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
