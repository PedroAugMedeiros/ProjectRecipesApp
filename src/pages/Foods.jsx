import React, { useContext } from 'react';
import { CardGroup, Container } from 'react-bootstrap';
import CategoriesFilterButtons from '../components/CategoriesFilterButtons';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import useAPI from '../hooks/useAPI';
import { fetchMealByName, fetchMealsCategories } from '../services/mealAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods() {
  const { recipes } = useContext(RecipesContext);

  const {
    recipeIngredients,
    foodList,
    foodCategories,
    setFoodList,
    setFoodCategories,
  } = recipes;

  const INICIAL_FOODLIST_LENGTH = 12;
  const INICIAL_FOODCATEGORIES_LENGTH = 5;

  useAPI(fetchMealByName, setFoodList, '', INICIAL_FOODLIST_LENGTH);
  useAPI(fetchMealsCategories, setFoodCategories, '', INICIAL_FOODCATEGORIES_LENGTH);

  const renderFoodCard = () => {
    let list = [];
    if (recipeIngredients.length > 0) {
      list = recipeIngredients.slice(0, INICIAL_FOODLIST_LENGTH);
    } else if (foodList) {
      list = foodList.slice(0, INICIAL_FOODLIST_LENGTH);
    }
    return (
      <CardGroup className="d-flex flex-wrap justify-content-center mt-2 mb-6">
        { list.map((recipe, index) => (
          <RecipeCard
            key={ recipe.idMeal }
            id={ recipe.idMeal }
            name={ recipe.strMeal }
            image={ recipe.strMealThumb }
            index={ index }
            type="comidas"
          />
        ))}
      </CardGroup>

    );
  };

  const renderFoodCategories = () => (
    <CategoriesFilterButtons categoryList={ foodCategories } recipeType="food" />
  );

  return (
    <>
      <Header pageTitle="Comidas" hasSearch recipeType="food" />
      <section>
        <Container>
          { renderFoodCategories() }
          { renderFoodCard() }
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Foods;
