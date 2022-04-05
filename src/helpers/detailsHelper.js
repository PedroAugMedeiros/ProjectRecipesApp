export default function mapIngredientList(recipe) {
  if (recipe) {
    const MIN_LENGHT = 1;
    const MAX_LENGHT = 20;
    const updatedIngredientList = [];

    for (let i = MIN_LENGHT; i <= MAX_LENGHT; i += 1) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient) {
        updatedIngredientList.push({
          ingredient: `${ingredient} - ${measure}`,
          index: i - 1,
        });
      }
    }
    return updatedIngredientList;
  }
}
