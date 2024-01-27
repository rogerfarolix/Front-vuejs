<template>
    <div class="container">
      <AdminHeader />
      <div class="row justify-content-center">
        <div class="col-8">
            <button type="button" @click="goBack" class="btn btn-secondary mb-3">Retour</button>
          <div class="card mt-4">
            <div class="card-header bg-primary text-white">
              <h2 class="text-center">Ajouter une tâche</h2>
            </div>
            <div class="card-body">
              <form enctype="multipart/form-data" @submit.prevent="submit()">
                <div class="form-group">
                  <label for="title">Titre:</label>
                  <input type="text" class="form-control" v-model="form.title" id="title" />
                  <p class="text-danger" v-if="errors && errors.title">{{ errors['title'][0] }}</p>
                </div>
                <div class="form-group">
                  <label for="description">Description:</label>
                  <textarea class="form-control" v-model="form.description" id="description" rows="3"></textarea>
                  <p class="text-danger" v-if="errors && errors.description">{{ errors['description'][0] }}</p>
                </div>
                <div class="form-group">
                  <label for="status">Statut:</label>
                    <select v-model="form.status" class="form-control" id="status">
                      <option value="non_debute">Non débuté</option>
                      <option value="en_cours">En cours</option>
                      <option value="termine">Terminé</option>
                    </select>
                    <p class="text-danger" v-if="errors && errors.status">{{ errors['status'][0] }}</p>
                </div>

                <div class="form-group">
                  <label for="published">Date:</label>
                  <input type="date" class="form-control" v-model="form.published" id="published" />
                  <p class="text-danger" v-if="errors && errors.published">{{ errors['published'][0] }}</p>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">Valider</button>
                </div>
              </form>
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
    methods: {
      submit() {
        this.errors = [];
        const config = {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'token': this.token,
            'content-type': 'multipart/form-data'
          }
        }
        let data = new FormData();
  
        data.append('title', this.form.title)
        data.append('description', this.form.description)
        data.append('status', this.form.status)
        data.append('published', this.form.published)
  
        axios.get(this.$hostname + '/sanctum/csrf-cookie').then(response => {
          axios.post(this.$hostname + '/api/task', data, config).then(response => {
            if (response.data.success) {
              alert("Tâche enregistrée!")
              this.goBack()
            }
          }).catch((e) => {
            this.errors = e.response.data.errors;
          })
        });
      },
      goBack() {
        this.$router.push({ name: 'admin.dashboard' })
      }
    }
  }
  </script>
  