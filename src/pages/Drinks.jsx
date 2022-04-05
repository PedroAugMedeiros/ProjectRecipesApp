import React, { useContext } from 'react';
import { CardGroup, Container, Row } from 'react-bootstrap';
import CategoriesFilterButtons from '../components/CategoriesFilterButtons';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import useAPI from '../hooks/useAPI';
import { fetchDrinkByName, fetchDrinksCategories } from '../services/cocktailAPI';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const { recipes } = useContext(RecipesContext);

  const {
    recipeIngredients,
    drinkList,
    drinkCategories,
    setDrinkList,
    setDrinkCategories,
  } = recipes;

  const INICIAL_DRINKLIST_LENGTH = 12;
  const INICIAL_DRINKCATEGORIES_LENGTH = 5;

  useAPI(fetchDrinkByName, setDrinkList, '', INICIAL_DRINKLIST_LENGTH);
  useAPI(fetchDrinksCategories, setDrinkCategories, '', INICIAL_DRINKCATEGORIES_LENGTH);

  const renderDrinkCard = () => {
    let list = [];
    if (recipeIngredients.length > 0) {
      list = recipeIngredients.slice(0, INICIAL_DRINKLIST_LENGTH);
    } else if (drinkList) {
      list = drinkList.slice(0, INICIAL_DRINKLIST_LENGTH);
    }
    return (
      <CardGroup className="d-flex flex-wrap justify-content-center mt-2 mb-6">
        { list.map((recipe, index) => (
          <RecipeCard
            key={ recipe.idDrink }
            id={ recipe.idDrink }
            name={ recipe.strDrink }
            image={ recipe.strDrinkThumb }
            index={ index }
            type="comidas"
          />
        ))}
      </CardGroup>
    );
  };

  const renderDrinkCategories = () => (
    <CategoriesFilterButtons categoryList={ drinkCategories } recipeType="drink" />
  );

  return (
    <>
      <Header pageTitle="Bebidas" hasSearch recipeType="drink" />
      <section>
        {renderDrinkCategories()}
        <Container>
          <Row className="justify-content-center">
            { renderDrinkCard() }
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Drinks;
