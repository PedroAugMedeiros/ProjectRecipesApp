import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../App.css';

function Footer() {
  return (
    <div data-testid="footer" className="Footer">
      <Link src={ drinkIcon } to="/bebidas" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="drinks" />
      </Link>
      <Link src={ mealIcon } to="/comidas" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="meal icon" />
      </Link>
      <Link src={ exploreIcon } to="/explorar" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="explore icon" />
      </Link>
    </div>
  );
}
export default Footer;
