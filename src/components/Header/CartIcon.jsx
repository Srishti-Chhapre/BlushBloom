import { ShoppingCart } from 'lucide-react';

const CartIcon = () => {
  const cartItemCount = 0; // Replace this with dynamic data later

  return (
    <div className="relative cursor-pointer">
      <ShoppingCart size={24} />
      <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cartItemCount}
      </span>
    </div>
  );
};

export default CartIcon;
