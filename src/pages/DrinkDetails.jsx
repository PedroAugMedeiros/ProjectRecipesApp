import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
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
import { fetchDrinkById, fetchRecommendedMeals } from '../services/cocktailAPI';

function DrinkDetails({ makingRecipe }) {
  const { details: { recipeDetails, setRecipeDetails } } = useContext(RecipesContext);
  const [isFinishButtonDisabled, setIsFinishButtonDisabled] = useState(true);
  const { drinkId } = useParams();
  const { pathname } = useLocation();
  const { recipes:
     { recommendedFoods, setRecommendedFoods },
  } = useContext(RecipesContext);
  const isInProgress = isRecipeInProgress(drinkId, 'cocktails');
  useEffect(() => {
    fetchDrinkById(drinkId).then((recipe) => setRecipeDetails(recipe));
    fetchRecommendedMeals().then((meals) => setRecommendedFoods(meals));
    window.scrollTo(0, 0);
  }, [drinkId, setRecipeDetails, setRecommendedFoods]);

  const recipe = recipeDetails ? recipeDetails[0] : null;
  const ingredientList = mapIngredientList(recipe);
  const { strDrink,
    strCategory, strDrinkThumb,
    strInstructions,
    strAlcoholic,
  } = recipe || {};

  return (
    <div className="container">
      {recipe && (
        <>
          <Hero
            thumb={ strDrinkThumb }
            alcoholic={ strAlcoholic }
            category={ strCategory }
            title={ strDrink }
            recipe={ recipeDetails }
          />
          <Ingredients
            ingredientList={ ingredientList }
            makingRecipe={ makingRecipe }
            type="cocktails"
            recipeId={ drinkId }
            setIsFinishButtonDisabled={ setIsFinishButtonDisabled }
          />
          <Instructions instructions={ strInstructions } />
          { !makingRecipe && <Recommended type="meals" recipes={ recommendedFoods } /> }
          { !makingRecipe ? (
            <StartRecipeButton
              to={ pathname }
              isInProgress={ isInProgress }
            />
          ) : <FinishRecipeBtn isFinishButtonDisabled={ isFinishButtonDisabled } /> }
        </>
      )}
    </div>
  );
}

DrinkDetails.propTypes = {
  makingRecipe: PropTypes.bool,
};

DrinkDetails.defaultProps = {
  makingRecipe: false,
};

export default DrinkDetails;
