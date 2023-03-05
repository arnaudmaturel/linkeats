<template>
    <v-container>

    <v-card id="formP" rounded="5" elevation="0" class="mx-auto">
                <div id="headerP">
                    <h5 id="title">
                        Attention !
                    </h5>
                    <div>
                        <v-btn rounded="pill" id="btn" elevation="6" @click="this.$emit('on-cancel')"
                            icon="mdi-close-thick" />
                    </div>
                </div>
                <div id="middleP"></div>
                <div id="img">
                    <v-row>
                        <div id="infPartP">
                            {{ message }}
                        </div>
                    </v-row>
                    <v-row >
                        <v-col  style="text-align:center;">
                            <v-btn id="btn" icon="mdi-check-bold" color="rbg(255, 152, 0)" rounded="pill" @click="this.$emit('on-validated')"/>                        
                            <v-btn id="btn" icon="mdi-close-thick" color="red" rounded="pill" @click="this.$emit('on-cancel')"/>                        
                        </v-col>
                    </v-row>
                    <br/>
                </div>
            </v-card>
    </v-container>
</template>

<script lang="js">
export default {
    name: 'PopUpConfirm',
    props:
    {
        message:"klddzlvn"
    },
}
</script>

<style>


#btn {
    background-color: rgb(255, 152, 0);
    color: white;
}

#rowTitle {

    padding: 10px;
    padding-bottom: 10px;
}

#middleP {
    background-color: rgb(255, 152, 0);
    /* background-color: rgb(228, 228, 228); */
    height: 3px;
    width: 100%;
}

#infPartP
{    padding: 2%;
    padding-top: 2%;
    margin-top:10px;
    text-align:center;
    width : 100%;
    font-family: MyFont;
    font-size:25pt;
}


#formP {
    border: solid 3px rgb(255, 152, 0);
    background-color: white;
    font-family: MyFont;
    color: rgb(255, 152, 0);
    width: 22cm;
}

#img {
    background-image: url('../assets/linkEats_transp10.png');
    background-size: contain;
    background-position: center;
}

#title {
    text-align: center;
}

#headerP {
    text-align: center;
    padding: 8px;
    padding-bottom: 8px;
    text-align: center;
    vertical-align: middle;
    display: flex;
    justify-content: space-between;
}
</style>