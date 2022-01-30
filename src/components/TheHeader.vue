<template>
  <header class="header">
    <div class="header__wrapper container">
      <span class="header__info">Каталог</span>

      <a
        class="header__logo"
        href="#"
      >
        <img
          src="img/svg/logo-tech.svg"
          alt="Логотип интернет магазина Технозавррр"
          width="190"
          height="33"
        >
      </a>

      <a
        class="header__tel"
        href="tel:8 800 600 90 09"
      >
        8 800 600 90 09
      </a>
      <LoadCartIndecator v-show="loadProductCart" />
      <CartIndecator v-show="addProductCart" />
    </div>
  </header>
</template>

<script>
import CartIndecator from '@/components/cart/CartIndecator.vue'
import LoadCartIndecator from '@/components/loadingPage/LoadCartIndecator.vue'

export default {
  components: { CartIndecator, LoadCartIndecator },
  data () {
    return {
      loadProductCart: false,
      addProductCart: true
    }
  },
  watch: {
    '$store.getters.numberProduct' () {
      this.loadProductCart = true
      this.addProductCart = false
      this.loadTimerCart = setTimeout(() => {
        this.loadProductCart = false
        this.addProductCart = true
      }, 1000)
    }
  }
}
</script>
