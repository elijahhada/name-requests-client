<template>
  <div>
    <Navbar/>
    <div class="container">
      <h3>Все запросы</h3>
      <table class="table">
        <tbody>
          <tr>
            <td>
              <label for="filterName">По имени</label>
              <input v-model="filterName" type="text" id="filterName" class="form-control">
            </td>
            <td>
              <select v-model="filterStatus" class="form-control">
                <option selected="selected">Статус</option>
                <option value="1">Создано</option>
                <option value="2">Одобрено</option>
                <option value="3">Отклонено</option>
              </select>
            </td>
            <td>
              <input v-model="filterDate" type="date" class="form-control">
            </td>
            <td>
              <button @click="applyFilters" class="btn btn-success">Найти</button>
              <button @click="resetFilters" class="btn btn-primary">Сбросить фильтры</button>
            </td>
            <td>
              <label for="decisionText">Причина отклонения</label>
              <input v-model="subject" type="text" id="decisionText" class="form-control">
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Все запросы</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Имя</th>
            <th scope="col">Статус</th>
            <th scope="col">Дата статуса</th>
            <th scope="col">Решение</th>
            <th scope="col">Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.status.title }}</td>
            <td>{{ item.updated_at }}</td>
            <td>
              <button @click="makeDecision(item.id, 2)" class="btn btn-success">Подтвердить</button>
              <button @click="makeDecision(item.id, 3)" class="btn btn-danger">Отклонить</button>
            </td>
            <td>
              {{ item.description }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from '../http-common'

export default {
  name: 'RequestList',
  components: {
    Navbar
  },
  data() {
    return {
      list: [],
      decisionText: '',
      subject: '',
      filterName: '',
      filterStatus: 0,
      filterDate: ''
    }
  },
  mounted() {
    this.fetchAllNames()
  },
  methods: {
    fetchAllNames() {
      axios.get('/requests/list')
      .then(res => {
        console.log(res)
        this.list = res.data.data
      })
      .catch(e => {
        console.log(e)
      })
    },
    makeDecision(nameId, statusId) {
      const data = {
        "id": nameId,
        "status_id": statusId,
        "description": this.subject
      }
      axios.post('/requests/decide', data)
      .then(res => {
        console.log(res)
        this.fetchAllNames()
        this.subject = ''
      })
      .catch(e => {
        console.log(e)
        this.subject = ''
      })
    },
    applyFilters() {
      const data = {
        "name": this.filterName,
        "status_id": this.filterStatus,
        "date": this.filterDate
      }
      axios.post('/requests/filtered', data)
      .then(res => {
        console.log(res)
        this.list = res.data.data
      })
      .catch(e => {
        console.log(e)
      })
    },
    resetFilters() {
      this.filterName = '',
      this.filterStatus = 0,
      this.filterDate = ''
    }
  }
}
</script>