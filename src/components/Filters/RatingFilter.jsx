const RatingFilter = () => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Rating</h3>
      <ul className="space-y-1 text-sm">
        <li><input type="checkbox" className="mr-2" /> ⭐ 4 & above</li>
        <li><input type="checkbox" className="mr-2" /> ⭐ 3 & above</li>
        <li><input type="checkbox" className="mr-2" /> ⭐ 2 & above</li>
      </ul>
    </div>
  );
};

export default RatingFilter;
