import PropTypes from 'prop-types';
import React from 'react';
import RecommendationCard from './RecommendationCard';

const MAX_LENGHT = 6;

function Recommended({ recipes, type }) {
  return (
    <div className="mb-6">
      <h3>Recomendadas</h3>
      <div className="d-flex" style={ { overflowX: 'scroll' } }>
        {recipes.length
          && recipes.slice(0, MAX_LENGHT).map((recipe, index) => {
            if (type === 'meals') {
              const { strMeal, strMealThumb, strCategory, idMeal } = recipe;
              return (<RecommendationCard
                name={ strMeal }
                image={ strMealThumb }
                category={ strCategory }
                id={ idMeal }
                key={ idMeal }
                type="comidas"
                index={ index }
              />);
            }

            const { strDrink, strDrinkThumb, strCategory, idDrink } = recipe;
            return (<RecommendationCard
              name={ strDrink }
              image={ strDrinkThumb }
              category={ strCategory }
              id={ idDrink }
              key={ idDrink }
              type="bebidas"
              index={ index }
            />);
          })}
      </div>
    </div>
  );
}

Recommended.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    strCategory: PropTypes.string,
    length: PropTypes.func,
    slice: PropTypes.func,
  })).isRequired,
  type: PropTypes.string.isRequired,
};

export default Recommended;
