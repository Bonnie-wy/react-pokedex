import { Badge } from "react-bootstrap";

const Pill = ({ pokeType, label }) => {
  const color = {
    normal: "secondary",
    fire: "danger",
    water: "primary",
    electric: "warning",
    grass: "success",
    ice: "info",
    fighting: "danger",
    poison: "danger",
    ground: "warning",
    flying: "info",
    psychic: "danger",
    bug: "success",
    rock: "warning",
    ghost: "danger",
    dragon: "danger",
    dark: "warning",
    steel: "dark",
    fairy: "danger",
  };

  return (
    <Badge pill bg={color[pokeType]} className="w-40">
      {label}
    </Badge>
  );
};

export default Pill;
