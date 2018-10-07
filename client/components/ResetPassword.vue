<template>
  <div>
    <div v-if="error" class="notification is-error">
      <span>{{ error }}</span>
    </div>
    <form @submit.prevent="submit">
      <v-input
        v-model="password"
        type="password"
        name="password"
        validate="required|min:5">
      </v-input>
      <v-input
        v-model="passwordConfirmation"
        :validate="{ rules: { required: true, is: password } }"
        type="password"
        name="passwordConfirmation">
      </v-input>
      <button class="button is-primary" type="submit">
        Change password
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { withValidation } from '@/validation';
import VInput from '@/components/common/form/VInput';

export default {
  mixins: [withValidation()],
  data() {
    return {
      error: null,
      password: '',
      passwordConfirmation: ''
    };
  },
  methods: {
    ...mapActions(['resetPassword']),
    submit() {
      const token = this.$route.params.token;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) return;
        return this.resetPassword({ password: this.password, token })
          .then(() => this.$router.push({ name: 'login' }))
          .catch(() => (this.error = 'An error has occurred!'));
      });
    }
  },
  components: { VInput }
};
</script>
