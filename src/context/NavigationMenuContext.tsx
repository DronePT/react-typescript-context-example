import React, { useState } from "react";

export interface NavigationMenuContext {
  isOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

const {
  Provider,
  Consumer
} = React.createContext<NavigationMenuContext | null>(null);

export const NavigationMenuContextConsumer = Consumer;

export const NavigationMenuContextProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    isOpen,
    toggleMenu: () => setIsOpen(!isOpen),
    openMenu: () => setIsOpen(true),
    closeMenu: () => setIsOpen(false)
  };

  return <Provider value={value}>{children}</Provider>;
};

/**
 * Higher-Order Component
 */
export const withNavigationMenuContext = <
  P extends { navigationMenuContext?: NavigationMenuContext },
>(
  Component: React.ComponentClass<P> | React.StatelessComponent<P>
): React.FC<P> => {
  return (props: P) => (
    <NavigationMenuContextConsumer>
      {navigationMenuContext =>
        navigationMenuContext && (
          <Component {...props} navigationMenuContext={navigationMenuContext} />
        )
      }
    </NavigationMenuContextConsumer>
  );
};
