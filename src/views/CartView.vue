<template>
  <div class="cart">
    <h2 class="text">Корзина</h2>
    <div class="cart-header">
      <router-link class="prevPage" to="/">Назад</router-link>
      <router-link to="/order" class="cartButton" v-show="store.state.realCart.length > 0" @click="store.commit('orderCreate')">Оформить заказ</router-link>
    </div>
    <div v-show="store.state.realCart.length === 0">
      <h2 class="msg">Вы еще ничего не добавили :(</h2>
    </div>
    <div class="order-card" v-for="(item, index) in store.state.realCart" :key="item.id">
      <div class="order-details">
        <p>Название: {{ item.name }}</p>
        <p>Описание: {{ item.description }}</p>
        <p>Цена: {{ item.price }}</p>
        <div class="quantityItem">
          <button @click="store.commit('removeFromCart', item)" :disabled="item.quantity === 1" class="quantityButton">-</button>
          <p>Количество: {{ item.quantity }}</p>
          <button @click="store.commit('addToCart', item)" class="quantityButton">+</button>
        </div>
        <button class="deleteButton" @click="store.commit('delFromCart', item)">Удалить товар</button>
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
}
</script>

<style scoped>
.cart-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.cart{
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #FDF5E6;
  border-radius: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.text{
  color: white;
  background-color: #8B4513;
  width: 120px;
  border-radius: 10px;
  padding: 10px 10px 10px 30px;
}

.msg{
  margin-top: 100px;
  color: #8B4513;
}
.order-card {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.order-details{
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.quantityItem{
  margin: 0 auto;
  width: 170px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.prevPage{
  font-size: 16px;
  color: #FFFFFF;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  background-color: #A0522D;
  display: flex;
  width: 100px;
  height: 40px;
  border-radius: 10px;
}

.prevPage:hover {
  background-color: #f4a460;
}

.cartButton{
  font-size: 16px;
  color: #FFFFFF;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  background-color: #A0522D;
  display: flex;
  width: 150px;
  height: 50px;
  border-radius: 5px;
}
.deleteButton{
  margin-top: 10px;
  color: #FFFFFF;
  border-radius: 7px;
  border: 0;
  font-size: 15px;
  width: 130px;
  height: 50px;
  background-color: #A0522D;
  transition: background-color 0.3s;
  margin-left: 110px;
  font-family: FreeMono, monospace;
}

.deleteButton:hover {
  background-color: #D2691E;
}
.quantityButton {
  width: 22px;
  height: 22px;
  background-color: #CD853F;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantityButton:hover {
  background-color: #8B4513;
}
</style>
