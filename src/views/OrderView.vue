<template>
  <div class="orders-container">
    <div class="orders">
      <h2 class="text">Оформленные заказы</h2>
      <div class="order-header">
        <router-link class="prevPage" to="/">Назад</router-link>
      </div>
      <div v-show="store.state.orders.length === 0">
        <h2 class="msg">На данный момент у вас нет заказов!</h2>
      </div>
      <div class="order" v-for="order in store.state.orders" :key="order.id">
        <div class="order-block">
          <div class="order-card">
            <div class="order-details">
              <div class="product" v-for="product in order" :key="product.id">
                <p><b>{{ product.name }}</b></p>
                <p><b>Описание:</b> {{ product.description }}</p>
                <p><b>Количество:</b> {{ product.quantity }}</p>
                <p><b>Цена:</b> {{ product.price * product.quantity }}</p>
              </div>
              <p><b>Цена заказа: {{ calculateTotalPrice(order) }}</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    store() {
      return store;
    }
  },
  methods: {
    calculateTotalPrice(order) {
      let totalPrice = 0;
      for (let i = 0; i < order.length; i++) {
        totalPrice += order[i].price * order[i].quantity;
      }
      return totalPrice;
    }
  }
}
</script>

<style scoped>
.orders-container {
  display: flex;
  justify-content: center;
}

.text{
  color: white;
  background-color: #8B4513;
  width: 300px;
  border-radius: 10px;
  padding: 10px 10px 10px 30px;
}

.orders {
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  background-color: #FAEBD7;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.order {
  margin-bottom: 40px;
}

.order-block {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 500px;
  margin-left: 370px;
}

.order-card {
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.order-details {
  padding: 20px;
}

.product {
  border: 1px solid black;
  border-radius: 5px;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.prevPage {
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  background-color: #8B4513;
  display: flex;
  width: 130px;
  height: 45px;
  border-radius: 5px;
}

.prevPage:hover {
  background-color: #f4a460;
}

.msg {
  margin-top: 100px;
}
</style>
