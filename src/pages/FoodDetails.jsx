import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router';
import FinishRecipeBtn from '../components/DetailsPage/FinishRecipeBtn';
import Hero from '../components/DetailsPage/Hero';
import Ingredients from '../components/DetailsPage/Ingredients';
import Instructions from '../components/DetailsPage/Instructions';
import Recommended from '../components/DetailsPage/Recommended';
import StartRecipeButton from '../components/DetailsPage/StartRecipeButton';
import RecipesContext from '../context/RecipesContext';
import mapIngredientList from '../helpers/detailsHelper';
import { isRecipeInProgress } from '../helpers/inprogressHelper';
import { fetchMealByID, fetchRecommendedDrinks } from '../services/mealAPI';

function FoodDetails({ makingRecipe }) {
  const { details: { recipeDetails, setRecipeDetails } } = useContext(RecipesContext);
  const [isFinishButtonDisabled, setIsFinishButtonDisabled] = useState(true);
  const { recipeId } = useParams();
  const { pathname } = useLocation();
  const { recipes:
     { recommendedDrinks, setRecommendedDrinks },
  } = useContext(RecipesContext);
  const isInProgress = isRecipeInProgress(recipeId, 'meals');

  useEffect(() => {
    fetchMealByID(recipeId).then((recipe) => setRecipeDetails(recipe));
    fetchRecommendedDrinks().then((meals) => setRecommendedDrinks(meals));
    window.scrollTo(0, 0);
  }, [recipeId, setRecipeDetails, setRecommendedDrinks]);

  const recipe = recipeDetails ? recipeDetails[0] : null;
  const ingredientList = mapIngredientList(recipe);
  const { strMeal,
    strCategory, strMealThumb,
    strInstructions,
    strYoutube,
  } = recipe || {};

  return (
    <Container className="py-6">
      {recipe && (
        <>
          <Hero thumb={ strMealThumb } category={ strCategory } title={ strMeal } />
          <Ingredients
            ingredientList={ ingredientList }
            makingRecipe={ makingRecipe }
            type="meals"
            recipeId={ recipeId }
            setIsFinishButtonDisabled={ setIsFinishButtonDisabled }
          />
          <Instructions instructions={ strInstructions } />
          { !makingRecipe && (
            <div className="embed-responsive embed-responsive-16by9 my-4">
              <iframe
                className="embed-responsive-item"
                src={ strYoutube.replace('watch?v=', 'embed/') }
                title={ `${strMeal} Video` }
                data-testid="video"
              />
            </div>
          ) }
          { !makingRecipe && <Recommended type="drinks" recipes={ recommendedDrinks } /> }
          { !makingRecipe ? (
            <StartRecipeButton
              to={ pathname }
              isInProgress={ isInProgress }
            />
          ) : <FinishRecipeBtn isFinishButtonDisabled={ isFinishButtonDisabled } /> }
        </>
      )}
    </Container>
  );
}

FoodDetails.propTypes = {
  makingRecipe: PropTypes.bool,
};

FoodDetails.defaultProps = {
  makingRecipe: false,
};

export default FoodDetails;
