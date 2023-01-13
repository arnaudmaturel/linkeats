<template>
    <v-container>
        <v-card class="mx-auto px-2 py-2" max-width="400" :id="tagBorder" elevation="24" outlined>         
            <v-card class="mx-auto px-5 py-5" id="loginInfoInside" outlined elevation="0">
                 <v-form v-model="form" @submit.prevent="onSubmit">
                    <h5>Sign In</h5>
                    <br />
                    <h6>Login / Email</h6>
                    
                    <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
                        color="rgb(255, 152, 0)" variant="outlined" solo="true"
                        placeholder="Enter your E-mail or login">
                    </v-text-field>

                    <h6>Password</h6>
                    <v-text-field v-model="password" type="password" :readonly="loading" :rules="[required]" clearable
                        placeholder="Enter your password" variant="outlined" color="rgb(255, 152, 0)">
                    </v-text-field>
                    <br>
                    <v-btn :disabled="!form" :loading="loading" block id="btn" size="large" type="submit"
                        variant="elevated">
                        Log In
                    </v-btn>
                    <a href="/client/reset-password">Password forget</a>
                    <br />
                    <br />
                    <hr />
                    <br />
                    <h6>New Client ?</h6>
                    <v-btn block id="btn" size="large" variant="elevated" @click="$emit('sign-up')">
                        Sign Up
                    </v-btn>
                </v-form>
            </v-card>
        </v-card>

    </v-container>
</template>







<!--    SCRIPT -->
<script>
export default {
    data: () => ({
        form: false,
        email: null,
        password: null,
        loading: false,
        tagBorder: 'stdBorder'
    }),

    methods: {
        onSubmit() {
            if (!this.form) return

            this.loading = true
            this.tagBorder = 'loadingBorder'
 
            setTimeout(() => { this.loading = false; this.tagBorder ='stdBorder' }, 2000)
        },
        required(v) {
            return !!v || 'Field is required'
        }
    },
}
</script>



<!--      STYLE -->
<style scoped>
#stdBorder {
    display: block;
        background-color: rgb(255, 152, 0);
}

#loadingBorder {
    display: block;
    background-color: rgb(255, 152, 0);;
    background-image: url('../../src/assets/test.svg');
    /* background: url('../../src/assets/test.svg'); */
    background-size: 100% 100%;
}

#loginInfoInside {
    /* background-image: linear-gradient(to top,
            rgb(0, 105, 146),
            rgb(39, 71, 110)25%); */

    /* background-color: transparent; */
    background-color: white;
    color: rgb(255, 152, 0);
    border: 2px;
}

#btn {
    background-color: rgb(255, 152, 0);
    color: white;
}

a {
    color: rgb(255, 152, 0);
}

a:hover {
    color: rgb(205, 125, 0);
    ;
}

.v-text-field--outlined fieldset {
    size: 2px;
    border: 2px;
}
</style>
