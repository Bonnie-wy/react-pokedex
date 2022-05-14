import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pokeApi from "../../common/apis/pokeApi";

const initialState = {
  pokemon: [],
  isLoading: false,
  hasError: false,
};

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async () => {
    const response = await pokeApi.get(`/pokemon?limit=20&offset=20`);
    return response.data.results;
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPokemon.pending]: (state) => {
      return { ...state, pokemon: {}, isLoading: true };
    },
    [fetchPokemon.fulfilled]: (state, { payload }) => {
      return { ...state, pokemon: payload, isLoading: false };
    },
    [fetchPokemon.rejected]: (state) => {
      return { ...state, pokemon: {}, isLoading: false, hasError: true };
    },
  },
});

export const getAllPokemon = (state) => state.pokemon;
export default pokemonSlice.reducer;
