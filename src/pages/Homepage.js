import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../features/pokemon/pokemonSlice";
import Pill from "../components/Pill";

const Homepage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPokemon());
    };

    fetchData();
  }, [dispatch]);

  const { pokemon, isLoading, hasError } = useSelector(
    (state) => state.pokemon
  );

  if (isLoading) return <p>Loading...</p>;
  if (hasError) return <p>Oops, there's an error.</p>;

  return (
    <div>
      <h1>Pokedex</h1>
      {pokemon &&
        pokemon.map((el) => {
          return (
            <Link to={`/pokemon/${el.name}`}>
              <Pill label={el.name} key={el.name} />
            </Link>
          );
        })}
    </div>
  );
};

export default Homepage;
