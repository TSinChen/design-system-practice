export const showError = (error: string) => {
  throw new Error(`Design System: ${error}`);
};

export const showWarning = (warning: string) => {
  console.warn(`Design System: ${warning}`);
};
