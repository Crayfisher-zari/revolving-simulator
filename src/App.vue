<script setup lang="ts">
import {ref} from "vue";
import HelloWorld from './components/HelloWorld.vue'
import NumberInput from "./components/NumberInput.vue";

const debtRows = ref<number>(100);
const interest = ref<number>(15)
const payback = ref<number>(10);
</script>

<template>
  <div>
    <NumberInput label="負債行数" unit="行" v-model.number="debtRows" />

  </div>
  <div>
    <NumberInput label="利子" unit="%" v-model.number="interest" />
  </div>
  <div>
    <NumberInput label="毎月の返済行数" unit="行" v-model.number="payback" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
