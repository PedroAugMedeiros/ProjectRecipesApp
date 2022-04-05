import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function StartRecipeButton({ to, isInProgress }) {
  return (
    <Link
      to={ `${to}/in-progress` }
      data-testid="start-recipe-btn"
      className="btn btn-primary fixed-bottom btn-block pb-3"
    >
      { isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
    </Link>
  );
}

StartRecipeButton.propTypes = {
  isInProgress: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
};

export default StartRecipeButton;
