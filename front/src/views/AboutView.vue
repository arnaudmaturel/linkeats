<template>
  <v-row no-gutters>
    <v-col style="height: 100%; margin: 0;" cols="12" align-self="center">
      <v-card style="background-color: #EEEEEE; padding-top: 2%; padding-bottom: 2%; padding-left: 8%; padding-right: 8%; height: 100%">
        <v-card color="white" style="border-radius: 40px;">
          <v-row align="center">
            <v-col cols="12">
              <v-card-title style="color: orange; font-size: 44px; text-align: justify; margin-top: 20px; margin-left: 10px">
                <b>Qui sommes nous ?</b>
                <br><br><br>
              </v-card-title>
              <v-card-text style="font-size: 24px; line-height:35px; margin: 10px">
                <b>Bienvenue sur LinkEats!, l'application de commande de repas en ligne qui vous permet de rencontrer des personnes partageant les mêmes goûts culinaires que vous. Fondée en 2023 par Arnaud Maturel, Antoine Legois, Alim Nouira et Antoine Fourcin, notre objectif est de créer des liens entre les gens autour de la nourriture.
                  <br><br>
                  Lorsque vous commandez un plat sur LinkEats, grâce à notre Linker, vous recevez une notification vous informant que quelqu'un d'autre a commandé le même plat que vous. Vous avez alors la possibilité de contacter cette personne et de vous proposer de partager le repas ensemble. Qui sait, cela pourrait même mener à une histoire d'amour !
                  <br><br>
                  Chez LinkEats!, nous croyons que la nourriture est un langage universel qui peut rassembler les gens. Nous sommes fiers de proposer une plateforme qui permet aux utilisateurs de se connecter et de partager leur passion pour la cuisine.
                  <br><br>
                  Alors, pourquoi ne pas essayer LinkEats! pour votre prochain repas? Commandez votre plat préféré et laissez l'application vous connecter à d'autres amateurs de cuisine pour une expérience culinaire unique. N'oubliez pas notre slogan : "Lick It!"
                </b>
              </v-card-text>
              <v-row>
                <v-col cols="3">
                  <v-card-item>
                    <v-col>
                      <v-row>
                        <v-avatar size="100%">
                          <v-img max-height="450" src="../assets/Antoine.png"></v-img>
                        </v-avatar>
                      </v-row>
                      <v-row>
                        <v-card-text align="center" style="font-size: 18px">
                          Antoine FOURCIN, Chef de projet
                        </v-card-text>
                      </v-row>
                    </v-col>
                  </v-card-item>
                </v-col>
                <v-col cols="3">
                  <v-card-item>
                    <v-col>
                      <v-row>
                        <v-avatar size="100%">
                          <v-img max-height="450" src="../assets/AntoineLegois.png"></v-img>
                        </v-avatar>
                      </v-row>
                      <v-row>
                        <v-card-text align="center" style="font-size: 18px">
                          Antoine LEGOIS, Développeur
                        </v-card-text>
                      </v-row>
                    </v-col>
                  </v-card-item>
                </v-col>
                <v-col cols="3">
                  <v-card-item>
                    <v-col>
                      <v-row>
                        <v-avatar size="100%">
                          <v-img max-height="450" src="../assets/Arnaud.png"></v-img>
                        </v-avatar>
                      </v-row>
                      <v-row>
                        <v-card-text align="center" style="font-size: 18px">
                          Arnaud MATUREL, Développeur
                        </v-card-text>
                      </v-row>
                    </v-col>
                  </v-card-item>
                </v-col>
                <v-col cols="3">
                  <v-card-item>
                    <v-col>
                      <v-row>
                        <v-avatar size="100%">
                          <v-img max-height="450" src="../assets/Alim.png"></v-img>
                        </v-avatar>
                      </v-row>
                      <v-row>
                        <v-card-text align="center" style="font-size: 18px">
                          Alim NOUIRA, DevOps
                        </v-card-text>
                      </v-row>
                    </v-col>
                  </v-card-item>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// Components
import SideBar from '../components/SideBar.vue';

export default {
  name: 'AboutView',
  components: {
    SideBar
  },
}
</script>
