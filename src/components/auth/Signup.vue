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
      if (this.alias) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          lower: true,
          remove: /[$*_+~.()'"!\-:@]/g
        })
        let ref = db.collection('users').doc(this.slug)
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This name is taken"
          } else {
            this.feedback = 'This is free'
          }
        })
        console.log(this.slug)
      } else {
        this.feedback = "You must enter an alias to continue"
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
