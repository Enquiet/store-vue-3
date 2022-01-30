<template>
  <main
    v-if="orderInfo.basket"
    class="content container"
  >
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a
            class="breadcrumbs__link"
            href="index.html"
          >
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a
            class="breadcrumbs__link"
            href="cart.html"
          >
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ $store.state.orderInfoData.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
      >
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfoData.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfoData.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfoData.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ $store.state.orderInfoData.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <InfoProductCart
            v-for="infoProduct in orderInfo.basket.items"
            :key="infoProduct.id"
            :info-product="infoProduct"
            :total-price="orderInfo.totalPrice"
            :number-products="orderInfo.basket.items.length"
          />
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import InfoProductCart from '@/components/InfoProductCart.vue'

export default {
  components: {
    InfoProductCart
  },
  data () {
    return {
      infoOrderError: false
    }
  },
  computed: {
    orderInfo () {
      return this.$store.state.orderInfoData
    }
  },
  watch: {
    '$route.params.id' () {
      this.$store.dispatch('loadOrderInfo', this.$route.params.id)
        .catch(() => {
          this.$router.push({ name: 'notFound' })
        })
    }
  },
  created () {
    this.$store.dispatch('loadOrderInfo', this.$route.params.id)
  }
}
</script>
