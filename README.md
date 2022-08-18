# Web components with AlpineJS

This demonstrates some patterns for writting web components using the AlpineJS
framework, using dedicated directives and magics.  


## Template.  
The templating mechanism uses the predefined `template` element. The component inner
HTML is created by cloning this element, which ensures that the HTML is only parsed
once, regardless of the number of component instances.  

The parsed template can be either added to the shadow root of the web component, or directly
as a child of that component, depending if we want to leverage the ShadowDOM
or simply the LightDOM.  

In case of ShadowDOM, the component content has to be initialized explicitely by 
calling `Alpine.initTree(shadow)`, as the Alpine runtime added at the root of the page
cannot monitor the mutations in the ShadowDOM.  

## State Management.  
The reactive state of a component is maintained using an object member of
the web component class. Typically, this member is named `state` to mimic React,
but this is just a convention. The `state` member is made reactive by calling the 
`Alpine.reactive` function.  
Note that a future implementation should provide a decorator, like `@state` or `@reactive`,
when  decoractors will be part of the JS spec.

### With ShadowDOM.  
Because the shadow root of an element is a node, the state can be directly attached to that
node using `Alpine.addScopeToNode()`. It should happen before the call to `Alpine.initTree(shadow)`.

### With LighDOM.  
When LightDOM is used, there is no shadow root element and thus the state should
be attached to the element itself. If this is done using `Alpine.addScopeToNode()`, then
the component has to be reinitialized using `Alpine.initTree(this)`. Another solution is to
dynamically add a `x-data` attribute to the element.  

### Alternatives.  
Some alternatives have been considered, like making the whole custom element reactive. But
it doesn't provide yet much value, because the prototype members as not available through
the proxy (only the owned members are). Moreover, it introduces subtle issues with `this`,
which can be sometimes the element and sometimes the proxy.

## Magics & Directives.  
This experiement also provides some magics and directives to make the use of web components
easier:  
  - `$wc` is a magic that returns the closest webcomponent, as long as the web component uses
     ShadowDOM (there is no reliable way to get the LightDOM parent). Through this magic, an
     expression can access any component member.  
     Note: to call a component method, one should make the call explicit using parenthesis,
     like `$wc.inc()`. Else, the method will be called with the current state object as this,
     which can lead to undesired effects/behaviors.
     Another solution is to auto bind the method in the component: `this.inc=this.inc.bind(this)`.  
  - `x-prop`: this is similar to `x-bind` but instead of binding an HTML attribute, it binds
    an element property. A `.` alias is provided as a notation shorthand, similarly to `:` for
    `x:bind`.  
  - `x-props`: binds a set of properties passed as an object. It is the 'spread' operator applied
    to element properties.  
  
