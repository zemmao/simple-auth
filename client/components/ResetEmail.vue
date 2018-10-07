<template>
  <div>
    <navbar></navbar>
    <div v-if="error" class="notification is-error">
      <span>{{ error }}</span>
    </div>
    <form @submit.prevent="submit">
      <v-input
        v-model="email"
        type="email"
        name="email"
        validate="required|email|max: 255|unique-email">
      </v-input>
      <button class="button is-primary" type="submit">
        Reset email
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { withValidation } from '@/validation';
import isEmpty from 'lodash/isEmpty';
import Navbar from '@/components/common/Navbar';
import request from '@/api/request';
import VInput from '@/components/common/form/VInput';

export default {
  name: 'reset-email',
  mixins: [withValidation()],
  data() {
    return {
      error: null,
      username: '',
      email: ''
    };
  },
  computed: mapState(['user']),
  methods: {
    ...mapActions(['resetEmail', 'logout']),
    submit() {
        this.$validator.validateAll().then(isValid => {
          if (!isValid) return;
          const { email: newEmail, user: { email: oldEmail } } = this;
          return this.resetEmail({ newEmail, oldEmail })
            .then(() => this.logout())
            .catch(err => (this.error = 'An error has occurred!'));
      });
    },
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
  components: { Navbar, VInput }
};
</script>
