<template>
    <div>
      <!-- Barre de navigation -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <p class="navbar-brand">Gestion des tâches</p>
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
        </div>
      </nav>
  
      <!-- Contenu de la page -->
      <div class="container mt-5 text-center">
        <h1 class="display-4">Bienvenue dans l'Application de Gestion de Tâches</h1>
        <p class="lead">
          Cette application vous permet de gérer efficacement vos tâches au quotidien.
        </p>
        <div class="button-container mt-4">
          <router-link class="btn btn-primary custom-btn" :to="{ name: 'admin.login' }">Se connecter</router-link>
          <router-link class="btn btn-success custom-btn" :to="{ name: 'admin.register' }">S'enregistrer</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Vous pouvez supprimer les styles redondants si vous le souhaitez */
  
  .container {
    padding-top: 2rem; /* Espace entre la barre de navigation et le contenu */
  }
  
  .custom-btn {
    font-size: 1.2rem;
    margin: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
  }
  
  .btn-success {
    background-color: #28a745;
    border-color: #28a745;
    color: #fff;
  }
  </style>
  