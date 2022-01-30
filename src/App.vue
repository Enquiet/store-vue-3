<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/TheHeader.vue'
import Footer from '@/components/TheFooter.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: { Header, Footer },
  created () {
    const saveUserKey = localStorage.getItem('userAccessKey')
    if (saveUserKey) {
      this.updateAccessKey(saveUserKey)
    }

    this.loaderCartProduct()
  },
  methods: {
    ...mapActions(['loaderCartProduct']),
    ...mapMutations(['updateAccessKey'])
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
