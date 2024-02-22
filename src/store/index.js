import index, { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    products: [],
    realCart: [],
    orders: [],
    cartItems: [],
    fio: '',
    email: '',
    password: '',
    user_token: null,
    user_auth: false
  },
  mutations: {

    addToCart(state, product){
      let item = product;
      item = {...item, quantity: 1};
      if(state.realCart.length > 0){
        let bool = state.realCart.some(i => i.id === item.id);
        if(bool){
          let itemIndex = state.realCart.findIndex(el => el.id === item.id);
          state.realCart[itemIndex]['quantity'] += 1;
        }
        else{
          state.realCart.push(item);
        }
      }
      else{
        state.realCart.push(item);
      }
    },
    removeFromCart(state, product){
      if(state.realCart.length > 0){
        let bool = state.realCart.some(i => i.id === product.id);

        if(bool){
          let index = state.realCart.findIndex(el => el.id === product.id);
          if(state.realCart[index]['quantity'] !== 0){
            state.realCart[index]['quantity'] -= 1;
          }
        }

      }
    },
    delFromCart(state, product){
      let indexCart = state.realCart.indexOf(product);
      state.realCart.splice(indexCart, 1);
    },
    orderCreate(state){
      let newOrders = state.realCart.map(item => ({...item}));
      state.orders.push(newOrders);
      state.realCart.splice(0, state.realCart.length);
      console.log(state.orders);
    },


    setCartItems(state, cartItems) {
      state.cartItems = cartItems;
    },


    async fetchProducts(state){
      const {data} = await axios.get('https://jurapro.bhuser.ru/api-shop/products')
          .then(response => state.products = response.data)
          .catch(error =>{console.log(error)})
      state.products = data;
    },
    async login(state){
      let userInfo = {
        email: state.email,
        password: state.password
      }
      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/login', userInfo)
          .then(function(response) {
            state.user_token = response.data.data.user_token;
            localStorage.token = state.user_token;
          })
          .catch(error =>{console.log(error)})

      console.log(data);
      console.log(state.user_token);

      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/";
      }
    },
    async registration(state){
      let userInfo = {
        fio: state.fio,
        email: state.email,
        password: state.password
      }
      const data = await axios.post('https://jurapro.bhuser.ru/api-shop/signup', userInfo)
          .then(function (response) {
            console.log(response);
            state.user_token = response.data.data.user_token;
            localStorage.token = state.user_token;
          })
          .catch(error =>{console.log(error)})
      console.log(data)
      console.log(state.user_token)

      if(localStorage.token !== undefined && localStorage.token !== null){
        window.location.href = "/login";
      }
    },
    logout(state){
      state.user_token = null;
      localStorage.clear();
    }
  },
  actions: {
    async fetchCartItems({ commit }) {
      try {
        const response = await axios.get('https://jurapro.bhuser.ru/api-shop/cart');
        const cartItems = response.data.data;
        commit('setCartItems', cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    async addToCart({ commit }, product) {
      try {
        const response = await axios.post(`https://jurapro.bhuser.ru/api-shop/cart/{product.id}`);
        console.log('Добавление товара в корзину');
        console.log('URL:', response.config.url);
        console.log('Method:', response.config.method);
        console.log('Успех');
        console.log('Status:', response.status);
        console.log('Content-Type:', response.headers['content-type']);
        console.log('Body:', response.data);
        // выполните мутацию для добавления товара в состояние корзины, если это необходимо
        commit('addToCart', product);
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  }
})
