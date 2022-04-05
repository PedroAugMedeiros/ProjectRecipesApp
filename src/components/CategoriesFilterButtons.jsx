import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonToolbar,
} from 'react-bootstrap';
import RecipesContext from '../context/RecipesContext';
import { fetchMealByName, fetchMealsByCategories } from '../services/mealAPI';
import { fetchDrinkByName, fetchDrinksByCategories } from '../services/cocktailAPI';

function CategoriesFilterButtons({ categoryList, recipeType }) {
  const { recipes } = useContext(RecipesContext);

  const {
    setRecipeIngredients,
    setFoodList,
    setDrinkList,
  } = recipes;
  async function getRecipesByCategory(categoryName) {
    let recipeList;
    switch (recipeType) {
    case 'food':
      recipeList = await fetchMealsByCategories(categoryName);
      setFoodList(recipeList);
      break;

    case 'drink':
      recipeList = await fetchDrinksByCategories(categoryName);
      setDrinkList(recipeList);
      break;

    default:
      break;
    }
  }

  async function getAllRecipes(fetchFunction, setState) {
    const recipeList = await fetchFunction('');
    setState(recipeList);
  }

  function handleButtonAllClick() {
    if (recipeType === 'food') getAllRecipes(fetchMealByName, setFoodList);
    else getAllRecipes(fetchDrinkByName, setDrinkList);
    setRecipeIngredients([]);
  }

  function handleCategoriesButtonClick({ target: { name, classList } }) {
    if (classList.contains('selected')) {
      handleButtonAllClick();
    } else getRecipesByCategory(name);

    classList.toggle('selected');
    setRecipeIngredients([]);
  }

  return (
    <ButtonToolbar className="justify-content-center my-2" aria-label="Category Filter">

      <Button
        variant="secondary"
        data-testid="All-category-filter"
        className="mx-1 my-1"
        onClick={ handleButtonAllClick }
      >
        All
      </Button>
      { categoryList.map((category, index) => (
        <Button
          key={ index }
          variant="secondary"
          className="mx-1 my-1"
          data-testid={ `${category.strCategory}-category-filter` }
          name={ category.strCategory }
          onClick={ handleCategoriesButtonClick }
        >
          {category.strCategory}
        </Button>
      ))}
    </ButtonToolbar>

  );
}

CategoriesFilterButtons.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.any).isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default CategoriesFilterButtons;
