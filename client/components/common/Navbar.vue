<template>
  <nav
    class="navbar is-fixed-top is-light"
    role="navigation"
    aria-label="main navigation">
    <div class="navbar-menu">
      <div v-if="user" class="navbar-end">
        <div class="navbar-item">{{ user.username }}</div>
        <a @click="logout" href="#" class="navbar-item">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'app-navbar',
  computed: mapState(['user']),
  methods: mapActions(['logout']),
  mounted() {
    document.documentElement.classList.add('has-navbar-fixed-top');
  }
};
</script>
