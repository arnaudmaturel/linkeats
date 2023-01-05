<template>
    <v-container id="background">
        <SideBar />
        <v-form>
            <v-container>
                <v-row>
                    <v-col id="firstName" cols="5">
                        <v-row>
                            <h6>
                                First Name
                            </h6>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="firstname" value="{{ firstname }}"  placeholder="type here..." outlined required/>
                        </v-row>
                    </v-col>
           
                    <v-col cols="5" offset="2">
                        <v-row>
                            <h6>
                                Last Name
                            </h6>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="lastname" value=""   placeholder="type here..." outlined required/>
                        </v-row>
                    </v-col>
                
                </v-row>
                <v-row>
                    <v-col id="firstName" cols="5">
                        <v-row>
                            <h6>
                                E-Mail
                            </h6>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="mail" type="email"   placeholder="type here..." outlined required/>
                        </v-row>
                    </v-col>
           
                    <v-col cols="5" offset="2">
                        <v-row>
                            <h6>
                                Phone
                            </h6>
                        </v-row>
                        <v-row>
                            <v-text-field  v-model="phone" type="phone"  placeholder="type here..."  required outlined></v-text-field>
                        </v-row>
                    </v-col>
                
                </v-row>
                
                <v-row>
                    <v-col id="firstName" cols="5">
                        <v-row>
                            <h6>
                                Password
                            </h6>
                        </v-row>
                        <v-row>
                            <v-text-field v-model="password" type="password" :rules="nameRules" placeholder="type here..." outlined required/>
                        </v-row>
                    </v-col>
           
                    <v-col cols="5" offset="2" >
                        <v-row>
                            <h6>
                                Confirm Password
                            </h6>
                        </v-row>
                        <v-row>
                            <v-text-field rounded="x5" type="password" rules="nameRules" counter="10"  placeholder="type here..." shaped outlined required/>
                        </v-row>
                    </v-col>
                    
                </v-row>
            </v-container>
        </v-form>
        <br />
        <br/>
        <v-card id="xpBack" width="100%" color="rgb(143, 57, 133)" elevation="10">
            <v-card id="xpFront" elevation="0" tile>
                <label id="xpText">xp %</label>
            </v-card>
        </v-card>
        <br/>
    </v-container>

</template>




<!-- SCRPIT -->
<script lang="js">

// Components
import SideBar from '../../components/SideBar.vue';

export default {
    name: 'ClientAccount',
    components: {
        SideBar,
    },
    props: [
        'firstName',
        'lastName',
        'eMail',
        'phone',
        'password',
        'xpCurrent',
        'xpNextLevel',
        'address'
    ]
}
</script>





<!-- STYLE -->
<style>
#background{
    color: rgb(249, 178, 51);
}


#xpBack{
    height: 75px;
    padding: 10px;
}

#xpFront{
    display: flex;
    height: 100%;
    width: 100%;
    align-content: center;
    align-items: center;
    text-align: center;
    vertical-align: middle;
    background-image: linear-gradient(to right, rgb(249,178,51),rgb(255,190,75));
}

#xpText{
    
    left: 50%;
    -ms-transform: translateX(50%);
    transform: translateX(50%);
}
</style>