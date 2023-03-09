<template>
  <v-container>
    <v-card id="formP" rounded="5" elevation="0" class="mx-auto">
      <form>
        <div id="headerP">
          <h5 id="title">
            Wallet
          </h5>
          <div>
            <v-btn icon dark v-on:click="closeDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
        <div id="middleP"></div>
        <div id="img">
          <v-row>
            <div id="infPartP">
              <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="4">
                  <v-list-item-title>Montant à ajouter au wallet</v-list-item-title>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                      label="Montant"
                      model-value="10.00"
                      suffix="€"
                      :rules="[numberRule]"
                      v-model="walletValue"
                  ></v-text-field>
                </v-col>
                <v-col cols="1"></v-col>
              </v-row>
            </div>
          </v-row>
          <v-row style="margin-bottom: 10px;">
            <v-col  style="text-align:center;">
              <v-btn id="btn" icon="mdi-check-bold" color="rbg(255, 152, 0)" rounded="pill" @click="validateWallet()"/>
            </v-col>
          </v-row>
        </div>
      </form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "StarsWalletPopUpComponent",
  data(){
    return {
      numberRule: v  => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v > 0) return true;
        return 'Doit être supérieur à 0€';
      },
      walletValue: ''
    }
  },
  methods: {
    closeDialog: function(){
      this.$emit('close-dialog');
    },
    validateWallet: function(){
      //console.log(this.walletValue)
      this.$emit('walletAdd', this.walletValue);
    }
  }
}
</script>

<style scoped>

</style>
