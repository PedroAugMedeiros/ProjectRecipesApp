import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function FinishRecipeBtn({ to, isFinishButtonDisabled }) {
  const history = useHistory();

  return (
    <Button
      to={ `${to}/in-progress` }
      data-testid="finish-recipe-btn"
      className="btn btn-primary fixed-bottom btn-block pb-3"
      onClick={ () => history.push('/explorar/comidas') }
      disabled={ isFinishButtonDisabled }
    >
      Finalizar receita
    </Button>
  );
}

FinishRecipeBtn.propTypes = {
  isFinishButtonDisabled: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
};

export default FinishRecipeBtn;
