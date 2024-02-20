<template>
  <div class="login-form">
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <div class="form-group" :class="{ 'has-error': emailError }">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required @input="validateEmail">
        <span v-if="emailError" class="error-message">Неверный формат email</span>
      </div>
      <div class="form-group" :class="{ 'has-error': passwordError }">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required @input="validatePassword">
        <span v-if="passwordError" class="error-message">Пароль должен быть не менее 6 символов</span>
      </div>
      <button type="submit" class="login-btn">Войти</button>
      <router-link v-if="!isLoggedIn" to="/registration" class="register-link">Зарегистрироваться</router-link>
    </form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import api from '@/services/api'; // Импорт вашего API

const store = useStore();
const email = ref('');
const password = ref('');
const emailError = ref(false);
const passwordError = ref(false);

const isLoggedIn = computed(() => !!store.state.currentUser);

const validateEmail = () => {
  // Пример простой валидации email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = !emailPattern.test(email.value);
};

const validatePassword = () => {
  passwordError.value = password.value.length < 6;
};

const login = async () => {
  try {
    const user = { email: email.value, password: password.value };
    const token = await api.login(user); // Используем ваш API для аутентификации
    store.commit('setUser', token); // Сохраняем токен пользователя в хранилище Vuex
    // Переход на другую страницу, например, на главную страницу
    router.push({ name: 'catalog' });
  } catch (error) {
    console.error('Ошибка входа:', error.message);
  }
};

</script>

<style scoped>
.login-form {
  width: 300px; /* Ширина формы */
  margin: 15px auto; /* Отступы сверху и снизу, выравнивание по центру */
  padding: 20px;
  border-radius: 10px; /* Скругление краев */
  background-color: #FFE4C4; /* Цвет фона формы */
}

.form-group {
  margin-bottom: 15px; /* Отступ между элементами формы */
}

label {
  display: block; /* Каждый label с новой строки */
  margin-bottom: 5px; /* Отступ между label и input */
}

input[type="email"],
input[type="password"] {
  width: 250px; /* Ширина input */
  padding: 8px; /* Внутренний отступ */
  border-radius: 5px; /* Скругление краев input */
  border: 1px solid #ccc; /* Обводка input */
}

.has-error input[type="email"],
.has-error input[type="password"] {
  border-color: red; /* Цвет границы при ошибке */
}

.error-message {
  color: red; /* Цвет сообщения об ошибке */
  font-size: 12px; /* Размер текста сообщения об ошибке */
}

.login-btn {
  width: 100%; /* Ширина кнопки */
  padding: 10px; /* Внутренний отступ */
  border-radius: 5px; /* Скругление краев кнопки */
  border: none; /* Убираем границу */
  background-color: #A0522D; /* Цвет кнопки */
  color: white; /* Цвет текста */
  cursor: pointer; /* Изменяем курсор при наведении */
  transition: background-color 0.3s ease; /* Плавное изменение цвета кнопки */
}

.login-btn:hover {
  background-color: #8B4513; /* Цвет кнопки при наведении */
}

.register-link {
  display: block; /* Сделаем ссылку блочным элементом */
  text-align: center; /* Выравниваем по центру */
  margin-top: 10px; /* Отступ сверху */
  color: #A0522D; /* Цвет текста ссылки */
}
</style>
