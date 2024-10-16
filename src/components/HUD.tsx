function HUD() {
  return (
    <div className="absolute h-fit w-fit bottom-6 right-1/2 translate-x-1/2 lg:top-6 lg:right-24 lg:translate-x-0 p-4 bg-slate-800 flex gap-4">
      <p className="text-white font-semibold text-nowrap">FOUR LETTERS</p>
      <p className="text-white font-semibold text-nowrap">06/10</p>
      <p className="text-white font-semibold text-nowrap">142c</p>
    </div>
  );
}

export default HUD;
