<template>
    <div class="container">
      <AdminHeader />
      <div class="row justify-content-center">
        <div class="col-sm-6 mt-4">
          <div class="card">
            <div class="card-body">
              <h2 class="text-primary text-center">Détails de la tâche</h2>
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">Titre</th>
                    <td>{{ form.title }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Description</th>
                    <td>{{ form.description }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Statut</th>
                    <td>{{ form.status }}</td>
                  </tr>
                  <tr>
                    <th scope="row">Date de publication</th>
                    <td>{{ form.published }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="mt-2 row">
                <div class="col-12">
                  <button type="button" @click="goBack" class="btn btn-secondary">Retour</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AdminHeader from '../../../components/Admin/AdminHeader.vue';
  
  export default {
    components: { AdminHeader },
    data() {
      return {
        id: this.$route.params.id,
        form: {
          title: "",
          description: "",
          status: "",
          published: "",
        },
        errors: [],
        token: localStorage.getItem("token")
      };
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        axios.get(this.$hostname + '/sanctum/csrf-cookie').then(response => {
          axios.get(this.$hostname + '/api/task/' + this.id, {
            headers: {
              'Authorization': `Bearer ${this.token}`,
            }
          }).then(response => {
            if (response.data.success) {
              this.form = response.data.data;
            }
          })
        });
      },
      goBack() {
        this.$router.push({ name: 'admin.dashboard' })
      }
    }
  }
  </script>
  