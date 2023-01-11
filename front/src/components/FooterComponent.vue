<template>
    <footer id="footer">
        <v-row justify="center" no-gutters id="row" >
            <v-btn v-for="link in links" :key="link" elevation="0" id="btn" :href="link.link">
                {{ link.title }}
            </v-btn>
            <v-col class="text-center mt-4" cols="12">
                {{ new Date().getFullYear() }} — <strong>LinkEats!</strong>
            </v-col>
        </v-row>
    </footer>
</template>


<script>
export default {
    data: () => ({
        links: [
            {'title':'home','link':'/'},
            {'title': 'Restaurant', 'link':'/restaurant/login'},
            {'title':'Deliveryman','link':'/deliveryman/login'},
            {'title':'About us','link':'/about'},
            {'title':'Confidentiality','link':'/confidentiality'},
            {'title':'Contact Us','link':'/contact-us'},
        ],
    }),
}
</script>


<!--      STYLE -->
<style scoped>
#btn {
    background-color: rgb(255, 152, 0,0%);
    color: white;
}

a {
    color: rgb(255, 152, 0);
}

a:hover {
    color: rgb(205, 125, 0);
    ;
}

#row{
    /* display: flex; */
    width: 100%;
    justify-content: stretch;
}

#footer
{
    background-color: rgb(255, 152, 0,15%);
    color: white;
    transform: translateY(-100%);
    margin-bottom: 0%;
    height: 100px;
    width: 100%;
}
</style>>