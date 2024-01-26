<template>
    <div class="container">
      <AdminHeader />
      <div class="row justify-content-center">
        <div class="col-sm-6 mt-4">
          <form @submit.prevent="register()">
            <div class="mb-3">
              <label for="name" class="form-label">Nom complet:</label>
              <input type="name" class="form-control" v-model="form.name" id="name" />
              <p class="text-danger" v-if="errors && errors.name">{{ errors['name'][0] }}</p>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Adresse Email:</label>
              <input type="email" class="form-control" v-model="form.email" id="email" />
              <p class="text-danger" v-if="errors && errors.email">{{ errors['email'][0] }}</p>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Mot de passe:</label>
              <div class="input-group">
                <input type="password" class="form-control" v-model="form.password" id="password" />
                <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                  <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                </button>
              </div>
              <p class="text-danger" v-if="errors && errors.password">{{ errors['password'][0] }}</p>
            </div>
            <div class="mb-3">
              <label for="confirm_password" class="form-label">Confirmer mot de passe:</label>
              <input type="password" class="form-control" v-model="form.confirm_password" id="confirm_password" />
              <p class="text-danger" v-if="errors && errors.confirm_password">{{ errors['confirm_password'][0] }}</p>
            </div>
            <button type="submit" class="btn btn-primary mt-3">Enrégistrer</button>
          </form>
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
        form: {
          name: '',
          email: '',
          password: '',
          confirm_password: ''
        },
        errors: [],
        showPassword: false // Utilisation directe d'un boolean plutôt que ref
      };
    },
    methods: {
      register() {
        this.errors = [];
        axios.get(this.$hostname + '/sanctum/csrf-cookie').then(response => {
          axios.post(this.$hostname + '/api/register', this.form).then(response => {
            if (response.data.success) {
              localStorage.setItem('token', response.data.data.token)
              this.$router.push({ name: 'admin.dashboard' })
            }
          }).catch((e) => {
            this.errors = e.response.data.message;
          })
        });
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      }
    }
  }
  </script>
  