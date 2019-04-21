import { Fragment, useRef, createElement, cloneElement as _cloneElement } from 'react';

import Instance from './Instance';


function _wrapInst(inst) {
  return inst == null ? new Instance() : inst;
}


export function useInstance() {
  const instance = useRef(new Instance());
  return instance.current;
}


export function cloneElement(element, props = {}) {
  if (element == null) {
    return null;
  }
  let { children, inst, ...rest } = props;
  children = Array.isArray(children) ? children : [children];
  return _cloneElement(element, { ...rest, inst: _wrapInst(inst) }, ...children);
}


export default function fnfy(Component) {
  const componentName = Component.displayName || Component.name;
  let prevInst = null;

  const Fnfy = (props = {}) => {
    let { children, inst, ...rest } = props;
    children = Array.isArray(children) ? children : [ children ];

    if (prevInst == null || prevInst.id !== inst?.id) {
      prevInst = _wrapInst(inst);
    }

    if (typeof Component === 'string' || Component === Fragment) {
      return createElement(Component, { ...rest }, ...children);
    }

    return createElement(Component, { ...rest, inst: prevInst }, ...children);
  };

  Fnfy.displayName = `Fnfy(${componentName})`;

  return Fnfy;
}
