<template>
  <svg v-if="props.isLoading" viewBox="25 25 50 50" :style="{ width: props.width }">
    <circle r="20" cy="50" cx="50"></circle>
  </svg>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  timeoutEnded: [value: boolean]
}>()

interface Props {
  isLoading: boolean;
  timeout?: number;
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

onMounted(() => {
  if (props.timeout != undefined) {
    setTimeout(() => emit("timeoutEnded", false), props.timeout * 1000);
  }
})
</script>

<style lang="scss" scoped>

svg {
 transform-origin: center;
 animation: rotate4 2s linear infinite;
}

circle {
 fill: none;
 stroke: hsl(0, 0%, 29%);
 stroke-width: 3;
 stroke-dasharray: 1, 200;
 stroke-dashoffset: 0;
 stroke-linecap: round;
 animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
 100% {
  transform: rotate(360deg);
 }
}

@keyframes dash4 {
 0% {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
 }

 50% {
  stroke-dasharray: 90, 200;
  stroke-dashoffset: -35px;
 }

 100% {
  stroke-dashoffset: -125px;
 }
}
</style>