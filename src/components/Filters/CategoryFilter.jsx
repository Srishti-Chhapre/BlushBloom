const CategoryFilter = () => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Category</h3>
      <ul className="space-y-1 text-sm">
        <li><input type="checkbox" className="mr-2" /> Worship</li>
        <li><input type="checkbox" className="mr-2" /> Birthday</li>
        <li><input type="checkbox" className="mr-2" /> Anniversary</li>
        <li><input type="checkbox" className="mr-2" /> Marriage</li>
        <li><input type="checkbox" className="mr-2" /> Party</li>
        <li><input type="checkbox" className="mr-2" /> Office Party</li>
        <li><input type="checkbox" className="mr-2" /> Inauguration</li>
      </ul>
    </div>
  );
};

export default CategoryFilter;
