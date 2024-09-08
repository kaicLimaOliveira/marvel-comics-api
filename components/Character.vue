<template>
  <div class="characters">
    <div
      v-for="character in props.characters"
      :key="character.id"
      class="character-card"
      :style="{
        background: `url(${character?.thumbnail?.path}.${character?.thumbnail?.extension}) no-repeat center`,
        backgroundSize: character?.thumbnail ? 'cover' : 'auto'
      }"
      @click="handleClick(character.id)"
    >
      <div class="caption">{{ character.name }}</div>
      <div class="caption bottom">View Comics</div>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { MarvelCharacterData } from '~/interfaces/Character';

interface CharacterProps {
  characters: MarvelCharacterData[];
}

const props = withDefaults(defineProps<CharacterProps>(), {})
  const emit = defineEmits<{
  (event: 'get-comic-data', value: number): void
}>()

function handleClick(id: number) {
  emit('get-comic-data', id)
}
</script>

<style scoped lang="scss">
.characters {
  max-width: 80vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 1em;
  background-color: white;
  background-image: url(../images/paper.jpg);
}

.character-card {
  border: 2px solid rgb(161, 161, 161);
  background: rgba(255, 255, 255, 0.67);
  padding: 1em;
  display: flex;
  flex-direction: column;
  height: 300px;
  border: 2px solid black;
  box-shadow: 4px 4px black;
  filter: grayscale(100);

  transition: 0.2s linear;

  .caption {
    font-family: "Bangers", cursive;
    font-size: 1.6em;
    text-align: center;
    margin: auto auto 0 auto;
    padding: 0.5em 1em;

    background-color: white;
    background-image: url(../images/paper.jpg);

    border: 1px solid black;
    box-shadow: 2px 2px black;

    &.bottom {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }

  &:hover {
    cursor: pointer;
    filter: grayscale(0);
    box-shadow: 6px 6px black;
    transform: translate(-2px, -2px);

    .caption {
      opacity: 0;
    }

    .bottom {
      opacity: 1;
    }
  }
}

@media only screen and (max-width: 800px) {
  .characters {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>