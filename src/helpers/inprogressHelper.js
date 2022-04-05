const PROGRESS_STORAGE = 'inProgressRecipes';

export function createInProgressList() {
  const list = localStorage.getItem(PROGRESS_STORAGE);
  if (!list) {
    localStorage.setItem(PROGRESS_STORAGE, JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }
}

export function getProgressStorage() {
  createInProgressList();
  return JSON.parse(localStorage.getItem(PROGRESS_STORAGE));
}

export function getRecipeProgress(recipeId, recipeType) {
  const progressList = getProgressStorage();
  const updatedProgressList = { ...progressList };
  return updatedProgressList[recipeType][recipeId];
}

export function toggleRecipeInProgress(recipeId, recipeType) {
  const progressList = getProgressStorage();
  const updatedProgressList = { ...progressList };
  const recipeProgress = updatedProgressList[recipeType][recipeId];
  if (!recipeProgress) {
    updatedProgressList[recipeType][recipeId] = [];
    localStorage.setItem(PROGRESS_STORAGE, JSON.stringify(updatedProgressList));
  }
}

export function isRecipeInProgress(recipeId, recipeType) {
  const progressList = getProgressStorage();

  const progressListIDS = Object.keys(progressList[recipeType]);
  const isInProgress = progressListIDS.includes(recipeId);
  return isInProgress;
}

export function toggleIngredient(recipeId, ingredient, recipeType) {
  const progressList = getProgressStorage();
  const updatedProgressList = { ...progressList };

  if (updatedProgressList[recipeType][recipeId].includes(ingredient)) {
    updatedProgressList[recipeType][recipeId] = updatedProgressList[recipeType][recipeId]
      .filter((i) => i !== ingredient);
  } else {
    updatedProgressList[recipeType][recipeId].push(ingredient);
  }

  localStorage.setItem(PROGRESS_STORAGE, JSON.stringify(updatedProgressList));
}

export function isIngredientChecked(recipeId, ingredient, recipeType) {
  const progressList = getProgressStorage();
  const updatedProgressList = { ...progressList };
  const isChecked = updatedProgressList[recipeType][recipeId].includes(ingredient);
  return isChecked;
}
