<template>
    <v-container>
        <v-card class="mx-auto px-2 py-2" max-width="750" :id="tagBorder" elevation="24" outlined>
            <v-card class="mx-auto px-5 py-5" id="loginInfoInside" outlined elevation="0">
                <v-form v-model="form" @submit.prevent="onSubmit">
                    <v-row>
                        <v-col>
                            <h5>Sign Up</h5>
                        </v-col>
                    </v-row>
                    <br />
                    <v-row>
                        <v-col>
                            <h6>Email</h6>
                            <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable dense
                                color="rgb(255, 152, 0)" variant="outlined" solo="true"
                                placeholder="Enter your E-mail">
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <h6>Phone</h6>
                            <v-text-field v-model="phone" :readonly="loading" :rules="[required]" class="mb-2" clearable dense
                                color="rgb(255, 152, 0)" variant="outlined" solo="true"
                                placeholder="Enter your Phone number">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="6">
                            <h6>Login</h6>
                            <v-text-field v-model="login" :readonly="loading" :rules="[required]" class="mb-2" clearable dense
                            color="rgb(255, 152, 0)" variant="outlined" solo="true"
                            placeholder="Enter your login">
                        </v-text-field>
                    </v-col>
                    </v-row>


                    <v-row>
                        <v-col>
                            <h6>Password</h6>
                            <v-text-field v-model="password" type="password" :readonly="loading" :rules="[required]" clearable dense
                                placeholder="Enter your password" variant="outlined" color="rgb(255, 152, 0)">
                            </v-text-field>
                        </v-col>

                        <v-col>                            
                            <h6>Confirm Password</h6>
                            <v-text-field v-model="password2" type="password" :readonly="loading" :rules="[required]" clearable dense
                                placeholder="Enter your password" variant="outlined" color="rgb(255, 152, 0)">
                            </v-text-field>
                        </v-col>

                    </v-row>

                    <br>
                    <v-btn :disabled="!form" :loading="loading" block id="btn" size="large" type="submit"
                        variant="elevated">
                        Sign Up
                    </v-btn>
                    <br />
                    <hr />
                    <h6>Already Client ?</h6>
                    <v-btn block id="btn" size="large" variant="elevated" @click="$emit('sign-in')">
                        Sign In
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
        phone: null,
        login: null,
        password: null,
        password2: null,
        loading: false,
        tagBorder: 'stdBorder'
    }),

    methods: {
        onSubmit() {
            if (!this.form) return

            this.loading = true
            this.tagBorder = 'loadingBorder'

            setTimeout(() => { this.loading = false; this.tagBorder = 'stdBorder' }, 2000)
        },
        required(v) {
            return !!v || 'Field is required'
        },
        onLogIn() {
            this.$emit('on-login-in');
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
    background-color: rgb(255, 152, 0);
    ;
    background-image: url('../../src/assets/test.svg');
    /* background: url('../../src/assets/test.svg'); */
    background-size: 100% 100%;
}

#loginInfoInside {
    background-image: linear-gradient(to top,
            rgb(0, 105, 146),
            rgb(39, 71, 110)25%);

    background-color: transparent;
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

h5{
    justify-content: center;
}
</style>
