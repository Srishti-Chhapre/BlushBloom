const PriceFilter = () => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Price</h3>
      <input type="range" min="100" max="5000" className="w-full" />
    </div>
  );
};

export default PriceFilter;
