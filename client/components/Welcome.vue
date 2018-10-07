<template>
  <div>
    <navbar></navbar>
    <div class="is-uppercase">Welcome</div>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar';

export default {
  name: 'welcome',
  components: { Navbar }
};
</script>
