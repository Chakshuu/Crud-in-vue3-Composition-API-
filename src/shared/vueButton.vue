<template>
    <button class="mdc-button mdc-button--raised">
  <span class="mdc-button__label">{{ btnText }}</span>
</button>
</template>

<script>
export default {
  name: 'vueButton',
  props: {
    btnText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@material/button/styles";
@use "@material/button/mdc-button";

.custom-text-button,
.custom-outlined-button {
  --mdc-theme-primary: #FEDBD0;
  --mdc-theme-on-primary: #442C2E;
  --mdc-theme--primary-bg: #fdfbfb;
}
</style>
