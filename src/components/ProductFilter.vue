<template>
  <aside class="filter">
    <h2 class="filter__title">
      Фильтры
    </h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="getNewStatsProducts"
    >
      <fieldset class="form__block">
        <legend class="form__legend">
          Цена
        </legend>
        <label class="form__label form__label--price">
          <input
            v-model.number="currentPriceFrom"
            class="form__input"
            type="text"
            name="min-price"
          >
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            v-model.number="currentPriceTo"
            class="form__input"
            type="text"
            name="max-price"
          >
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Категория
        </legend>
        <label class="form__label form__label--select">
          <select
            v-model.number="currentCategoryId"
            class="form__select"
            type="text"
            name="category"
          >
            <option value="0">Все категории</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >{{ category.title }}</option>

          </select>
        </label>
      </fieldset>

      <ColorsFilter
        v-model:color-id="currentColor"
        :colors="allColors"
      />

      <MemoryFilter
        v-model:memory-product="currentMemory"
        :memory-list="allMemory"
        :quantity-products="getQuantityProductsMemory"
      />

      <button
        class="filter__submit button button--primery"
        type="submit"
      >
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click="getDefaultStatsProducts"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>
<script>

import categoriesProduсts from '../data/goods'
import ColorsFilter from './ColorsFilter.vue'
import MemoryFilter from './MemoryFilter.vue'
import { API_URL } from '@/helpers/config'
import axios from 'axios'

const VOLUME_MEMORY = [32, 64, 128]
export default {
  components: { ColorsFilter, MemoryFilter },
  props: {
    productPriceFrom: {
      type: Number,
      default: 0
    },
    productPriceTo: {
      type: Number,
      default: 0
    },
    productFilterId: {
      type: Number,
      default: 0
    },
    productFilterColor: {
      type: Number,
      default: 0
    },
    productFilterMamory: {
      type: Array,
      default: () => []
    },
    currentPage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: 0,
      currentMemory: [],
      categoresData: null,
      calorsData: null
    }
  },
  computed: {
    getQuantityProductsMemory () {
      const repeatedMemory = {}
      VOLUME_MEMORY.forEach((item) => {
        repeatedMemory[item] = 0
      })
      const quantityProducts = categoriesProduсts
        .reduce((accmulator, item) => {
          return item.memory ? [...accmulator, ...item.memory] : accmulator
        }, [])
      for (let i = 0; i < quantityProducts.length; i++) {
        if (repeatedMemory[quantityProducts[i].value] !== undefined) {
          repeatedMemory[quantityProducts[i].value] += 1
        }
      }
      return repeatedMemory
    },
    categories () {
      return this.categoresData ? this.categoresData.items : []
    },
    allColors () {
      return this.calorsData ? this.calorsData.items : []
    },
    allMemory () {
      const memoryItem = categoriesProduсts.reduce((accmulator, item) => {
        return item.memory ? [...accmulator, ...item.memory] : accmulator
      }, [])
      return this.getFilteredCategory(memoryItem)
    }
  },
  watch: {
    currentPriceTo (value) {
      this.currentPriceTo = value
    },
    currentPriceFrom (value) {
      this.currentPriceFrom = value
    },
    productFilterId (value) {
      this.currentCategoryId = value
    },
    productFilterColor (value) {
      this.currentColor = value
    },
    productFilterMamory (value) {
      this.currentMemory = value
    },
    currentPage (value) {
      this.currentPage = value
    }
  },
  created () {
    this.getLoadingCategores()
    this.getLoadingColors()
  },
  methods: {
    getLoadingCategores () {
      axios.get(API_URL + '/api/productCategories')
        .then((response) => {
          this.categoresData = response.data
        })
    },
    getLoadingColors () {
      axios.get(API_URL + '/api/colors')
        .then((response) => {
          this.calorsData = response.data
        })
    },

    getFilteredCategory (item) {
      const uniqItem = [...new Set(item.map(arr => arr.value))]
      const resultSort = uniqItem.sort((a, b) => a - b)
      const result = resultSort.map(arr => item.find(arr2 => arr2.value === arr))
      return result
    },
    getNewStatsProducts () {
      this.$emit('update:productPriceFrom', this.currentPriceFrom)
      this.$emit('update:productPriceTo', this.currentPriceTo)
      this.$emit('update:productFilterId', this.currentCategoryId)
      this.$emit('update:productFilterColor', this.currentColor)
      this.$emit('update:productFilterMamory', this.currentMemory)
      this.$emit('update:currentPage', 1)
    },
    getDefaultStatsProducts () {
      this.$emit('update:productPriceFrom', 0)
      this.$emit('update:productPriceTo', 0)
      this.$emit('update:productFilterId', 0)
      this.$emit('update:productFilterColor', 0)
      this.$emit('update:productFilterMamory', [])
    }
  }
}

</script>
