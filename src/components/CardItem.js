import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { fetchSinglePokemon } from "../features/pokemon/pokemonSlice";
import { useEffect } from "react";

const CardItem = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPoke = async () => {
      const res = await dispatch(fetchSinglePokemon(name));
      console.log(res.payload);
    };

    fetchPoke();
  }, [dispatch, name]);

  const onClickBack = () => {
    navigate("/");
  };
  return (
    <Card className="shadow-lg p-3 mb-5 bg-body rounded">
      <Card.Body>
        <h1 className="display-3 text-capitalize">{name}</h1>
        <Card.Subtitle className="mb-2 text-muted" tag="h6">
          Card subtitle
        </Card.Subtitle>
        <Card.Text>Some description</Card.Text>
        <Button label="Back to Pokedex" onClick={onClickBack} />
      </Card.Body>
    </Card>
  );
};

export default CardItem;
