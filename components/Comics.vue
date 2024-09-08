<template>
  <div class="comics">
    <TransitionGroup name="list">
      <a
        v-for="comic in props.comics"
        :key="comic.id"
        class="comicCard"
        :href="getDetailsUrl(comic)"
        target="_blank"
        rel="noreferrer"
        @click="handleClick(comic.id)"
        :style="{
          background: `url(${comic.thumbnail.path}.${comic.thumbnail.extension}) no-repeat center`,
          backgroundSize: 'cover'
        }"
      >
        <div class="caption">{{ comic.title }}</div>
        <div class="caption bottom">View Comic Details</div>
      </a>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { MarvelComicData } from '~/interfaces/Comic';

interface ComicsProps {
  comics: MarvelComicData[]
}

const props = withDefaults(defineProps<ComicsProps>(), {})

const getDetailsUrl = (comic: MarvelComicData) => {
  return comic.urls.find((element) => element.type === "detail")?.url;
};

const handleClick = (id: number) => {
  
};
</script>

<style scoped lang="scss">
.comics {
  max-width: 80vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  padding: 1em;
  background-color: white;
  background-image: url(../images/paper.jpg);
}

.comicCard {
  border: 2px solid rgb(161, 161, 161);
  background: rgba(255, 255, 255, 0.67);
  padding: 1em;
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 2px solid black;
  box-shadow: 4px 4px black;
  filter: grayscale(100);

  transition: 0.2s linear;
  text-decoration-color: black;

  .caption {
    font-family: "Bangers", cursive;
    font-size: 1.6em;
    text-align: center;
    margin: auto auto 0 auto;
    padding: 0.5em 1em;

    background-color: white;
    background-image: url(../images/paper.jpg);

    color: black;
    border: 1px solid black;
    box-shadow: 2px 2px black;

    &.bottom {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      color: black;
      text-decoration: underline;
      width: 60%;
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

@media only screen and (max-width: 1200px) {
  .comics {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (max-width: 800px) {
  .comics {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>