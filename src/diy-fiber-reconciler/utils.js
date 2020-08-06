export function setProps(dom, oldPros, newProps) {
  for (let key in oldPros) {
    if (key !== 'children') {
      if (!newProps.hasOwnProperty(key)) {
        setProp(dom, key, newProps[key]);
      } else {
        dom.removeAttribuite(key);
      }
    }
  }

  for (let key in newProps) {
    if (key !== 'children') {
      if (!oldProps.hasOwnProperty(key)) {
        setProp(dom, key, newProps[key]);
      }
    }
  }
}

function setProp(dom, key, value) {
  if (/^on/.test(key)) {
    dom[key.toLowerCase()] = value;
  } else if (key === 'style') {
    if (value) {
      for (let styleName in value) {
        dom.style[styleName] = value[styleName];
      }
    }
  } else {
    dom.setAttribute(key, value);
  }
}
