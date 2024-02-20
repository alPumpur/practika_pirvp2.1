<template>
  <div class="catalog-page">
    <h1>Каталог товаров</h1>
    <div class="product-cart">
      <div v-for="product in products" :key="product.id" class="product">
        <img :src="product.image" :alt="product.name" class="product-image">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <button @click="addToCart(product)" class="product-price-btn">{{ product.price }}</button>
      </div>
    </div>
    <router-link v-if="isLoggedIn && isClient" to="/order">Ранее оформленные заказы</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const isLoggedIn = computed(() => store.state.isLoggedIn);
const isClient = computed(() => store.state.userRole === 'Client');
const products = ref([
  {
    id: 1,
    name: 'Маска для волос и филлер',
    description: 'Питательный набор от Lador для волос',
    price: 2600,
    image: 'https://maskshop.ru/images/blog/lador_eco_professional/Lador_Lpp_Shampoo.jpg'
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
  store.commit('addToCart', product);
};
</script>

<style scoped>
.product {
  margin-bottom: 20px;
}

.product-image {
  max-width: 100%;
}

.product-name {
  font-size: 18px;
  margin-top: 10px;
}

.product-description {
  margin-top: 5px;
  color: #666;
}

.product-price-btn {
  margin-top: 5px;
  font-weight: bold;
  padding: 5px 10px;
  cursor: pointer;
}

.product-cart {
  display: flex;
  justify-content: space-evenly;
}

.product-image {
  width: 200px;
  height: 200px;
}
</style>