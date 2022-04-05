import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RecommendationCard(props) {
  const { name, image, index, id, category, type } = props;
  return (
    <Link
      to={ `/${type}/${id}` }
      key={ id }
    >
      <Card
        id={ id }
        style={ { width: '10rem' } }
        data-testid={ `${index}-recomendation-card` }
        className="mx-4"
      >
        <Card.Img
          variant="top"
          src={ image }
          data-testid={ `${index}-card-img` }
        />
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">{ category }</Card.Subtitle>
          <Card.Title data-testid={ `${index}-recomendation-title` }>
            { name }
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}

RecommendationCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecommendationCard;
