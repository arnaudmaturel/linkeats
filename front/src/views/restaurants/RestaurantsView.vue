<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Filtres</v-card-title>
        </v-card>
      </v-col>

      <v-col class="d-flex" cols="12" md="10">
        <v-row>
          <v-col cols="3" v-for="restoData in datas" :key="restoData">
            <v-card min-width="100" max-width="400" :loading="loading" :id="restoData">
              <v-img height="250" :src=' getFullPath(restoData.resto.RestaurantImgIdentityPath)' cover></v-img>

              <v-card-title>
                {{ restoData.resto.RestaurantName }}
              </v-card-title>

              <v-card-subtitle>
                Tags
              </v-card-subtitle>

              <v-card-text>
                {{ restoData.Rate }}
                <v-rating color="rgb(255, 152, 0)" disabled dense half-increments size="14" v-model="restoData.rate"></v-rating>
              </v-card-text>

              <v-card-actions>
                <router-link
                  :to="{ name: 'restaurant_menus', params: { restaurant: restoData.resto.RestaurantName }, query: { id_restaurant: restoData.resto.UserID } }"
                  style="text-decoration: none;">
                  <v-btn variant="elevated" size="default" color="rgb(255, 152, 0)" style="color: white">
                    Order from
                  </v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import AppSetting from "@/AppSetting"

export default {
  name: 'ShopView',
  computed: mapGetters({
    allRestaurants: "restaurants",
  }),
  data: () => ({
    datas: []
  }),
  async created() {
    await this.$store.dispatch("getAllRestaurants");
    await this.refreshData();
  },
  methods: {
    getFullPath(end)
    {
      return AppSetting.baseUrl + AppSetting.RESTO_IMGS + end;
    },
    async refreshData() {

      for (var i = 0; i < this.allRestaurants.length; i++) {
        await this.$store.dispatch('getAllNotedUserComments', this.allRestaurants[i].UserID);
        const tempCom = this.$store.state.comment.comments;
        var avg = 0;
        if (tempCom && tempCom.length != 0) {
          var sum = 0;
          for (var iCom = 0; iCom < tempCom.length; iCom++) {
            sum += tempCom[iCom].Rate;
          }
          avg = sum / tempCom.length;
        }


        const data = {
          rate: avg,
          resto: this.allRestaurants[i]
        };

        this.datas.push(data);
      }
    }
  },
}
</script>
