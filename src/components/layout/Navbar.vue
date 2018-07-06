<template lang="html">
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{ name: 'GMap' }" class="brand-logo  left">GeoWizards!</router-link>
        <ul class="right">
          <li v-if="!user"><router-link :to="{ name: 'Signup', params: {} }">Sign up</router-link></li>
          <li v-if="!user"><router-link :to="{ name: 'Login' }">Log In</router-link> </li>
          <li v-if="user">{{ user.email }}</li>
          <li v-if="user"><a @click="logout">Log out</a>  </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data() {
    return {
      user: null
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
      this.$router.push({ name: 'Login' })
      })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  }
}
</script>

<style lang="css">
</style>
