import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pokeApi from "../../common/apis/pokeApi";
import getParams from "../../utils/getParam";
import { ENDPOINTS } from "../../constants/endpoint";

const initialState = {
  pokemons: [],
  searchResults: {},
  next: "",
  prev: "",
  isLoading: false,
  hasError: false,
};

const defaultParams = {
  offset: 0,
  limit: 20,
};

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async (_, { getState }) => {
    const { next } = getState().pokemons;
    const params = getParams(next, defaultParams);
    const response = await pokeApi.get(ENDPOINTS.POKEMON, {
      params,
    });

    return response.data;
  }
);

export const fetchSinglePokemon = createAsyncThunk(
  "pokemons/fetchSinglePokemon",
  async (name) => {
    const response = await pokeApi.get(
      `${ENDPOINTS.POKEMON}/${name.toLowerCase()}`
    );

    return response.data;
  }
);

export const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPokemons.pending]: (state) => {
      return { ...state, isLoading: true, hasError: false };
    },
    [fetchPokemons.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pokemons: [...state.pokemons, ...payload.results],
        isLoading: false,
        next: payload.next,
        prev: payload.previous,
      };
    },
    [fetchPokemons.rejected]: (state) => {
      return { ...state, isLoading: false, hasError: true };
    },
    [fetchSinglePokemon.pending]: (state) => {
      return { ...state, isLoading: true, hasError: false };
    },
    [fetchSinglePokemon.fulfilled]: (state, action) => {
      const {
        meta: { arg: searchParam },
      } = action;

      const result = action.payload || {};

      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          [searchParam.toLowerCase()]: result,
        },
        isLoading: false,
      };
    },
    [fetchSinglePokemon.rejected]: (state) => {
      return { ...state, isLoading: false, hasError: true };
    },
  },
});

export const getAllPokemons = (state) => state.pokemons;
export default pokemonSlice.reducer;
