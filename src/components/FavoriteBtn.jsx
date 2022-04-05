import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import favoriteWhiteBtnIcon from '../images/whiteHeartIcon.svg';
import favoriteBlackBtnIcon from '../images/blackHeartIcon.svg';
import {
  getFavoriteRecipes,
  removeRecipeOnFavorites,
  saveRecipeOnFavorites } from '../helpers/favoritesHelper';

function FavoriteBtn({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(true);

  useEffect(() => {
    const favoriteRecipes = getFavoriteRecipes();
    const isRecipeFavorite = favoriteRecipes
      .some((favRecipe) => favRecipe.id === recipe.id);
    setIsFavorite(isRecipeFavorite);
  }, [isFavorite, recipe]);

  return (
    <Button
      variant="light"
      type="button"
      onClick={ () => {
        setIsFavorite(!isFavorite);
        if (isFavorite) {
          removeRecipeOnFavorites(recipe.id);
        } else {
          saveRecipeOnFavorites(recipe);
        }
      } }
    >
      <img
        src={ isFavorite ? favoriteBlackBtnIcon : favoriteWhiteBtnIcon }
        alt="Favorite Button"
        data-testid="favorite-btn"
      />
    </Button>
  );
}

FavoriteBtn.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

export default FavoriteBtn;
