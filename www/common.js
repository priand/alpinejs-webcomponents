document.addEventListener("alpine:init", () => {

  // This is copied from directive.js andd should be removed
  // >>>>>>
  let prefixAsString = 'x-'
  function prefix(subject = '') {
    return prefixAsString + subject
  }
  let startingWith = (subject, replacement) => ({ name, value }) => {
    if (name.startsWith(subject)) name = name.replace(subject, replacement)

    return { name, value }
  }
  // <<<<<<
  
  /*
   * Access the parent web component from an element
   * It only works for custon elements using ShadowDOM
   */
  Alpine.magic('wc', (el) => {
    return el.getRootNode()?.host;
  });

  /*
   * Set a custom element property
   */
  Alpine.mapAttributes(startingWith('.', prefix('prop:')))
  Alpine.directive('prop', (el, { value, expression }, { effect, evaluateLater }) => {
    let evaluate = evaluateLater(expression)
    effect(() => evaluate(result => {
      if( el[value] !== result ) {
        el[value] = result;
      }
    }))
  });

  /*
   * Set a set of custom element properties
   * Equivalent to a spread operator.
   */
  Alpine.directive('props', (el, { expression }, { effect, evaluateLater }) => {
    let evaluate = evaluateLater(expression)
    effect(() => evaluate(result => {
      Object.entries(result).forEach(([key, value]) => {
        if( el[key] !== value ) {
          el[key] = value;
        }
      });
    }))
  });

});
