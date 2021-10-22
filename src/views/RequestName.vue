<template>
  <div>
    <Navbar/>
    <div class="container">
      <p v-if="!isValid" class="alert">Что-то пошло не так, пожалуйста проверьте имя и или пароль</p>
      <h3>Заказать имя отправителя</h3>
      <label for="name">Введите имя</label>
      <input v-model="name" type="text" id="name" placeholder="Sam" class="form-control">
      <label for="email">Email на который Вы получите уведомление</label>
      <input v-model="email" type="text" id="email" placeholder="example@gmail.com" class="form-control">
      <button v-bind:disabled="btnIsActive" @click="storeName" class="btn btn-primary">Отправить</button>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from '../http-common'

export default {
  name: 'RequestName',
  components: {
    Navbar
  },
  data() {
    return {
      name: '',
      email: '',
      isValid: true,
      btnIsActive: true
    }
  },
  mounted() {
    this.validateInput()
  },
  methods: {
    storeName() {
      const data = {
        "name": this.name,
        "email": this.email
      }
      axios.post('/requests/add', data)
      .then(res => {
        console.log(res)
        this.name = ''
        this.email = ''
      })
      .catch(e => {
        console.log(e)
        this.name = ''
        this.email = ''
        this.isValid = false
      })
    },
    validateInput() {
      if(this.name.length < 3 || this.name.length > 11) {
        this.btnIsActive = true
      } else {
        this.btnIsActive = false
      }
    }
  }
}
</script>
