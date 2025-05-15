// src/alpine-init.js
export function initializeAlpine() {
  // Fix for Alpine.js and React integration
  if (window.Alpine) {
    // Extend Alpine initialization to handle data-x- prefixed attributes
    const originalInitTree = window.Alpine.initTree;
    
    window.Alpine.initTree = (el) => {
      // Convert all data-x-* attributes to x-* for Alpine
      const dataXElements = el.querySelectorAll('[data-x-data], [data-x-init], [data-x-show], [data-x-bind], [data-x-on\\:click]');
      
      dataXElements.forEach(dataXEl => {
        // Get all attributes
        const attributes = dataXEl.attributes;
        
        // Convert data-x-* to x-*
        for (let i = 0; i < attributes.length; i++) {
          const attr = attributes[i];
          if (attr.name.startsWith('data-x-')) {
            // Create the real alpine attribute
            const alpineAttrName = attr.name.replace('data-x-', 'x-');
            dataXEl.setAttribute(alpineAttrName, attr.value);
          }
        }
      });
      
      // Call original initialization
      originalInitTree(el);
    };
  }
}