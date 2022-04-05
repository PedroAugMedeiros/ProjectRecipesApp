import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';

function Header({ pageTitle, hasSearch, recipeType }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="Header">
      <Navbar className="justify-content-between">
        <Button variant="link">
          <Link to="/perfil">
            <img src={ profileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
          </Link>
        </Button>
        <Navbar.Brand data-testid="page-title">{ pageTitle }</Navbar.Brand>
        { hasSearch && (
          <Button
            variant="link"
            onClick={ () => setShowSearch(!showSearch) }
          >
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Profile Icon"
            />
          </Button>
        ) }
      </Navbar>
      { showSearch && <Search recipeType={ recipeType } /> }
    </header>
  );
}

Header.propTypes = {
  hasSearch: PropTypes.bool,
  pageTitle: PropTypes.string.isRequired,
  recipeType: PropTypes.string,
};

Header.defaultProps = {
  recipeType: '',
  hasSearch: false,
};

export default Header;
