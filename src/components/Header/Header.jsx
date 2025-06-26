import Logo from './Logo';
import NavLinks from './NavLinks';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';

const Header = () =>{
return(
   <header className="flex items-center justify-between p-4 shadow-lg h-16">
      <div className="flex items-center space-x-8">
        <Logo />
        <NavLinks />
      </div>
      <SearchBar />
      <div className="flex items-center space-x-6">
        <CartIcon />
        <UserMenu />
      </div>
    </header>
)
}
export default Header;