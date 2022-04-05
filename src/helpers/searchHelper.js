import { fetchDrinksByFirstLetter } from '../services/cocktailAPI';
import { fetchMealsByFirstLetter } from '../services/mealAPI';

export function validateFirstLetterSearch(searchTerm, fetchCallback) {
  const isFirstLetterSearch = fetchCallback === fetchMealsByFirstLetter
    || fetchCallback === fetchDrinksByFirstLetter;
  if (isFirstLetterSearch && searchTerm.length !== 1) {
    global.alert('Sua busca deve conter somente 1 (um) caracter');
  }
}

export function validateEmptyList(recipeList) {
  if (!recipeList) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }
}
export function getFilteredPageData(isFood, foodData, drinkData) {
  const { foodList, setFoodList } = foodData;
  const { drinkList, setDrinkList } = drinkData;
  const recipeTypeData = isFood ? {
    RECIPE_DETAILS_ENDPOINT: '/comidas/',
    recipeList: foodList,
    setRecipeList: setFoodList,
    getFirstId: () => {
      if (foodList) {
        return foodList.length ? foodList[0].idMeal : 0;
      }
    },
  } : {
    RECIPE_DETAILS_ENDPOINT: '/bebidas/',
    recipeList: drinkList,
    setRecipeList: setDrinkList,
    getFirstId: () => {
      if (drinkList) {
        return drinkList.length ? drinkList[0].idDrink : 0;
      }
    },
  };
  return recipeTypeData;
}
