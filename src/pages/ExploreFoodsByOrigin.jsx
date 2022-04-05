import React, { useContext, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import { fetchMealAreas, fetchMealByName, fetchMealsByArea } from '../services/mealAPI';
import useAPI from '../hooks/useAPI';
import RecipeCard from '../components/RecipeCard';

function ExploreFoodsByOrigin() {
  const { recipes: { foodList, setFoodList } } = useContext(RecipesContext);
  const [mealAreas, setMealAreas] = useState([]);

  const INICIAL_FOODLIST_LENGTH = 12;
  useAPI(fetchMealByName, setFoodList, '', INICIAL_FOODLIST_LENGTH);
  useAPI(fetchMealAreas, setMealAreas, '');

  async function getMealsFromAPI(fetchFunction, area) {
    const meals = await fetchFunction(area);
    setFoodList(meals);
  }
  function onAreaChange({ target: { value } }) {
    if (value === 'All') getMealsFromAPI(fetchMealByName, '');
    else getMealsFromAPI(fetchMealsByArea, value);
  }

  const renderDropdownAreas = () => (
    <select
      className="custom-select mt-4 mb-4 w-75"
      onChange={ onAreaChange }
      data-testid="explore-by-area-dropdown"
    >
      <option data-testid="All-option">All</option>
      {mealAreas.map(({ strArea }) => (
        <option
          key={ strArea }
          value={ strArea }
          data-testid={ `${strArea}-option` }
        >
          { strArea }
        </option>
      ))}
    </select>
  );

  const renderFoodCard = () => (
    foodList.slice(0, INICIAL_FOODLIST_LENGTH)
      .map((recipe, index) => (

        <RecipeCard
          key={ recipe.idMeal }
          id={ recipe.idMeal }
          name={ recipe.strMeal }
          image={ recipe.strMealThumb }
          index={ index }
          type="comidas"
        />
      ))
  );

  return (
    <>
      <Header pageTitle="Explorar Origem" hasSearch />
      <section>
        <Container>
          <Row className="justify-content-center">
            { renderDropdownAreas() }
          </Row>
          <Row>
            { renderFoodCard() }
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default ExploreFoodsByOrigin;
