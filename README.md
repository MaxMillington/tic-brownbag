### yarn install
### yarn start


# React Lifecycle

When creating a component, React has provided us with a number of built-in lifecyle methods that allow us to perform certain actions before, during, or after a component's creation or destruction.

The React Lifecycle methods are run in the following order:

##### Initial Mounting
 - GetDefaultProps
 - GetInitialState
 - ComponentWillMount
 - Render
 - ComponentDidMount
 
##### State Changes
 - ShouldComponentUpdate
 - ComponentWillUpdate
 - Render
 - ComponentDidUpdate
 
##### Prop Changes
 - ComponentWillReceiveProps
 - ShouldComponentUpdate
 - ComponentWillUpdate
 - Render
 - ComponentDidUpdate
 
 
##### Unmounting
 - ComponentWillUnmount

These methods can be invoked after calling `React.createClass()` and providing a specified object, or by creating a class using a plain JS class. 


## render()

The most important of these methods is `render(`), which is required in every component to return the component's markup. The `render()` function is always a *pure* function, meaning it *examines* but does not alter the component's props and/or state. The render() function must return a *single* child element (or in React v15, null or false), such as a `<div />` or another component (although this changes in React v16). You can't run `setState()` or otherwise mutate the state in the `render()` function, since each of these mutations triggers a `render()`, which would cause an infinite loop.

`render()` is also the only lifecyle method that exists across multiple stages of the lifecyle, e.g. it is invoked at the beginning of the component's life and on updates.   

All other lifecyle methods are defined relative to the render().

## componentWillMount()

Invoked just once, before the initial rendering occurs. One thing that is unique to `componentWillMount()` is that if you call `setState()` within the function it will not re-render the page. This is because it has been called before the initial `render()` and React is set up to recognize this and only render the page once. `componentWillMount()` should really only be used if you wanted to run a small bit of code before the `render()`. 

There is *almost no reason to use `componentWillMount()` at all*. For React apps that do not use ES6 classes, you would use `componentWillMount()` as the constructor. However, since we use a constructor to set state and properties on the object, `componentWillMount()` just serves to cause confusion. In fact, we should discourage using it since dispatching actions that make ajax requests can lead to problems. If you need to dispatch an action that does not make an ajax request, and want to do it during the initial mounting, then this would be a use case for `componentWillMount()`.

## componentDidMount()

This is run after the initial render. Hence, if you were to call `setState()` in this method, it would re-render the page. This is the place to put ajax calls to go get any data that we need but do not have.

These ajax calls belong in the `componentDidMount()`, after the render. This is because it is possible for the ajax call to finish with new data before the rendering of the component is complete. Our ajax callback would then try to render an unmounted component. React is usually very fast, so this is an edge case, but it is generally safest and best practice (explicitly recommended by Facebook) to put all of our ajax requests into `componentDidMount()`. The common practice is to put a loader or spinner on the page while waiting for the ajax call to finish.

## shouldComponentUpdate()

React sets the default of this method to `true`. Since if I send a component new props, it should update. However, if for some reason you wanted to prevent a component from ever updating, you would use this method and just return `false`. `shouldComponentUpdate()` is meant to be used as an optimizer. In it, you can compare the previous props and the next props that the component is receiving. If they are the same, you can return `false` and prevent `render()`, `componentWillUpdate()`, and `componentDidUpdate()` from firing.

## componentWillUpdate()

As with `componentWillMount()`, this is called just before the rendering of an updated component. However, you cannot call `setState()` in `componentWillUpdate()`. Instead, you can only use it if you wanted make any preparations for the upcoming update. You have access to the new props and the old props in this method, so if you wanted to do a comparison between props before the re-render, you can do it here. If you need to set the state, use `componentWillReceiveProps()` instead.

## componentDidUpdate()

This is pretty much the same as `componentDidMount()` except after an update. So if you have any ajax requests you want to make, put them here.

## componentWillReceiveProps() 

It's very important to get the naming correct here. `this.props` gets you access to the *old* props. In order to get the new props, you need to pass them in as a parameter in the function and then grab them in the function itself. The convntion is to use `nextProps` like this:

```
componentWillReceiveProps: (nextProps) => {
  this.setState({
    likesIncreasing: nextProps.likeCount > this.props.likeCount
  });
}
```
Note that because this is called before the render(), calling this.SetState() will not trigger an additional render.

## componentWillUnmount() 

Called right before the component is removed from the DOM. Perform any final actions here, e.g. removing an event listener.

## componentDidCatch() 

Only called if there is an error rendering. 
