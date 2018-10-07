<template>
  <div>
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
      <div class="options">
        <button class="button is-primary" type="submit">
          Reset email
        </button>
        <router-link :to="{ name: 'login' }">Back</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { withValidation } from '@/validation';
import isEmpty from 'lodash/isEmpty';
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
  components: { VInput }
};
</script>

<style lang="scss" scoped>
.options {
  padding: 5px 0 10px 0;
  text-align: right;

  a {
    display: inline-block;
    padding: 6px 20px;
  }
}
</style>
