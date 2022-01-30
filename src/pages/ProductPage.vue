<template>
  <PageOk v-if="loadingProduct.ok" />
  <NotFoundPage v-else-if="loadingProduct.error" />
  <main
    v-else
    class="content container"
  >
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
            :to="{name:'mainPage'}"
          >
            {{ productCatigories.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ productInfo.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="productImage"
            :alt="productInfo.title"
          >
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул:  {{ productInfo.id }}</span>
        <h2 class="item__title">
          {{ productInfo.title }}
        </h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="addToCard"
          >
            <b class="item__price">
              {{ productInfo.price }}
            </b>

            <fieldset class="form__block">
              <legend
                v-if="productInfo.colors"
                class="form__legend"
              >
                Цвет:
              </legend>
              <ProductColors
                v-if="productInfo.colors"
                :product-colors="productInfo.colors"
              />
            </fieldset>

            <fieldset
              v-if="productInfo.memory"
              class="form__block"
            >
              <legend class="form__legend">
                Объемб в ГБ:
              </legend>
              <ul class="sizes sizes--primery">
                <li
                  v-for="memoryProduct in productInfo.memory"
                  :key="memoryProduct.id"
                  class="sizes__item"
                >
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      :value="memoryProduct.value"
                    >
                    <span class="sizes__value">
                      {{ memoryProduct.value }}
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <Counter v-model:product-amaunt="productAmaunt" />

              <button
                class="button button--primery"
                type="submit"
              >
                В корзину
              </button>
              <LoadAddProduct v-show="loadingAddProduct" />
              <div v-show="addProduct.ok">
                Товар добавился в корзину
              </div>
              <div v-show="addProduct.error">
                произошла ошибка
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное устройство можно установить как фирменное приложение, так и различные приложения сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import ProductColors from '@/components/product/ProductColors.vue'
import Counter from '@/components/common/Counter.vue'
import PageOk from '@/components/loadingPage/PageOk.vue'
import NotFoundPage from './NotFoundPage.vue'
import LoadAddProduct from '@/components/loadingPage/LoadAddProduct.vue'
import { API_URL } from '@/helpers/config'
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  components: {
    ProductColors, Counter, PageOk, NotFoundPage, LoadAddProduct
  },
  filters: {
    numberFormat
  },
  data () {
    return {
      productAmaunt: 1,
      productData: null,
      loadingAddProduct: false,
      loadingProduct: {
        ok: false,
        error: false
      },
      addProduct: {
        ok: false,
        error: false
      }
    }
  },
  computed: {
    productInfo () {
      return this.productData
    },
    productImage () {
      return this.productData.image.file.url
    },
    productCatigories () {
      return this.productData.category
    }
  },

  watch: {
    '$route.params.id': {
      handler () {
        this.getLoadingProduct()
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions(['addProductCart']),
    addToCard () {
      this.loadingAddProduct = true
      this.addProduct.ok = false
      this.addProduct.error = false
      this.loadTimerProduct = setTimeout(() => {
        this.addProductCart({ productId: this.productInfo.id, amount: this.productAmaunt })
          .then(() => {
            this.loadingAddProduct = false
            this.addProduct.ok = true
          })
          .catch(() => {
            this.addProduct.error = true
          })
      }, 2000)
    },
    getLoadingProduct () {
      this.loadingProduct.ok = true
      this.loadingProduct.error = false
      axios.get(API_URL + '/api/products/' + this.$route.params.id)
        .then((response) => {
          this.productData = response.data
        })
        .catch(() => {
          this.loadingProduct.error = true
        })
        .then(() => {
          this.loadingProduct.ok = false
        })
    }
  }
}
</script>
