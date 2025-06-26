import { Link } from 'react-router-dom';

const NavLinks = () => {
  return (
    <nav className="flex space-x-6 text-gray-700 font-medium">
      <Link to="/" className='hover:text-pink-800'>Home</Link>
      <Link to="/categories" className='hover:text-pink-800'>Categories</Link>
      <Link to="/about" className='hover:text-pink-800'>About Us</Link>
      <Link to="/contact" className='hover:text-pink-800'>Contact Us</Link>
    </nav>
  );
};

export default NavLinks;
