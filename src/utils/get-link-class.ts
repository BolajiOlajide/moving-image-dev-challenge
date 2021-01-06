const getLinkClass = (route: string, pathname: string): string => {
  const isCurrentRoute = pathname === route;

  return `navLink${isCurrentRoute ? ' active' : ''}`;
};

export default getLinkClass;