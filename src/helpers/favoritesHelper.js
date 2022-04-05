export function createFavoriteStorage() {
  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
}

export function getFavoriteRecipes() {
  createFavoriteStorage();
  return JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
}

export function getRecipeType(recipe) {
  return recipe.idDrink ? 'bebida' : 'comida';
}

export function mapRecipeToFavoriteModel(recipe) {
  let recipeMapped;
  console.log(recipe);
  if (getRecipeType(recipe) === 'comida') {
    recipeMapped = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
  } else {
    recipeMapped = {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
  }

  return recipeMapped;
}

export function saveRecipeOnFavorites(recipe) {
  const favoriteRecipes = getFavoriteRecipes();

  favoriteRecipes.push(recipe);

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}

export function removeRecipeOnFavorites(recipeId) {
  console.log(recipeId);
  const favoriteRecipes = getFavoriteRecipes();
  const updatedStorage = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);

  localStorage.setItem('favoriteRecipes', JSON.stringify(updatedStorage));
}
