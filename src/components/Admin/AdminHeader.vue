<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ name: 'first' }">Gestion des tâches</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li v-if="!showLinks" class="nav-item">
              <router-link class="nav-link" :to="{ name: 'admin.login' }">Se Connecter</router-link>
            </li>
            <li v-if="!showLinks" class="nav-item">
              <router-link class="nav-link" :to="{ name: 'admin.register' }">S'Enregistrer</router-link>
            </li>
            <li v-else class="nav-item">
              <a
                aria-current="page"
                href=""
                @click.prevent="logout"
                class="nav-link"
              >
                Se déconnecter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showLinks: localStorage.getItem('token') ? true : false,
      };
    },
  
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push({ name: 'admin.login' });
      },
    },
  };
  </script>
  