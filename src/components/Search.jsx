import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import { validateFirstLetterSearch,
  validateEmptyList,
  getFilteredPageData } from '../helpers/searchHelper';

import {
  fetchDrinksByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinkByName,
} from '../services/cocktailAPI';

import {
  fetchMealByName,
  fetchMealsByIngredient,
  fetchMealsByFirstLetter,
} from '../services/mealAPI';

function Search({ recipeType }) {
  const {
    recipes: { setFoodList, setDrinkList, foodList, drinkList },
  } = useContext(RecipesContext);

  const isFood = recipeType === 'food';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState({
    fetchCallback: isFood ? fetchMealByName : fetchDrinkByName,
  });

  const pageData = getFilteredPageData(isFood,
    { foodList, setFoodList },
    { drinkList, setDrinkList });

  const { RECIPE_DETAILS_ENDPOINT, recipeList, setRecipeList, getFirstId } = pageData;

  const isSingleRecipe = recipeList && recipeList.length === 1;
  function onChangeFilter(fetchCallback) {
    setSearchFilter({ fetchCallback });
  }

  function onChangeSearchBar({ target: { value } }) {
    setSearchTerm(value);
  }

  async function searchRecipe(e) {
    e.preventDefault();
    const { fetchCallback } = searchFilter;
    validateFirstLetterSearch(searchTerm, fetchCallback);
    const recipes = await fetchCallback(searchTerm);
    validateEmptyList(recipes);
    setRecipeList(recipes);
  }

  return (
    <Container>
      <Form onSubmit={ searchRecipe } className="d-flex flex-column">
        <Form.Group>
          <Form.Control
            onChange={ onChangeSearchBar }
            data-testid="search-input"
            placeholder="Pesquisar receita..."
            className="mt-3"
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-around">
          <Form.Check
            type="radio"
            label="Ingrediente"
            className="filter-radio"
            name="filter"
            id="ingredient-radio"
            data-testid="ingredient-search-radio"
            onChange={ () => onChangeFilter(
              isFood ? fetchMealsByIngredient : fetchDrinksByIngredient,
            ) }
          />
          <Form.Check
            type="radio"
            label="Nome"
            name="filter"
            id="name-radio"
            data-testid="name-search-radio"
            onChange={ () => onChangeFilter(isFood ? fetchMealByName : fetchDrinkByName) }
          />
          <Form.Check
            type="radio"
            label="Primeira letra"
            name="filter"
            id="first-letter-radio"
            data-testid="first-letter-search-radio"
            onChange={ () => onChangeFilter(
              isFood ? fetchMealsByFirstLetter : fetchDrinksByFirstLetter,
            ) }
          />
        </Form.Group>
        <Button className="mx-auto mb-3 px-4" type="submit" data-testid="exec-search-btn">
          Buscar
        </Button>
        {isSingleRecipe && (
          <Redirect
            to={ `${RECIPE_DETAILS_ENDPOINT}${getFirstId()}` }
          />
        )}
      </Form>
    </Container>
  );
}

Search.propTypes = {
  recipeType: PropTypes.string,
};

Search.defaultProps = {
  recipeType: '',
};

export default Search;
