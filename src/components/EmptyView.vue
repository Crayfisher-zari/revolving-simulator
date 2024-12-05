<script lang="ts" setup></script>
<template>
  <div class="wrapper">
    <div>
      <p class="empty">（ﾟ∇ﾟ;）</p>
      <p class="dontPay">払いきれないよ…</p>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.empty {
  font-size: 120px;
  font-weight: 900;
  line-height: 1;

  /* font-family: "IBM Plex Sans JP", sans-serif; */

  /* font-family: "Zen Kaku Gothic New"; */
}

.dontPay {
  margin-top: 16px;
  font-size: 20px;
  text-align: center;
  letter-spacing: 0.1em;
}
</style>
