import React from 'react';
import easyRecipesLogo from '../images/easyRecipesLogo.png';

function LoginLogo() {
  return (
    <div className="LoginLogo">
      <img
        className="easyRecipes"
        src={ easyRecipesLogo }
        alt="Easy Recipes Logo"
      />

    </div>
  );
}

export default LoginLogo;
