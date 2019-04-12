# FNFY

A small set of tools to ease the usage of React without JSX.


## Example

```javascript
import fnfy, { View } from 'fnfy';
import _ThirdPartyComponent from 'third-party-component';
import PropTypes from 'prop-types';


const ThirdPartyComponent = fnfy(_ThirdPartyComponent);
const Img = fnfy('img');


const MyComponent = ({ images }) => {
  return View({
    className: 'MyComponent',
    children: ThirdPartyComponent({
      someProps: 'someValue',
      children: [
        Img({ src: images.b }),
        Img({ src: images.a }),
      ],
    }),
  });
};


MyComponent.propTypes = {
  images: PropTypes.object.isRequired,
};


export default fnfy(MyComponent);
```


## API

### `fnfy(Component)`

Base funtionality, wraps the component so it can be used as a function no matter what the original component was (a class or a function). It also adds some important stuff like the ability to use `instances` (more to it later) and make sure we always use `createElement` at the end.

It can be used to wrap own components, external components or string components.

### `View(props)`

Replace `div` component with `View` component to have a base component and not having to wrap all the time `div` in `fnfy('div')`. Also, forward refs by default so it behaves like a normal base component.

It accepts all the props a React component would, so we can have a 1:1 equivalence between both.

### `cloneElement(Component, newProps)`

Wrapper around `React.cloneElement` to make sure everything gets cloned the right way.

### `useInstance()`

So before, instances were mentioned, what are they? Well, since the idea with hooks is that every React component is now a function based component, it's not possible to expose methods from the children to the parent anymore. This aims to fix this issue. The way of using it it's the following:

```javascript
import { useState } from 'react';
import fnfy, { View, useInstance } from 'fnfy';


const Button = fnfy('button');


// Every fnfy-ied component gets a prop called `inst` that can be
// used to pass methods to the parent or anyone attached to the inst
const MyChild = fnfy(({ inst }) => {
  const [ stuff, setStuff ] = useState(false);

  inst.setInstance(() => ({
    toggleStuff: () => {
      setStuff( ! stuff);
    },
  }));

  return View({
    className: stuff ? 'OneStuff' : 'OtherStuff',
  });
});


const MyParent = () => {
  const childInst = useInstance();
  return View({
    className: 'Parent',
    children: [
      MyChild({ inst: childInst }),
      Button({
        children: 'Click Here',
        onClick: () => childInst.toggleStuff(),
      }),
    ],
  });
};
