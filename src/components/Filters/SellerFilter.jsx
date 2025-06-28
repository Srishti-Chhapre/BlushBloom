const SellerFilter = () => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Seller</h3>
      <ul className="space-y-1 text-sm">
        <li><input type="checkbox" className="mr-2" /> Fresh Flora</li>
        <li><input type="checkbox" className="mr-2" /> Blossom Mart</li>
        <li><input type="checkbox" className="mr-2" /> Bloom World</li>
      </ul>
    </div>
  );
};

export default SellerFilter;
