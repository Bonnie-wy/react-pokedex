import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { isEmptyObject } from "../utils/helpers";
import CardItem from "../components/CardItem";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";
import { fetchSinglePokemon } from "../features/pokemon/pokemonSlice";

const PokemonPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const dispatch = useDispatch();

  const [currentPokemon, setCurrentPokemon] = useState(null);
  const { searchResults, isLoading, hasError } = useSelector(
    (state) => state.pokemons
  );

  useEffect(() => {
    if (searchResults[name] && !isEmptyObject(searchResults[name]))
      setCurrentPokemon(searchResults[name]);
    if (!searchResults[name] || isEmptyObject(searchResults[name])) {
      const fetchPoke = async () => {
        const res = await dispatch(fetchSinglePokemon(name));
        setCurrentPokemon(res.payload);
      };

      fetchPoke();
    }
  }, [dispatch, name, setCurrentPokemon]);

  const onClickBack = () => {
    navigate("/");
  };

  return (
    <section className="px-3 py-3 pt-md-5 pb-md-4">
      {isLoading && <LoadingSpinner />}
      {currentPokemon && <CardItem currentPokemon={currentPokemon} />}
      {hasError && !isLoading && <h1>No pokemon found</h1>}
      <div className="mt-2">
        <Button label="Back to Pokedex" onClick={onClickBack} />
      </div>
    </section>
  );
};

export default PokemonPage;
