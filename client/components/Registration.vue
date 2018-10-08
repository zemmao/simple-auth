<template>
  <div>
    <div v-if="error" class="notification is-error">
      <span>{{ error }}</span>
    </div>
    <form @submit.prevent="submit">
      <v-input
        v-model="username"
        name="username"
        validate="required">
      </v-input>
      <v-input
        v-model="email"
        name="email"
        validate="required|email|max: 255|unique-email">
      </v-input>
      <button class="button is-primary" type="submit">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { withValidation } from '@/validation';
import isEmpty from 'lodash/isEmpty';
import request from '@/api/request';
import VInput from '@/components/common/form/VInput';

export default {
  name: 'registration',
  mixins: [withValidation()],
  data() {
    return {
      error: null,
      username: '',
      email: ''
    };
  },
  methods: {
    ...mapActions(['register']),
    submit() {
      this.$validator.validateAll().then(isValid => {
        if (!isValid) return;
        return this.register({ username: this.username, email: this.email })
          .then(() => this.$router.push({ name: 'login' }))
          .catch(() => (this.error = 'An error has occurred!'));
      });
    }
  },
  mounted() {
    if (this.$validator.rules['unique-email']) return;
    this.$validator.extend('unique-email', {
      getMessage: field => `The ${field} is not unique.`,
      validate: email => {
        return request.get('/users', { params: { email } })
          .then(res => ({ valid: isEmpty(res.data.data) }));
      }
    });
  },
  components: { VInput }
};
</script>
