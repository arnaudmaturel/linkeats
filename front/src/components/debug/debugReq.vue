<!-- TEMPLATE -->
<template>
    
    <v-card id="form" elevation="4" rounded="5">
        <v-row id="rowTitle">
            <v-col class="ma-auto" style="text-align:center">
                <h5> RequestSender</h5>
            </v-col>
        </v-row>
        <div id="middle"></div>
        <div id="img">

            <h6>Request :</h6>
            <v-row>
                <v-col cols="1">
                    <v-select label="Method" variant="outlined" v-model="selectedMethod"  :items="methods"/>
                </v-col>
                <v-col cols="9">
                        <v-text-field v-model="request" :readonly="loading" clearable placeholder="/clients/status" variant="outlined" color="rgb(255, 152, 0)"
                            @keydown.enter="onSend()" />
                </v-col>
                <v-col>
                        <v-btn icon="mdi-send" id="btn" @click="onSend()" />
                </v-col>
            </v-row>

            <v-row>
                <v-col class="ma-auto">
                    <h6>Body</h6>
                    <v-textarea v-model="body" :readonly="loading" clearable :placeholder="'{\n\tlogin:\'antoine\',\n\tpassword:\'P@$$w0rd\'\n}'"
                        variant="outlined" color="rgb(255, 152, 0)">
                    </v-textarea>
                </v-col>
            </v-row>
            
            
            <v-row style="display:flex; justify-content: space-between;">
                <h6>Response</h6>
                <h6>Status : {{ status }}</h6>
            </v-row>
            <v-row>
                <v-col class="ma-auto">
                    <v-textarea v-model="response" :readonly="true" clearable
                        variant="outlined" color="rgb(255, 152, 0)">
                    </v-textarea>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>



<!-- SCRIPT -->
<script>
import reqHand from '@/store/fetch';

export default {
    name:'DebugReqView',
    setup() {

    },
    created()
    {
    },
    data: () => ({
        request: '',
        body: '',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        selectedMethod: 'GET',
        response: '',
        status:'???',
    }),
    methods:
    {
        onSend() {
            switch (this.selectedMethod)
            {
                // GET
                case this.methods[0]:
                    this.printGet();
                    break;

                // POST
                case this.methods[1]:
                    this.printPost();
                    break;

                // PUT
                case this.methods[2]:
                    this.printPut();
                    break;


                // DELETE
                case this.methods[3]:
                    this.printDelete();
                    break;
            }
        },
        printGet() {
            console.log('get ' + this.request);
            reqHand.get(this.request, this.body)
                .then((res) => {
                    this.status = res.status;
                    res.text().then((data) => this.response = data);
                })   
               // .then((data) => this.response = data);        
        },
        printPost() {
            console.log('post ' + this.request);
        },
        printPut() {
            console.log('put ' + this.request);
            
        },
        printDelete() {
            console.log('delted ' + this.request);
        },
    }
}
</script>


<!-- STYLE -->
<style scoped>
#rowTitle {

    padding: 20px;
    padding-bottom: 20px;
}

#middle {
    background-color: rgb(228, 228, 228);
    height: 3px;
    width: 100%;
}

#infPart {
    width: 100%;
    padding: 5%;
    padding-top: 2%;
}


#form {
    border: solid 3px rgb(228, 228, 228);
    background-color: white;
    font-family: MyFont;
}

#img {
    background-image: url('../../assets/linkEats_transp10.png');
    background-size: contain;
    background-position: center;
    padding: 25px;
    /* opacity: 0.2; */
}

#title {
    text-align: center;
}

#orderStateSelected {
    background-color: rgb(255, 152, 0);
    color: white !important;
}

#orderState {
    color: black !important;
    background-color: white;
}

#chipAdder {
    display: flex;
}

/* #chipAdderHeader {
    width: 95%;
} */
</style>
