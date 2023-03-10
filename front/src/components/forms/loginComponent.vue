<template>
    <v-card class="mx-auto" max-width="800">
        <v-card-title>
            Se connecter à votre compte
        </v-card-title>

        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>
                <v-text-field v-model="name" label="E-mail or Username" required></v-text-field>

                <v-text-field v-model="password" :rules="passRules" label="Password" required></v-text-field>
            </v-card-text>

            <v-card-actions>
                <!--<v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>-->

                <v-btn color="success" class="mr-4" @click="validate">
                    Se connecter
                </v-btn>

                <v-btn color="error" class="mr-4" href="/register">
                    Pas de compte?
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      checkbox: false
    }),

    methods: {
      async validate () {
        const { valid } = await this.$refs.form.validate()

        if (valid) alert('Form is valid')
      }
    },
  }
</script>
