import PropTypes from 'prop-types';
import React from 'react';
import { Card, Col } from 'react-bootstrap';

function IngredientCard(props) {
  const { name, img, index } = props;

  return (
    <Col>
      <Card
        style={ { width: '10rem' } }
        className="recomendation"
        data-testid={ `${index}-ingredient-card` }
      >
        <Card.Img
          data-testid={ `${index}-card-img` }
          src={ img }
        />
        <Card.Body>
          <Card.Title data-testid={ `${index}-card-name` }>
            { name }
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default IngredientCard;
