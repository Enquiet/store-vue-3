<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      :disabled="productAmaunt === 1"
      @click.prevent="(amaunt--)"
    >
      <svg
        width="12"
        height="12"
        fill="currentColor"
      >
        <use xlink:href="#icon-minus" />
      </svg>
    </button>

    <input
      v-model.number="amaunt"
      type="text"
    >

    <button
      type="button"
      aria-label="Добавить один товар"
      @click.prevent="(amaunt++)"
    >
      <svg
        width="12"
        height="12"
        fill="currentColor"
      >
        <use xlink:href="#icon-plus" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    productAmaunt: {
      type: Number,
      default: 1
    }
  },
  computed: {
    amaunt: {
      get () {
        return this.productAmaunt
      },
      set (value) {
        return this.$emit('update:productAmaunt', value)
      }
    }
  }
}
</script>
