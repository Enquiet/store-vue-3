<template>
  <fieldset class="form__block">
    <legend class="form__legend">
      Цвет
    </legend>
    <ul class="colors">
      <li
        v-for="color in colors"
        :key="color.id"
        class="colors__item"
      >
        <label class="colors__label">
          <input
            v-model="colorPick"
            class="colors__radio sr-only"
            type="radio"
            name="color"
            :value="color.id"
            checked=""
          >
          <span
            class="colors__value"
            :style="{background: color.code}"
          />
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      default: () => []
    },
    colorId: {
      type: Number,
      default: 0
    }
  },
  computed: {
    colorPick: {
      get () {
        return this.colorId
      },
      set (value) {
        return this.$emit('update:colorId', value)
      }
    }
  }

}

</script>
