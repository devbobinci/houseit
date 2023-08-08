export default function PropertyType() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm opacity-60 hover:opacity-80">
        <input id="apartment" type="checkbox" />
        <label htmlFor="apartment" className="text-sm cursor-pointer">
          Apartment
        </label>
      </div>
      <div className="flex items-center gap-2 text-sm opacity-60 hover:opacity-80">
        <input id="house" type="checkbox" />
        <label htmlFor="house" className="cursor-pointer">
          House
        </label>
      </div>
      <div className="flex items-center gap-2 opacity-60 text-sm ">
        <input id="garage" type="checkbox" />
        <label htmlFor="garage" className="cursor-pointer">
          Garage
        </label>
      </div>
    </div>
  );
}
