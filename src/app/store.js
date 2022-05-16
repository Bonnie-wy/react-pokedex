import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "../features/pokemon/pokemonSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonSlice,
  },
});
