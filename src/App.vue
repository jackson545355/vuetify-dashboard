<template>
  <nav>
    <RouterLink to="/dashboard/Home">Home aaa</RouterLink>
    <RouterLink to="/dashboard/Product">Product</RouterLink>
    <RouterLink to="/dashboard/Comments">Comments</RouterLink>
    <RouterLink to="/dashboard/Management">Management</RouterLink>
  </nav>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* Add your styles here */
nav {
  display: flex;
  gap: 10px;
}
</style>
