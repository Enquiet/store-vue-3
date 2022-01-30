<template>
  <main class="content container">
    <LoadCart v-if="loadCartProduct" />
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{name:'mainPage'}"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{name:'cartPage'}"
          >
            Корзина
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ numberProduct }} товара
      </span>
    </div>

    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
      >
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem
              v-for="itemProduct in cardDetalProducts"
              :key="itemProduct.productId"
              :item-product="itemProduct"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p
            v-if="numberProduct === 0"
            class="cart__desc"
          >
            Ваша корзина пуста.<br> Пожалуйста добавте товар в корзину
          </p>
          <div
            v-else
            class="cart__wrapper"
          >
            <p class="cart__desc">
              Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
            </p>
            <p class="cart__price">
              Итого: <span>{{ totalPrice }}</span>
            </p>

            <router-link
              tag="button"
              :to="{name: 'orderPage'}"
              class="cart__button button button--primery"
              type="submit"
            >
              Оформить заказ
            </router-link>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import { mapGetters } from 'vuex'
import CartItem from '@/components/cart/CartItem'
import LoadCart from '@/components/loadingPage/LoadCart.vue'
export default {
  components: { CartItem, LoadCart },
  filters: {
    numberFormat
  },
  data () {
    return {
      loadCartProduct: false
    }
  },
  computed: {
    ...mapGetters(['cardDetalProducts', 'totalPrice', 'numberProduct'])
  },
  watch: {
    numberProduct () {
      this.setLoadProducts()
    },
    totalPrice () {
      this.setLoadProducts()
    },
    '$route.path' () {
      this.setLoadProducts()
    }
  },
  methods: {
    setLoadProducts () {
      this.loadCartProduct = true
      this.loadTimerCart = setTimeout(() => {
        this.loadCartProduct = false
      }, 1000)
    }
  }
}
</script>
