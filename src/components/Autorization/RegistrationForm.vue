<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="onSubmit">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Register</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="firstName">First Name</label>
                <md-input name="firstName" id="firstName" v-model="form.firstName" :disabled="sending"></md-input>
                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="lastName">Last Name</label>
                <md-input name="lastName" id="lastName" v-model="form.lastName" :disabled="sending"></md-input>
                <span class="md-error" v-if="!$v.form.lastName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email"
                          :disabled="sending"/>
                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('login')">
                <label for="login">Login</label>
                <md-input name="login" id="login" v-model="form.login" :disabled="sending"></md-input>
                <span class="md-error" v-if="!$v.form.login.required">The login is required</span>
                <span class="md-error" v-else-if="!$v.form.login.email">Invalid login</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('age')">
                <label for="age">Age</label>
                <md-input type="number" id="age" name="age" autocomplete="age" v-model="form.age" :disabled="sending"/>
                <span class="md-error" v-if="!$v.form.age.required">The age is required</span>
                <span class="md-error" v-else-if="!$v.form.age.maxlength">Invalid age</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Password</label>
                <md-input name="password" id="password" v-model="form.password" type="password"
                          :disabled="sending"></md-input>
                <span class="md-error" v-if="!$v.form.password.required">The password name is required</span>
                <span class="md-error" v-if="!$v.form.password.minLength">Invalid password</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('repeatPassword')">
                <label for="repeatPassword">Password confirmation</label>
                <md-input name="repeatPassword" id="repeatPassword" v-model="form.repeatPassword" type="password"
                          :disabled="sending"></md-input>
                <span class="md-error" v-if="!$v.form.repeatPassword.required">The password name is required</span>
                <span class="md-error" v-if="!$v.form.repeatPassword.minLength">Invalid password</span>
                <span class="md-error" v-if="!$v.form.repeatPassword.sameAsPassword && $v.form.repeatPassword.required && $v.form.repeatPassword.minLength">Passwords are different</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending"/>
        <md-card-actions>
          <md-button type="submit" class="md-raised md-primary">Register</md-button>
          <router-link to="/login" style="padding-left: 5px;">
            <md-button class="md-raised md-accent">Cancel</md-button>
          </router-link>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import {
    required,
    email,
    minLength,
    maxLength,
    sameAs,
  } from 'vuelidate/lib/validators';
  import {HttpClient} from "../../classes/HttpClient";

  export default {
    name: 'registration-form',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: null,
        lastName: null,
        email: null,
        login: null,
        age: null,
        password: null,
        repeatPassword: null,
      },
      sending: false,
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        email: {
          required,
          email
        },
        login: {
          required,
          minLength: minLength(3)
        },
        age: {
          required,
          maxLength: maxLength(3)
        },
        password: {
          required,
          minLength: minLength(6)
        },
        repeatPassword: {
          required,
          minLength: minLength(6),
          sameAsPassword: sameAs('password'),
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
      registration() {
        const registrationData = {
          login: this.$v.form.login,
          password: this.$v.form.password
        };
        this.sending = true;
        HttpClient.post(`${this.$store.state.baseUrl}/register`,registrationData)
          .then(res => {
            this.$router.push('login')
            this.sending = false;
          })
      },
      onSubmit() {

        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.registration();
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
    padding-top: 10%;
    display: flex;
    justify-content: center;
    text-align: center;
  }
</style>
