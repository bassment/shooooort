export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('linksState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('linksState', serializedState);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    // log error after serializing state
    return undefined;
  }
};

export const clearState = () => {
  localStorage.removeItem('linksState');
};
