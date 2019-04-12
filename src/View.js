import { createElement, forwardRef } from 'react';

import fnfy from './fnfy';


const View = forwardRef(({ children, inst, ...rest }, ref) => {
  children = Array.isArray(children) ? children : [ children ];
  return createElement('div', { ...rest, ref }, ...children);
});


View.displayName = 'View';


export default fnfy(View);
