import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Container, Row } from 'react-bootstrap';
import IngredientCard from '../components/IngredientCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { fetchMealsByIngredient, fetchMealsIngredients } from '../services/mealAPI';
import { fetchDrinksByIngredient, fetchDrinksIngredients } from '../services/cocktailAPI';

function ExploreByIngredients() {
  const { recipes } = useContext(RecipesContext);

  const {
    setRecipeIngredients,
  } = recipes;
  const [ingredientsMeals, setIngredientesMeals] = useState();
  const [ingredientsDrinks, setIngredientsDrinks] = useState();
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const validation = ingredientsDrinks || ingredientsMeals;

  async function setRecipeMeal(ingredient) {
    const meals = await fetchMealsByIngredient(ingredient);
    setRecipeIngredients(meals);
    history.push('/comidas');
  }

  async function setRecipeDrink(ingredient) {
    const drinks = await fetchDrinksByIngredient(ingredient);
    setRecipeIngredients(drinks);
    history.push('/bebidas');
  }

  useEffect(() => {
    async function getAllIngredients() {
      if (pathname.includes('/explorar/comidas')) {
        const meals = await fetchMealsIngredients();
        setIngredientesMeals(meals);
      }
      if (pathname.includes('/explorar/bebidas')) {
        const drinks = await fetchDrinksIngredients();
        setIngredientsDrinks(drinks);
      }
    }
    getAllIngredients();
  }, [pathname]);

  function showIngredients() {
    const MAX_MEALS = 12;
    if (pathname.includes('/explorar/comidas')) {
      return (
        <Container>
          <Row>
            { ingredientsMeals.map(({ strIngredient }, index) => (
              index < MAX_MEALS
              && (
                <button
                  key={ index }
                  type="button"
                  style={ { border: 'none' } }
                  onClick={ () => setRecipeMeal(strIngredient) }
                >
                  <IngredientCard
                    name={ strIngredient }
                    index={ index }
                    img={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  />
                </button>
              )
            )) }
          </Row>
        </Container>
      );
    }
    if (pathname.includes('/explorar/bebidas')) {
      return (
        <section>
          { ingredientsDrinks.map(({ strIngredient1 }, index) => (
            index < MAX_MEALS
            && (
              <button
                key={ index }
                type="button"
                style={ { border: 'none' } }
                onClick={ () => setRecipeDrink(strIngredient1) }
              >
                <IngredientCard
                  name={ strIngredient1 }
                  index={ index }
                  img={
                    `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`
                  }
                />
              </button>
            )
          )) }
        </section>
      );
    }
  }

  return (
    <section>
      <Header pageTitle="Explorar Ingredientes" />
      { validation && showIngredients() }
      <Footer />
    </section>
  );
}

export default ExploreByIngredients;
