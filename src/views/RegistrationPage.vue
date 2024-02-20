<template>
  <div v-if="!isLoggedIn" class="registration-form">
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
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
      <button type="submit" class="register-btn">Зарегистрироваться</button>
      <div class="button-group">
        <router-link class="back-btn" to="/">Назад</router-link>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Вы уже авторизованы.</p>
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

const register = async () => {
  // Проверка валидности email и пароля перед регистрацией
  validateEmail();
  validatePassword();

  if (!emailError.value && !passwordError.value) {
    try {
      const user = { email: email.value, password: password.value };
      const token = await api.register(user); // Используем ваш API для регистрации
      store.commit('setUser', token); // Сохраняем токен пользователя в хранилище Vuex
      // Переход на другую страницу, например, на главную страницу
      router.push({ name: 'catalog' });
    } catch (error) {
      console.error('Ошибка регистрации:', error.message);
    }
  }
};

const redirectToCatalog = () => {
  router.push({name: 'catalog'});
};

</script>

<style scoped>
.registration-form {
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

.register-btn {
  width: 100%; /* Ширина кнопки */
  padding: 10px; /* Внутренний отступ */
  border-radius: 5px; /* Скругление краев кнопки */
  border: none; /* Убираем границу */
  background-color: #A0522D; /* Цвет кнопки */
  color: white; /* Цвет текста */
  cursor: pointer; /* Изменяем курсор при наведении */
  transition: background-color 0.3s ease; /* Плавное изменение цвета кнопки */
  margin-bottom: 10px;
}

.register-btn:hover {
  background-color: #8B4513; /* Цвет кнопки при наведении */
}

.back-btn {
  width: 100%; /* Ширина кнопки */
  padding: 10px; /* Внутренний отступ */
  border-radius: 5px; /* Скругление краев кнопки */
  border: none; /* Убираем границу */
  color: #8B4513; /* Цвет текста */
  margin-top: 10px; /* Отступ сверху */
}

.button-group {
  margin-top: 10px;
}
</style>
