<template>
    <div class="container">
      <AdminHeader />
      <div class="row justify-content-center">
        <div class="col-sm-6 mt-4">
          <div class="card">
            <div class="card-body">
                <button type="button" @click="goBack" class="btn btn-secondary mb-3">Retour</button>
              <h2 class="text-primary text-center">Modifier la tâche</h2>
              <form enctype="multipart/form-data" @submit.prevent="update">
                <div class="row">
                  <div class="form-group mt-2 col-6">
                    <label for="title">Titre:</label>
                    <input type="text" class="form-control" v-model="form.title" id="title" />
                    <p class="text-danger" v-if="errors && errors.title">{{ errors['title'][0] }}</p>
                  </div>
                </div>
                <div class="form-group mt-2">
                  <label for="description">Description:</label>
                  <textarea class="form-control" v-model="form.description" id="description" rows="3"></textarea>
                  <p class="text-danger" v-if="errors && errors.description">{{ errors['description'][0] }}</p>
                </div>
                <div class="row">
                  <div class="form-group mt-2 col-6">
                    <label for="status">Statut:</label>
                    <input type="text" class="form-control" v-model="form.status" id="status" />
                    <p class="text-danger" v-if="errors && errors.status">{{ errors['status'][0] }}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group mt-2 col-6">
                    <label for="published">Date de publication:</label>
                    <input type="date" class="form-control" v-model="form.published" id="published" />
                    <p class="text-danger" v-if="errors && errors.published">{{ errors['published'][0] }}</p>
                  </div>
                </div>
                <div class="mt-2 row">
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary">Mettre à jour</button>
                  </div>
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
      update() {
        this.errors = [];
        const config = {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'content-type': 'multipart/form-data'
          },
        }
  
        let data = new FormData();
  
        data.append('_method', 'put')
        data.append('title', this.form.title)
        data.append('description', this.form.description)
        data.append('status', this.form.status)
        data.append('published', this.form.published)
  
        axios.get(this.$hostname + '/sanctum/csrf-cookie').then(response => {
          axios.post(this.$hostname + '/api/task/' + this.id, data, config).then(response => {
            if (response.data.success) {
              alert("Tâche modifiée!")
              this.goBack()
            }
          }).catch((e) => {
            this.errors = e.response.data.errors;
          })
        });
      },
      uploadFile(e) {
        this.form.file = e.target.files[0];
      },
      goBack() {
        this.$router.push({ name: 'admin.dashboard' })
      }
    }
  }
  </script>
  