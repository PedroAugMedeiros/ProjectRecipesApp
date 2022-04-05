import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorer() {
  const history = useHistory();

  return (
    <>
      <Header pageTitle="Explorar" />
      <div className="d-flex flex-column align-items-center mt-4">
        <Button
          className="w-75 mb-2 mt-4"
          size="lg"
          variant="secondary"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </Button>

        <Button
          className="w-75 mb-2"
          size="lg"
          variant="secondary"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </Button>

      </div>
      <Footer />
    </>
  );
}

export default Explorer;
