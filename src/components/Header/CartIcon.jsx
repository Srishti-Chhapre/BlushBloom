// CartIcon.jsx
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../ContextAPI/CartContext';
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
      <ShoppingCart size={24} />
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
