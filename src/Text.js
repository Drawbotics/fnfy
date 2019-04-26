import { createElement } from 'react';


const Text = (text, props = {}) => {
  const { style = {}, ...rest } = props;
  style.display = style.display != null ? style.display : 'inline-block';
  return createElement('span', { ...rest, style }, text);
};


export default Text;
