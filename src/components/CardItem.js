import Pill from "../components/Pill";

const CardItem = ({ currentPokemon }) => {
  const { name, abilities, sprites, types } = currentPokemon || {};

  const pokemonAbilities =
    abilities.length && abilities.map(({ ability }) => ability.name).join(", ");

  return (
    <div className="shadow-lg p-3 mb-5 bg-body rounded">
      <div className="card-body">
        <img
          alt={name}
          src={sprites.other.dream_world.front_default}
          top
          width="100%"
          height="300"
        />

        <h1 className="display-3 text-capitalize">{name}</h1>
        <hr className="mt-2 mb-3" />
        <div className="py-2">
          <h6 className="mb-2 card-subtitle" tag="h6">
            About
          </h6>
          <p className="card-text">This is a very cute pokemon named {name}.</p>
        </div>
        <div className="py-2">
          <h6 className="mb-2 card-subtitle" tag="h6">
            Type
          </h6>
          <div>
            {types?.length ? (
              types?.map(({ type }) => {
                return (
                  <Pill
                    label={type.name}
                    pokeType={type.name}
                    key={type.name}
                  />
                );
              })
            ) : (
              <Pill label={types.type.name} pokeType={types.type.name} />
            )}
          </div>
        </div>
        <div className="py-2">
          <h6 className="mb-2 card-subtitle" tag="h6">
            Abilities
          </h6>
          <ul className="list-group list-unstyled">
            {abilities?.length ? (
              <li>{pokemonAbilities}</li>
            ) : (
              <li>{abilities.ability.name}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
