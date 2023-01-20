<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card min-height="200" style="background: #27476E; background: -webkit-linear-gradient(to bottom, #27476E, #1f4e76, #02678f); background: linear-gradient(to bottom, #27476E, #1f4e76, #02678f);">
        <v-col align-self="center" align="center">
          <v-card-title class="justify-center" style="color: orange; font-size:35px">
            C'est le moment de trouver de quoi vous régaler ! <br><br>
          </v-card-title>
          <v-card-subtitle class="justify-center" style="color: white; font-size:20px">
            Entrez une adresse pour découvrir les menus disponibles
          </v-card-subtitle>

          <v-card-text>
            <v-text-field variant="outline" style="width: 40%; background-color: white; border-radius: 30px; height:60px" label="Entrez votre adresse" append-inner-icon="mdi-map-marker" color="white" single-line hide-details :loading="loading" @click:append-inner="address()"></v-text-field>
          </v-card-text>
          </v-col>
      </v-card>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="12" style="background-color: grey" align-self="center">
      <v-card style="background-color: #EEEEEE; padding-top: 2%; padding-bottom: 2%; padding-left: 8%; padding-right: 8%;" min-height="200">
        <v-card color="white" style="border-radius: 40px;">
          <v-row align="center">
            <v-col cols="7">
              <v-card-title style="color: orange; font-size: 50px; text-align: justify">
                <b>Suivez votre commande en direct</b>
                <br><br><br>
              </v-card-title>
              <v-card-text style="font-size: 26px; line-height:35px">
                <b>Faites-vous livrer votre envie du moment en un rien de temps, voyez quand votre commande est prête et suivez son trajet jusqu'à chez vous. Recevez une notification lorsqu'elle n'est pas loin.</b>
              </v-card-text>
            </v-col>
            <v-col cols="5">
              <v-img max-height="400" src="../assets/maps.jpg"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="12" style="background-color: #27476E" align-self="center">
      <v-card style="background-color: #02678f; padding-top: 2%;" min-height="300">
        <v-row align="center">
          <v-col cols="6" align-self="center" align="center">
            <v-img src="../assets/logo12.png" width="500" align="center" class="ma-auto"></v-img>
          </v-col>
          <v-col cols="6">
            <v-card-title style="color: orange; font-size: 45px; text-align: justify; text-align:center">
              Puis trouvez votre âme soeur <br><br>
            </v-card-title>
            <v-card-text style="font-size: 26px; color: white; line-height:35px ; text-align:center">
              Activez le programme Linker, et entrez en contact avec quelqu'un ayant commandé le même plat.
              Rejoignez-vous pour déguster ensemble votre commande... et plus si affinité...
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <v-row no-gutters>
    <v-col cols="12" style="background-color: white" align-self="center">
      <v-card style="background-color: white; padding-top: 2%;" height="400">
        <v-row align="center">
          <v-col cols="6" align-self="center" align="center">
            <v-card-text style="font-size: 26px;">
              Comment ça marche ?
            </v-card-text>
            <v-card-title style="color: orange; font-size: 45px;">
              C'est très simple !
            </v-card-title>
            <v-row no-gutters>
              <v-col cols="6">
                <v-list style="background-color: white;">
                  <v-list-item>
                    <v-icon style="font-size: 100px" color="warning">mdi-food</v-icon>
                  </v-list-item>
                  <v-list-item style="font-size: 20px">
                    Sélection restaurant + repas
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="6">
                <v-list style="background-color: white;">
                  <v-list-item >
                    <v-icon style="font-size: 100px" color="warning">mdi-moped-outline</v-icon>
                  </v-list-item>
                  <v-list-item style="font-size: 20px">
                    Payez et recevez votre commande
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" style="background-color: white;">
            <v-card-title style="font-size: 35px; text-align: center">
              Rencontrez votre idylle et dégustez
            </v-card-title>
            <v-card-text>
              <v-img align="center" class="ma-auto" width="300" src="../assets/ChatSouris.png"></v-img>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from 'vue';

export default {
  name: 'HomeView',
  data: () => ({
    loaded: false,
    loading: false,
  }),
  components: {
    
  },
  methods: {
    address() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    }
  }
}
</script>
