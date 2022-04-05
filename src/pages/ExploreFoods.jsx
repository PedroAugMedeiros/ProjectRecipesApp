import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchMealRandom } from '../services/mealAPI';

function ExploreMeals() {
  const history = useHistory();

  async function getMealRandom() {
    const mealArray = await fetchMealRandom();
    const { idMeal } = mealArray[0];
    history.push(`/comidas/${idMeal}`);
  }
  return (
    <div>
      <Header pageTitle="Explorar Comidas" />
      <div className="d-flex flex-column align-items-center mt-4">

        <Button
          className="w-75 mb-2 mt-4"
          size="lg"
          variant="secondary"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/comidas/ingredientes') }
        >
          Por Ingredientes
        </Button>

        <Button
          className="w-75 mb-2"
          size="lg"
          variant="secondary"
          onClick={ () => history.push('/explorar/comidas/area') }
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </Button>

        <Button
          className="w-75 mb-2"
          size="lg"
          variant="secondary"
          data-testid="explore-surprise"
          onClick={ () => getMealRandom() }
        >
          Me Surpreenda!

        </Button>
      </div>
      <Footer />
    </div>
  );
}

ExploreMeals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default ExploreMeals;
