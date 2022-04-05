import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import {
  createInProgressList,
  getRecipeProgress,
  toggleIngredient,
  toggleRecipeInProgress,
} from '../../helpers/inprogressHelper';

function renderIngredientList(ingredientList) {
  return (
    <ListGroup>
      {ingredientList.map(({ ingredient, index }) => (
        <ListGroup.Item
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ ingredient }
        >
          {ingredient}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

function renderIngredientSteps({
  ingredientList,
  recipeId,
  type,
  recipeProgress,
  setRecipeProgress,
}) {
  return (
    recipeProgress && (
      <Form>
        {ingredientList.map(({ ingredient, index }) => (
          <div key={ ingredient } data-testid={ `${index}-ingredient-step` }>
            <Form.Check
              type="checkbox"
              name={ ingredient }
              id={ ingredient }
              label={ ingredient }
              value={ ingredient }
              onClick={ () => {
                toggleIngredient(recipeId, ingredient, type);
                setRecipeProgress(getRecipeProgress(recipeId, type));
              } }
              defaultChecked={
                recipeProgress.includes(ingredient) ? 'checked' : undefined
              }
            />
          </div>
        ))}
      </Form>
    )
  );
}

function Ingredients({
  ingredientList,
  makingRecipe,
  type,
  recipeId,
  setIsFinishButtonDisabled,
}) {
  const [recipeProgress, setRecipeProgress] = useState([]);
  createInProgressList();

  useEffect(() => {
    toggleRecipeInProgress(recipeId, type);
    setRecipeProgress(getRecipeProgress(recipeId, type));
  }, [makingRecipe, recipeId, type]);

  useEffect(() => {
    if (recipeProgress.length === ingredientList.length) {
      setIsFinishButtonDisabled(false);
    } else {
      setIsFinishButtonDisabled(true);
    }
  }, [ingredientList.length, recipeProgress, recipeId, setIsFinishButtonDisabled]);

  return (
    <div className="mb-4">
      <h3 className="mb-3">Ingredientes</h3>
      {makingRecipe
        ? renderIngredientSteps({
          ingredientList,
          recipeId,
          type,
          recipeProgress,
          setRecipeProgress,
        })
        : renderIngredientList(ingredientList)}
    </div>
  );
}

Ingredients.propTypes = {
  ingredientList: PropTypes.arrayOf(PropTypes.shape({
    ingredient: PropTypes.string,
    index: PropTypes.number.isRequired,
  })).isRequired,
  makingRecipe: PropTypes.bool,
  recipeId: PropTypes.string.isRequired,
  setIsFinishButtonDisabled: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

Ingredients.defaultProps = {
  makingRecipe: false,
};

export default Ingredients;
