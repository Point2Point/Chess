<template>
  <form novalidate class="md-layout" @submit.prevent="onSubmit">
    <div class="form-content">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('login')">
                <label for="login">Login</label>
                <md-input name="login" id="login" v-model="form.login" :disabled="sending"></md-input>
                <span class="md-error" v-if="!$v.form.login.required">The login is required</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input name="password" id="password" v-model="form.password" type="password"
                          :disabled="sending"></md-input>
                <span class="md-error" v-if="!$v.form.password.required">
                The password is required
              </span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending"/>
        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary">Login</md-button>
          <router-link to="/registration">
            <md-button>Registration</md-button>
          </router-link>
        </md-card-actions>
      </md-card>
    </div>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import {
    required,
  } from 'vuelidate/lib/validators';

  export default {
    name: 'login-form',
    mixins: [validationMixin],
    data: () => ({
      form: {
        login: null,
        password: null,
      },
      sending: false,
    }),
    validations: {
      form: {
        login: {
          required,
        },
        password: {
          required,
        },
      },
    },
    methods: {
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName];

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty,
          };
        }
      },
      logIn() {
        this.sending = true;
        window.setTimeout(() => {
          this.sending = false;
          this.$router.push('game')
        }, 500);
      },
      onSubmit() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          console.log(this.form.login, this.form.password);
          this.logIn();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  form {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .form-content {
    padding-top: 10%;
    display: flex;
    justify-content: center;
    text-align: center;
    width: 50%;
  }
</style>
