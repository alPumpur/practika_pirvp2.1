<template>
  <div class="products">
    <div class="top-buttons">
      <nav class="top-buttons">
        <p class="nav-links" v-show="store.state.user_token === null">
          <router-link to="/registration" class="link">Регистрация</router-link>
        </p>
        <p class="nav-links" v-show="store.state.user_token === null">
          <router-link to="/login" class="link">Войти в аккаунт</router-link>
        </p>
        <p class="nav-links" v-show="store.state.user_token !== null">
          <router-link to="/cart" class="link">Корзина</router-link>
        </p>
        <p class="nav-links" v-show="store.state.user_token !== null">
          <router-link to="/order" class="link">Оформленные заказы</router-link>
        </p>
        <p class="nav-links" v-show="store.state.user_token !== null">
          <a href="#" @click="store.commit('logout')" class="link">Выйти из аккаунта</a>
        </p>
      </nav>
    </div>
    <div class="product-list">
      <div class="product" v-for="(product, index) in store.state.products" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Цена: {{ product.price }}</p>
        <button @click="store.commit('addToCart', product)" v-show="store.state.user_token !== null" style="background-color: #8B4513;">Добавить в корзину</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store
    }
  },
  mounted(){
    if (localStorage.token !== undefined && localStorage.token !== null) {
      store.state.user_token = localStorage.token;
    }
    this.$store.commit('fetchProducts');
  },
}
</script>

<style scoped>
.products{
  background-color:#FDF5E6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}
.nav-links .link {
  color: #8B4513;
  width: 100px;
  height: 70px;
  border-radius: 10px;
  margin: 0;
  padding: 20px 30px 20px 30px;
  margin-right: 20px;
  margin-left: 20px;
}

.link {
  font-size: 18px;
}

.nav-links .link:hover {
  background-color: #8B4513;
  color: white;
}
.product-list{
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.product{
  border: 1px solid black;
  border-radius: 5px;
  width: 350px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}
.product:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.product h3, .product p, .product button {
  padding: 10px;
  margin: 0;
}
.product button{
  width: 200px;
  height: 40px;
  margin-bottom: 30px;
  background-color: #8B4513;
  color: white;
  border: none;
  cursor: pointer;
}
.product button:hover {
  background-color: #F5DEB3;
}

.top-buttons{
  display: flex;
  justify-content: center;
}
</style>
