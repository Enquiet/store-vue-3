import { createStore } from 'vuex'
import { API_URL } from '@/helpers/config'
import axios from 'axios'

export default createStore({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductItems: [],
    orderInfoData: []
  },
  mutations: {
    updateOrderInfo (state, orderInfo) {
      state.orderInfoData = orderInfo
    },
    clearCartProduct (state) {
      state.cartProducts = []
      state.cartProductItems = []
    },
    updateProductCard (state, { productId, amount }) {
      const productItem = state.cartProducts.find(item => item.productId === productId)
      if (productItem) {
        productItem.amount = amount
      }
    },
    deleteProdictCard (state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
    },
    updateAccessKey (state, accessKey) {
      state.userAccessKey = accessKey
    },
    updateCartProductsItem (state, item) {
      state.cartProductItems = item
    },
    syncCartProductItem (state) {
      state.cartProducts = state.cartProductItems.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity
        }
      })
    }
  },
  getters: {
    cardDetalProducts (state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductItems.find(goods => goods.product.id === item.productId).product
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        }
      })
    },
    totalPrice (state, getters) {
      return getters.cardDetalProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
    },
    numberProduct (state, getters) {
      return getters.cardDetalProducts.length
    }
  },
  actions: {
    loadOrderInfo (context, orderId) {
      return axios.get(API_URL + '/api/orders/' + orderId, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then((response) => {
          context.commit('updateOrderInfo', response.data)
        })
    },
    loaderCartProduct (context) {
      return axios.get(API_URL + '/api/baskets', {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey)
            context.commit('updateAccessKey', response.data.user.accessKey)
          }
          context.commit('updateCartProductsItem', response.data.items)
          context.commit('syncCartProductItem')
        })
    },
    addProductCart (context, { productId, amount }) {
      return axios.post(API_URL + '/api/baskets/products', {
        productId: productId,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then((response) => {
          context.commit('updateCartProductsItem', response.data.items)
          context.commit('syncCartProductItem')
        })
    },
    setProductAmountCart (context, { productId, amount }) {
      context.commit('updateProductCard', { productId, amount })
      if (amount < 1) {
        return
      }

      return axios.put(API_URL + '/api/baskets/products', {
        productId: productId,
        quantity: amount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then((response) => {
          context.commit('updateCartProductsItem', response.data.items)
        })
        .catch(() => {
          context.commit('syncCartProductItem')
        })
    },
    deleteProductToCard (context, productId) {
      return axios.delete(API_URL + '/api/baskets/products', {
        data: {
          productId: productId
        },
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(() => {
          context.commit('deleteProdictCard', productId)
        })
        .catch(() => {
          context.commit('syncCartProductItem')
        })
    }
  }
})
