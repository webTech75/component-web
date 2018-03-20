import { jsdom } from 'jsdom';

const document = jsdom('');

const properties = Object.getOwnPropertyNames(
  jsdom('', { features: { ProcessExternalResources: false } }).defaultView,
);

properties.forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});
