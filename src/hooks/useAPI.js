import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

function useAPI(fetchFunction, setState, searchName, resultLength) {
  const { recipes } = useContext(RecipesContext);

  const {
    setRecipeIngredients,
  } = recipes;
  useEffect(() => {
    async function getList() {
      const results = await fetchFunction(searchName);
      if (results) {
        if (resultLength && results.length > resultLength) {
          results.length = resultLength;
        }
        setState(results);
      } else {
        setState([]);
      }
    }

    getList();
    return () => {
      setRecipeIngredients([]);
    };
  }, [fetchFunction, setState, searchName, resultLength, setRecipeIngredients]);
}

export default useAPI;
