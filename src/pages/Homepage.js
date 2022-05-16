import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPokemons,
  fetchSinglePokemon,
} from "../features/pokemon/pokemonSlice";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import { isEmptyObject } from "../utils/helpers";

const Homepage = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const { pokemons, isLoading, searchResults } = useSelector(
    (state) => state.pokemons
  );

  const fetchData = async () => {
    await dispatch(fetchPokemons());
  };

  useEffect(() => {
    if (!pokemons.length) {
      fetchData();
    }
  }, [pokemons]);

  const handleLoadMore = () => {
    fetchData();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!term) {
      return;
    }

    dispatch(fetchSinglePokemon(term));
  };

  const pokemonItems = () => {
    let pokemonArray;
    const lowerCaseTerm = term.toLowerCase();

    if (
      searchResults[lowerCaseTerm] &&
      !isEmptyObject(searchResults[lowerCaseTerm])
    ) {
      pokemonArray = [searchResults[lowerCaseTerm]];
    } else {
      pokemonArray = pokemons || [];
    }

    return pokemonArray.map((el, index) => (
      <Link to={`/pokemon/${el.name}`} key={el.name}>
        <li className="list-group-item list-group-item-action">{`${
          index + 1
        }. ${el.name}`}</li>
      </Link>
    ));
  };

  return (
    <section className="container-sm">
      <h1 className="display-3 pt-md-3 pb-md-2">Pokedex</h1>
      <form onSubmit={submitHandler}>
        <div className="input-group flex-nowrap py-3">
          <span className="input-group-text" id="addon-wrapping">
            Search
            {isLoading && (
              <div className="ms-2">
                <LoadingSpinner />
              </div>
            )}
          </span>
          <input
            type="text"
            value={term}
            className="form-control"
            placeholder="Pokemon"
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </form>
      <ul className="list-group">{pokemonItems()}</ul>
      <div className="mt-2">
        <Button label="Load More..." onClick={handleLoadMore} />
      </div>
    </section>
  );
};

export default Homepage;
