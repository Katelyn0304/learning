const FormData = require('form-data');

function handleFormSubmit(event) {
    event.preventDefault();
    
    const data = new FormData(event.target);
    
    const formJSON = Object.fromEntries(data.entries());
  
    // for multi-selects, we need special handling
    formJSON.snacks = data.getAll('snacks');
    
    const results = document.querySelector('.results pre');
    results.innerText = JSON.stringify(formJSON, null, 2);
}
  
const a = document.querySelector('.contact-form').addEventListener('submit', handleFormSubmit);
console.log(a);


/*
function handleSubmit(event) {
    event.preventDefault();
  
    const data = new FormData(event.target);
  
    const value = data.get('name');
  
    console.log({ value });
}
  
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
*/