import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom"

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as CrwLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer, LogoContainer, Navlinks, NavLink } from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwLogo className='logo' />
        </LogoContainer>
        <Navlinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
              ) : (
              <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </Navlinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;