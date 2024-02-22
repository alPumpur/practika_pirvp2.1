<template>
  <div class="login-container">
    <div class="form-header">
      <router-link class="exit-button" to="/">Назад</router-link>
    </div>
    <form @submit.prevent="store.commit('login')" class="login-form">
      <label>Логин(электронная почта) </label>
      <input type="email" required v-model="store.state.email">
      <label>Пароль </label>
      <input type="password" required v-model="store.state.password">
      <input type="submit" value="Войти">
    </form>
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
.login-container {
  background-color: #FDF5E6;
  border-radius: 20px;
  padding: 20px;
  width: 1600px;
  margin: 0 auto;
}

.form-header {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;
}

.login-form {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 0 0 20px 20px;
}

form {
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin: 0 auto;
  display: flex;
}

input {
  font-size: 18px;
  height: 25px;
}

input:not(:last-child) {
  margin-bottom: 20px;
}

input[type=submit] {
  cursor: pointer;
  color: aliceblue;
  border-radius: 8px;
  border: none;
  background-color: #A0522D;
  width: 150px;
  height: 40px;
  margin: 0 auto;
  font-family: FreeMono, monospace;
  font-size: 19px;
}

.exit-button {
  font-size: 18px;
  color: aliceblue;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  background-color: #A0522D;
  display: flex;
  width: 100px;
  height: 45px;
  border-radius: 5px;
}
</style>
