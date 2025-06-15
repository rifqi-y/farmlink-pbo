export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role?.name === 'Admin';
};

export const isCustomer = () => {
  const user = getCurrentUser();
  return user?.role?.name === 'Customer';
};

export const logout = () => {
  localStorage.removeItem('user');
};
