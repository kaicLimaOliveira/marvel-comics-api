<template>
  <div>
    <form class="search" @submit.prevent="handleSubmit">
      <input
        type="text"
        placeholder="enter character name"
        v-model.trim="state.characterName"
      />
      <div>
        <button type="submit" class="button-get-character" :disabled="state.loading">
          <span>Get Character Data</span>
          <Loader :is-loading="state.loading" width="20px" />
        </button>
        <button type="reset" class="reset" @click="handleReset">Reset</button>
      </div>
    </form>

    <Character 
      v-if="!state.comics?.[0] && state.characters?.[0]"
      :characters="state.characters" 
      @get-comic-data="getComicData($event)" 
    />
    
    <Comics
      v-if="state.comics?.[0]" 
      :comics="state.comics" 
    />
  </div>
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

const config = useRuntimeConfig();

const handleSubmit = () => {
  getCharacterData();
};

async function getCharacterData() {
  state.loading = true;
  state.characters = [];
  state.comics = [];
  
  const timeStamp = new Date().getTime();
  const hash = generateHash(timeStamp);
  const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${config.public.marvelPublicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${state.characterName}&limit=100`;

  try {
    const response = await fetch(url);
    const { data } = await response.json();
    state.characters = data.results;
  } catch (err) {
    console.log(err, 'Error while getting character data');
  }
  state.loading = false;
};

async function getComicData(characterId: number) {
  window.scrollTo({ top: 0, left: 0 });
  state.loading = true;
  

  const timeStamp = new Date().getTime();
  const hash = generateHash(timeStamp);
  const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${config.public.marvelPublicKey}&hash=${hash}&ts=${timeStamp}`;

  try {
    const response = await fetch(url);
    const { data } = await response.json();
    state.comics = data.results;
  } catch (err) {
    console.log('Error while getting comic data');
  }
  state.loading = false;
};

const handleReset = () => {
  state.characterName = '';
  state.characters = [];
  state.comics = [];
};

const generateHash = (timeStamp: number) => {
  return md5(timeStamp + config.public.marvelPrivateKey + config.public.marvelPublicKey);
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

.button-get-character {

  span {
    margin-right: 10px;
  }
}
</style>