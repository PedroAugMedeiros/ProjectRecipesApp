import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Image,
} from 'react-bootstrap';
import copy from 'clipboard-copy';
import shareBtnImg from '../../images/shareIcon.svg';
import FavoriteBtn from '../FavoriteBtn';
import RecipesContext from '../../context/RecipesContext';
import { mapRecipeToFavoriteModel } from '../../helpers/favoritesHelper';

const SHARE_TIMEOUT_MS = 5000;

function Hero({ thumb, title, category, alcoholic }) {
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const { details: { recipeDetails } } = useContext(RecipesContext);

  function handleShare() {
    setShowCopyMsg(true);
    copy(window.location.href.replace('/in-progress', ''));
    setTimeout(() => {
      setShowCopyMsg(false);
    }, SHARE_TIMEOUT_MS);
  }

  return (
    <div className="py-2">
      <div className="my-2 d-flex justify-content-center">
        <Image
          className="rounded-circle"
          data-testid="recipe-photo"
          src={ thumb }
          alt={ title }
          style={ { width: '60vw' } }
          thumbnail
        />
      </div>
      <div>
        <div>
          <h2 className="text-center" data-testid="recipe-title">{title}</h2>
          <h3
            className="text-center"
            data-testid="recipe-category"
          >
            {`${alcoholic} ${category}`}

          </h3>
        </div>
        <ButtonToolbar className="justify-content-center my-4">
          <Button
            variant="light"
            data-testid="share-btn"
            onClick={ () => {
              handleShare();
            } }
          >
            {
              // Ideia de substuir o texto do botão ao compartilhar:
              // https://github.com/tryber/sd-015-b-project-recipes-app/pull/264
            }
            {showCopyMsg ? 'Link copiado!' : <Image src={ shareBtnImg } />}
          </Button>
          <FavoriteBtn recipe={ mapRecipeToFavoriteModel(recipeDetails[0]) } />
        </ButtonToolbar>
      </div>
    </div>
  );
}

Hero.propTypes = {
  alcoholic: PropTypes.string,
  category: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Hero.defaultProps = {
  alcoholic: '',
};

export default Hero;
