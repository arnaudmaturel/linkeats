<template>
    <v-sheet id="form" rounded="5" elevation="0">
        <v-row id="rowTitle">
            <v-col class="ma-auto" style="text-align:center">
                <div class="d-flex justify-space-between">
                    <v-icon icon="mdi-star" color="rgb(255, 152, 0)" size="x-large" />
                    <h4> Commentaire</h4>
                    <v-icon icon="mdi-star" color="rgb(255, 152, 0)" size="x-large" />
                </div>
            </v-col>
        </v-row>
        <div id="middle"></div>
        <div id="img">
            <div id="infPart">

                <v-expansion-panels>
                            <v-expansion-panel v-for="com in comments" :key="com">
                                <v-expansion-panel-title>
                                    <v-row>
                                        <v-col cols="3">
                                            {{ com.SimpleID }}
                                        </v-col>

                                        <v-col cols="4">
                                            {{ com.title }}
                                        </v-col>

                                        <v-col cols="3" inline-block>
                                            <v-rating v-model="com.rate" disabled color="rgb(255, 152, 0)"
                                                active-color="rgb(255, 152, 0)" half-increments size="18" />
                                        </v-col>

                                        <v-col >
                                            <v-icon icon="mdi-close-octagon"/>
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-title>

                                <v-expansion-panel-text>
                                    <v-row>
                                        <v-col>
                                            Prénom :  {{ com.cFName }}
                                        </v-col>
                                        <v-col>
                                            Nom : {{ com.cLName  }}
                                        </v-col>
                                    </v-row>
                                    <v-textarea readonly v-model="com.descript">

                                    </v-textarea>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>



            </div>
        </div>

        <!-- SNACKBAR -->
        <v-snackbar v-model="snackbar" :timeout="timeout" style="border=solid 3px rgb(228, 228, 228);">
            Commentaire reporté
            <template v-slot:actions>
                <v-btn color="rgb(255, 152, 0)" rounded="pill" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>

    </v-sheet>
</template>

<script>
export default {
    name: 'CommentViewer',
        components: {
    },
    data: () => ({
        timeout: 3000,
        snackbar: false,
        comments: [],
        orders : [],
    }),
    async created() {
        await this.refreshData();
    },
    methods: {
        async refreshData()
        {
            await this.$store.dispatch('getAllNotedUserComments', localStorage.getItem('userId'));
            await this.$store.dispatch('getAllRestoOrders', localStorage.getItem('userId'));

            const tempCom = this.$store.state.comment.comments;
            this.orders = this.$store.state.order.orders;


            for (var i = 0; i < tempCom.length; i++)
            {
                var c = tempCom[i];
                const o = this.getOrder(c.IDOrderAssociated);
                var sId = "";
                if (o != null)
                {
                    if (localStorage.getItem("userRole") == 2)
                        sId = o.SimpleID.Date + " | "+o.SimpleID.Id4Resto
                        if (localStorage.getItem("userRole") == 3)
                        sId = o.SimpleID.Date + " | "+o.SimpleID.Id4Delivery
                }

                await this.$store.dispatch('getClient', c.IDClient);
                const data = {
                    rate: c.Rate,
                    title: c.Title,
                    descript: c.Description,
                    SimpleID : sId ,
                    cFName: this.$store.state.client.client.ClientFirstName,
                    cLName: this.$store.state.client.client.ClientLastName
                };

                this.comments.push(data);

            }
            
        },
        getOrder(id)
        {
            for (var i = 0; i < this.orders.length; i++)
            {
                var o = this.orders[i];
                if (o._id == id)
                    return o;
            }
            return null;
        }
    }
}
</script>

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
    padding: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
}

#form {
    border: solid 3px rgb(228, 228, 228);
    background-color: white;
}

#img {
    background-image: url('../assets/linkEats_transp10.png');
    background-size: contain;
    background-position: center;
}

#btnSave {
    top: 100%;
}
</style>
