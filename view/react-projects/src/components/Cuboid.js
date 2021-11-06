export default function Cuboid({ children }) {
  return (
    <div className="cuboid">
      <div className="cuboid__rect">
        <div className="cuboid__side cuboid__side--front">{children}</div>
        <div className="cuboid__side cuboid__side--back"></div>
        <div className="cuboid__side cuboid__side--top"></div>
        <div className="cuboid__side cuboid__side--bottom"></div>
      </div>
    </div>
  );
}
