<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card min-height="200" style="background: #27476E; background: -webkit-linear-gradient(to bottom, #27476E, #1f4e76, #02678f); background: linear-gradient(to bottom, #27476E, #1f4e76, #02678f);">
        <v-col align-self="center" align="center">
          <v-card-title class="justify-center">
            C'est le moment de trouver de quoi vous régaler !
          </v-card-title>
          <v-card-subtitle class="justify-center">
            Entrez une adresse pour découvrir les menus disponibles
          </v-card-subtitle>
          <v-text-field style="width: 40%; background-color: white" label="Your address" append-inner-icon="mdi-map-marker" color="white" single-line hide-details  variant="outlined">
            <v-btn color="warning">
              Chercher
            </v-btn>
          </v-text-field>
          </v-col>
      </v-card>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="12" style="background-color: grey" align-self="center">
      <v-card style="background-color: grey; padding-top: 2%; padding-bottom: 2%; padding-left: 8%; padding-right: 8%;" min-height="200">
        <v-card color="white" rounded>
          <v-row align="center">
            <v-col cols="6">
              <v-card-title style="color: orange; font-size: 45px; text-align: justify">
                <b>Suivez votre commande en direct</b>
              </v-card-title>
              <v-card-text style="font-size: 26px;">
                <b>Faites-vous livre votre envie du moment en un rien de temps.
                  Voyez quand votre commande est prête, suivez son trajet juqu'à chez vous et recevez une notification lorsqu'elle n'est pas loin</b>
              </v-card-text>
            </v-col>
            <v-col cols="6">
              <v-img max-height="400" src="https://media.istockphoto.com/id/1202525436/fr/vectoriel/city-urban-streets-roads-abstract-map-carte-plate-abstraite-de-la-ville-plan-de-la-ville.jpg?s=1024x1024&w=is&k=20&c=FPhi7EXkrs8Oc56S0jCT9wWziFRRu5EEfn8wvE-yEUQ="></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="12" style="background-color: #27476E">
      <v-card style="background-color: #27476E;">
        <v-row>
          <v-col cols="6">

          </v-col>
          <v-col cols="6">
            <v-card-title style="color: orange">
              Puis trouvez votre âme soeur
            </v-card-title>
            <v-card-text>
              Activez le programme Linker, et entrez en contact avec quelqu'un ayant commandé le même plat.
              Rejoignez-vous pour déguster ensemble votre commande... et plus si affinité...
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row><!--
  <v-row no-gutters>
    <v-col cols="12" style="background-color: grey">
      <v-card style="background-color: grey;">
        <v-row>
          <v-col cols="6">
            <img src="../assets/logo12.png" id="logo-nav"/>
          </v-col>
          <v-col cols="6">
            <v-card-title style="color: orange">
              Puis trouvez votre âme soeur
            </v-card-title>
            <v-card-text>

            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>-->
</template>

<script>
import { defineComponent } from 'vue';

export default {
  name: 'HomeView',
  components: {
    
  },
}
</script>
