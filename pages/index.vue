<template>
  <main>
    <form class="search" @submit.prevent="handleSubmit">
      <input
        type="text"
        placeholder="enter character name"
        v-model.trim="state.characterName"
      />
      <div class="buttons">
        <button type="submit">Get Character Data</button>
        <button type="reset" class="reset" @click="handleReset">Reset</button>
      </div>
    </form>

    <Character :characters="state.characters" @click="getComicData" />
    <Comics :comics="state.comics" />
  </main>
</template>

<script setup lang="ts">
import Character from '~/components/Character.vue';
import Comics from '~/components/Comics.vue';

import md5 from 'md5';
import type { MarvelComicData } from '~/interfaces/Comic';
import type { MarvelCharacterData } from '~/interfaces/Character';

useSeoMeta({
  title: 'Marvel Comics API'
})

interface State {
  comics: MarvelComicData[];
  characters: MarvelCharacterData[];
  characterName: string;
  loading: boolean;
}

const state: State = reactive({
  comics: [],
  characters: [],
  characterName: '',
  loading: false,
})

const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;

const handleSubmit = () => {
  getCharacterData();
};

async function getCharacterData() {
  const timeStamp = new Date().getTime();
  const hash = generateHash(timeStamp);
  const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${state.characterName}&limit=100`;

  try {
    const response = await fetch(url);
    const { data } = await response.json();
    state.characters = data.results;
    console.log(state.characters);
  } catch (err) {
    console.log(err, 'Error while getting character data');
  }
};

async function getComicData(characterId: string) {
  window.scrollTo({ top: 0, left: 0 });

  const timeStamp = new Date().getTime();
  const hash = generateHash(timeStamp);
  const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;

  try {
    const response = await fetch(url);
    const { data } = await response.json();
    state.comics = data.results;
  } catch (err) {
    console.log('Error while getting comic data');
  }
};

const handleReset = () => {
  state.characterName = '';
  state.characters = [];
  state.comics = [];
};

const generateHash = (timeStamp: number) => {
  return md5(timeStamp + privateKey + publicKey);
};
</script>

<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 1em auto;
}

input {
  width: 300px;
  font-size: 1.4em;
  text-align: center;
  margin: 1em 0;
  font-family: "Bangers", cursive;
  padding: 0.5em 0;
}

button {
  font-size: 1.2em;
  padding: 0.5em 1em;
  margin-bottom: 1em;
  cursor: pointer;
  font-family: "Bangers", cursive;
  background: rgb(255, 240, 33);
  transition: linear 0.2s;
  border: 1px solid black;
  box-shadow: 2px 2px black;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px black;
  }

  &.reset {
    margin-left: 0.25em;
    background-color: white;
  }
}
</style>