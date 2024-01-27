<template>
    <div class="container">
      <AdminHeader />
      <div class="row mt-2">
        <div class="col-lg-4"></div>
        <div class="col-lg-6 col-md-12">
          <form class="d-flex center" @submit.prevent="getData">
            <input class="form-control me-2" @input="getData" v-model="search" type="search" placeholder="Rechercher une tâche..." aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Rechercher</button>
          </form>
        </div>
        <div class="col-lg-2 col-md-12 mt-2">
          <button type="button" @click="addTask" class="btn btn-secondary">Ajouter une tâche</button>
        </div>
        <div class="row mt-3">
      <div class="col-md-12">
        <div class="card custom-cards">
          <div class="card-body">
            <h4 class="card-title text-center">Statistiques des tâches</h4>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card custom-card">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">Nombre total de tâches</h6>
            <p class="card-text text-center">{{ tableData.length }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card custom-card">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">Tâches non débutées</h6>
            <p class="card-text text-center">{{ getTaskCountByStatus('non_debute') }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card custom-card">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">Tâches en cours</h6>
            <p class="card-text text-center">{{ getTaskCountByStatus('en_cours') }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card custom-card">
          <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">Tâches terminées</h6>
            <p class="card-text text-center">{{ getTaskCountByStatus('termine') }}</p>
          </div>
        </div>
      </div>
    </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <p class="text-center fs-2" v-if="noData">Aucune tâches trouvées.</p>
              <table class="table table-bordered" v-else>
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">TITRE</th>
                    <th scope="col">STATUT</th>
                    <th scope="col">DATE</th>
                    <th scope="col">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in tableData" :key="data.id">
                    <td>{{ data.id }}</td>
                    <td>{{ data.title }}</td>
                    <td>
                      <span v-if="data.status=='non_debute'">Non débuté</span>
                      <span v-if="data.status=='en_cours'">En cours</span>
                      <span v-if="data.status=='termine'">Terminé</span>
                      <button @click.prevent="changeStatus(data)" class="btn btn-success ml-2" :disabled="data.status === 'Terminé'">
                        Changer Statut
                      </button>
                    </td>
                    <td>{{ data.published }}</td>
                    <td>
                      <router-link class="btn btn-primary m-1" :to="{ name: 'admin.edit', params: { id: data.id } }">Modifier</router-link>
                      <router-link class="btn btn-info m-1" :to="{ name: 'admin.show', params: { id: data.id } }">Détails</router-link>
                      <button @click.prevent="deleteTask(data.id, data.title)" class="btn btn-danger m-1">Supprimer</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="row">
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-end">
                    <li class="page-item" v-for="link in pagination.links">
                      <button class="page-link" :class="link.active ? 'active' : ''" @click="getPageData(link.url)" v-html="link.label"></button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AdminHeader from '../../components/Admin/AdminHeader.vue';
  
  export default {
    components: { AdminHeader },
    data() {
      return {
        search: '',
        tableData: [],
        errors: [],
        pagination: {
          links: [],
        },
        token: localStorage.getItem("token"),
        url: this.$hostname + "/api/task",
        noData: false
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        axios.get(this.url, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            token: this.token
          },
          params: {
            search: this.search
          }
        })
          .then(response => {
            this.tableData = response.data.data
            this.pagination.links = response.data.meta.links;
            if (this.tableData.length == 0) {
              this.noData = true
            } else {
              this.noData = false
            }
          })
          .catch(e => {
            this.errors.push(e);
          });
      },
      getPageData(url) {
        this.url = url;
        this.getData();
      },
      deleteTask(id, title) {
        if (confirm("Voulez-vous réellement supprimer la tâche " + title + "?")) {
          axios.delete(this.$hostname + "/api/task/" + id, {
            headers: {
              Authorization: `Bearer ${this.token}`,
              token: this.token
            }
          })
            .then(response => {
              if (response.data.success) {
                alert(title + "  supprimée.")
                this.getData()
              }
            })
            .catch(e => {
              this.errors.push(e);
            });
        }
      },
      addTask() {
        this.$router.push({ name: "admin.create" });
      },
      changeStatus(data) {
    let newStatus = '';

    if (data.status === 'Non débuté') {
      newStatus = 'En cours';
    } else if (data.status === 'En cours') {
      newStatus = 'Terminé';
    }

    if (newStatus !== '') {
      if (confirm(`Voulez-vous changer le statut de la tâche "${data.title}" à "${newStatus}"?`)) {
        axios.put(this.$hostname + "/api/task/" + data.id, { status: newStatus }, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            token: this.token
          }
        })
        .then(response => {
          if (response.data.success) {
            alert(`Le statut de la tâche "${data.title}" a été changé à "${newStatus}".`);
            data.status = newStatus; // Mettez à jour le statut localement
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
      }
    }
  },


  
      getTaskCountByStatus(status) {
        return this.tableData.filter(task => task.status === status).length;
      }
    }
  }
  </script>
  
  <style scoped>
  .custom-card {
    background-color: #5c93ca; /* Couleur de fond */
    border: 1px solid #dee2e6; /* Bordure */
    border-radius: 10px; /* Coins arrondis */
    margin-bottom: 10px; /* Marge en bas */  }

    .custom-cards {
    background-color: #8aec0a; /* Couleur de fond */
    border: 1px solid #dee2e6; /* Bordure */
    border-radius: 10px; /* Coins arrondis */
    margin-bottom: 10px; /* Marge en bas */  }
  </style>