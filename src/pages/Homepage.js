import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../features/pokemon/pokemonSlice";
import { ListGroup, ListGroupItem, Container, Spinner } from "react-bootstrap";
import Button from "../components/Button";

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

  const onClickHandler = () => {
    console.log("hello");
  };

  if (isLoading) return <Spinner>Loading...</Spinner>;
  if (hasError) return <p>Oops, there's an error.</p>;

  const pokemonItems =
    pokemon.length &&
    pokemon.map((el, index) => (
      <Link to={`/pokemon/${el.name}`} key={el.name}>
        <ListGroupItem className="list-group-item list-group-item-action">{`${
          index + 1
        }. ${el.name}`}</ListGroupItem>
      </Link>
    ));

  return (
    <Container className="container-sm">
      <h1 className="display-3 pt-md-3 pb-md-2">Pokedex</h1>
      <ListGroup>{pokemonItems}</ListGroup>
      <Button label="Load More..." onClick={onClickHandler} />
    </Container>
  );
};

export default Homepage;
