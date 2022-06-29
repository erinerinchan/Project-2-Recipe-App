let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredientDiv = document.querySelectorAll('.ingredientDiv')[0];

addIngredientsBtn.addEventListener('click', function() {
  let newIngredients = ingredientDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
});


let addInstructionsBtn = document.getElementById('addInstructionsBtn');
let instructionsList = document.querySelector('.instructionsList');
let instructionsDiv = document.querySelectorAll('.instructionsDiv')[0];

addInstructionsBtn.addEventListener('click', function() {
  let newInstructions = instructionsDiv.cloneNode(true);
  let input = newInstructions.getElementsByTagName('input')[0];
  input.value = '';
  instructionsList.appendChild(newInstructions);
});
