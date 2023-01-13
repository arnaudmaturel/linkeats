<template>
    <v-card class="mx-auto" max-width="800">
        <v-card-title>
            Register a new account
        </v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field> 

                <v-text-field v-model="lastName" :rules="nameRules" label="Last Name" required></v-text-field>

                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

                <v-text-field v-model="password" :rules="passRules" label="Password" required></v-text-field>

                <v-text-field v-model="repeatPassword" :rules="repeatPassRules" label="Repeat password" required></v-text-field>

                <v-btn color="success" class="mr-4" @click="validate">
                    Create
                </v-btn>

                <v-btn color="error" class="mr-4" href="/login">
                    Already have an account?
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      lastName: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      repeatPassword: '',
      passRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password at least 8 characters',
      ],
      repeatPassRules: function() {
        if (this.password === this.repeatPassword) {
          return true
        } else {
          return 'Passwords does not match.'
        }
      }
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      }
    },
  }
</script>
