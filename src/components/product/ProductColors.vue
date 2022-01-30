<template>
  <ul class="colors colors--black">
    <li
      v-for="color in productColors"
      :key="color.value"
      class="colors__item"
    >
      <label class="colors__label">
        <input
          v-model="colorPick"
          class="colors__radio sr-only"
          type="radio"
          :value="color.code"
          checked=""
        >
        <span
          class="colors__value"
          :style="{background:color.code}"
        />
      </label>
    </li>
  </ul>
</template>
<script>

export default {
  props: {
    productColors: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      colorPick: this.productColors[0].value
    }
  }
}
</script>
