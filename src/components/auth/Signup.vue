<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Sign Up</h2>

      <div class="field">
        <label for="email">email:</label>
        <input type="email" name="email" v-model="email">
      </div>

      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>

      <div class="field">
        <label for="alias">Alias:</label>
        <input type="text" name="alias" v-model="alias">
      </div>

      <p class="red-text" v-if="feedback">{{ feedback }}</p>

      <div class="field center">
        <button class="btn btn-deep-purple">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      slug: null,
      feedback: null
    }
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          lower: true,
          remove: /[$*_+~.()'"!\-:@]/g
        })
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = 'This name is already taken '
          } else {
            this.feedback = 'This is free'
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
              ref.set({
                alias: this.alias,
                geolocation: null,
                user_id: cred.user.uid
              })
            }).then(() => this.$router.push({ name: 'GMap' }))
            .catch(err => {
              console.log(err)
              this.feedback = err.message
            })
          }
        })
        console.log(this.slug)
      } else {
        this.feedback = "You must fill out all fields to continue"
      }
    }
  }
}
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 100px;
}
.h2 {
  font-size: 2.4em;
}
.field {
  margin-bottom: 16px;
}
</style>
