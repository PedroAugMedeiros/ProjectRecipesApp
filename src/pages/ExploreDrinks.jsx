import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinkRandom } from '../services/cocktailAPI';

function ExploreDrinks() {
  const history = useHistory();

  async function getDrinkRandom() {
    const drinkArray = await fetchDrinkRandom();
    const { idDrink } = drinkArray[0];
    const path = `/bebidas/${idDrink}`;
    history.push(path);
  }
  return (
    <>
      <Header pageTitle="Explorar Bebidas" />
      <div className="d-flex flex-column align-items-center mt-4">
        <Button
          className="w-75 mb-2 mt-4"
          size="lg"
          variant="secondary"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        >
          Por Ingredientes
        </Button>

        <Button
          className="w-75 mb-2"
          size="lg"
          variant="secondary"
          data-testid="explore-surprise"
          onClick={ () => getDrinkRandom() }
        >
          Me Surpreenda!
        </Button>
      </div>
      <Footer />
    </>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default ExploreDrinks;
