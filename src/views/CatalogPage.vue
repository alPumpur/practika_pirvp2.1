<template>
  <div class="catalog-page">
    <h1 class="catalog-title">Каталог товаров</h1>
    <div class="product-cart">
      <div v-for="product in products" :key="product.id" class="product">
        <img :src="product.image" :alt="product.name" class="product-image">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <div v-if="isAuthenticated">
          <p class="product-price">Цена: {{ product.price }}</p>
          <button @click="addToCart(product)" class="product-btn">В корзину</button>
        </div>
        <div v-else>
          <p>Чтобы добавить товар в корзину, пожалуйста, авторизуйтесь</p>
        </div>
      </div>
    </div>
    <router-link v-if="isLoggedIn && isClient" to="/order">Ранее оформленные заказы</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isAuthenticated = computed(() => store.state.isAuthenticated);
const isClient = computed(() => store.state.userRole === 'Client');

const products = ref([
  {
    id: 1,
    name: 'Маска для волос и филлер',
    description: 'Питательный набор от Lador для волос',
    price: 2600,
    image: 'https://unboxshop.ru/upload/resize_cache/iblock/e19/1200_1200_140cd750bba9870f18aada2478b24840a/lm9s1nyegwhdnsnit0q6l91wvlz42rf6.jpg'
  },
  {
    id: 2,
    name: 'Гели для душа Lador',
    description: 'Увлажняющие гели для душа от Lador',
    price: 4000,
    image: 'https://lador-store.ru/images/brands/774/block-1.jpg'
  },
  {
    id: 3,
    name: 'Шампунь для волос Lador',
    description: 'Шампунь для волос без силиконов увлажняющий',
    price: 1500,
    image: 'https://unboxshop.ru/upload/resize_cache/iblock/097/1200_1200_140cd750bba9870f18aada2478b24840a/1qfq54slwit78z2ble55524vri8s3sdn.jpg'
  },
]);

const addToCart = (product) => {
  if (isAuthenticated.value) {
    store.commit('addToCart', product);
  } else {
    console.log('Пользователь не аутентифицирован. Невозможно добавить товар в корзину.');
  }
};
</script>

<style scoped>
.catalog-page {
  padding: 20px;
}

.catalog-title{
  color: #301801;
}

.product-cart {
  display: flex;
  flex-wrap: wrap; /* Разрешаем перенос на следующую строку */
  gap: 20px; /* Отступ между товарами */
}

.product {
  width: calc(33.33% - 20px); /* Ширина товара на 1/3 ширины родительского контейнера */
  margin-bottom: 20px;
  padding: 10px; /* Добавим немного отступа вокруг товара */
  box-sizing: border-box; /* Учитываем padding в расчетах ширины */
  text-align: center;
}

.product-image {
  max-width: 200px;
}

.product-name {
  font-size: 18px;
  margin-top: 10px;
}

.product-description {
  margin-top: 5px;
  color: #666;
}

.product-price {
  margin-top: 5px;
  font-weight: bold;
}

.product-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #A0522D;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.product-btn:hover {
  background-color: #8B4513;
}
</style>
