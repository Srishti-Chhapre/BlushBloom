import CategoryFilter from '../Filters/CategoryFilter';
import PriceFilter from '../Filters/PriceFilter';
import RatingFilter from '../Filters/RatingFilter';
import SellerFilter from '../Filters/SellerFilter';

const SidebarFilter = () => {
  return (
    <aside className="w-1/4 bg-pink-50 p-4 rounded-lg shadow sticky top-0 h-fit">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <CategoryFilter />
      <PriceFilter />
      <RatingFilter />
      <SellerFilter />
    </aside>
  );
};

export default SidebarFilter;
