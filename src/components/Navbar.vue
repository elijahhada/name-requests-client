<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand">Awesome App</a>
        <div class="d-flex">
          <router-link to="/" class="nav-link default-link">Запросить имя</router-link>
          <router-link to="/list" class="nav-link default-link">Список запросов</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>
.default-link {
  color: black;
  border-radius: 5rem;
}

.default-link:hover {
  cursor: pointer;
  color: aqua;
  background-color: darkolivegreen;
}
</style>
