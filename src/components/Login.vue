<template>
  <div>
    <LoginForm />
  </div>
</template>
<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'login',
  components: {
    LoginForm,
  },
};
</script>
<style lang="scss" scoped>
  .md-content {
    width: 200px;
    height: 200px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
</style>
