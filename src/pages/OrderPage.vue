<template>
  <main class="content container">
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
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form
        class="cart__form form"
        action="#"
        method="POST"
        @submit.prevent="order"
      >
        <div class="cart__field">
          <div class="cart__data">
            <FormText
              v-model="formData.name"
              title="ФИО"
              type="text"
              placeholder="Введите имя"
              :error="formError.name"
            />
            <FormText
              v-model="formData.address"
              title="Адрес доставки"
              type="text"
              placeholder="Введите ваш адрес"
              :error="formError.address"
            />
            <FormText
              v-model="formData.phone"
              title="Телефон"
              type="tel"
              placeholder="Введите ваш телефон"
              :error="formError.phone"
            />
            <FormText
              v-model="formData.email"
              title="Email"
              type="email"
              placeholder="Введите вашу почту"
              :error="formError.email"
            />
            <FormTextarea
              v-model="formData.comment"
              title="Комментарий к заказу"
              placeholder="Ваши пожелания"
              :error="formError.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">
              Доставка
            </h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    checked=""
                  >
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                  >
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">
              Оплата
            </h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                  >
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                  >
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <div v-if="numberProduct < 1 ">
            Товаров в корзине нет
          </div>
          <InfoProductCart
            v-for="infoProduct in cardDetalProducts"
            v-else
            :key="infoProduct.productId"
            :info-product="infoProduct"
            :total-price="totalPrice"
            :number-products="numberProduct"
          />
          <button
            v-if="numberProduct > 0"
            class="cart__button button button--primery"
            type="submit"
          >
            Оформить заказ
          </button>
        </div>
        <div
          v-if="errorMessage"
          class="cart__error form__error-block"
        >
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ errorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import FormText from '@/components/form/FormText.vue'
import FormTextarea from '@/components/form/FormTextarea.vue'
import axios from 'axios'
import { API_URL } from '@/helpers/config.js'
import { mapMutations, mapGetters } from 'vuex'
import InfoProductCart from '@/components/InfoProductCart.vue'

export default {
  components: { FormText, FormTextarea, InfoProductCart },
  data () {
    return {
      formData: {
        comment: 'Без комментариев '
      },
      formError: {},
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters(['cardDetalProducts', 'numberProduct', 'totalPrice'])
  },
  methods: {
    ...mapMutations(['clearCartProduct', 'updateOrderInfo']),
    order () {
      this.errorMessage = ''
      this.formError = {}
      axios.post(API_URL + '/api/orders', {
        ...this.formData
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey
        }

      }).then((response) => {
        this.clearCartProduct()
        this.updateOrderInfo(response.data)
        this.$router.push({ name: 'infoPage', params: { id: response.data.id } })
      })
        .catch((error) => {
          this.formError = error.response.data.error.request || {}
          this.errorMessage = error.response.data.error.message
        })
    }
  }
}
</script>
