<template>
  <header class="header">
    <Nav v-if="!isLoggedIn"></Nav>
    <div v-else>
      {{ currentUser.email }}
      <button @click="logout">Выход</button>
    </div>
  </header>
</template>

<script setup>
import Nav from "@/components/Nav.vue";
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router'; // Импортируем useRouter из vue-router

const store = useStore();
const router = useRouter(); // Получаем объект router

const isLoggedIn = computed(() => !!store.state.currentUser);
const currentUser = computed(() => store.state.currentUser);

const logout = () => {
  store.dispatch('logoutUser');
  router.push({ name: 'login' }); // Перенаправляем на страницу входа после выхода
};

// Следим за изменениями в состоянии currentUser в хранилище Vuex
watch(currentUser, (newValue) => {
  if (!newValue) {
    // Если текущий пользователь отсутствует, перенаправляем на страницу входа
    router.push({ name: 'login' });
  }
});
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #f8f9fa;
  padding: 10px;
}
</style>
