<template>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-row>
          <v-col>
            {{ data.orderN }}
          </v-col>
          
          <v-col>
            {{ data.date }}
          </v-col>
          
          <v-col>
            {{data.cost}}
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <div v-for="item in data.items" :key="item">
          item
        </div>
      </v-expansion-panel-text>

    </v-expansion-panel>
</template>

<script>
export default {
  name: 'endOrder',
  data: { orderN: '0001234', state: 'end', date: '01/01/2022', cost: '999999', items: ['item1', 'item2', 'item3'] },
  data: () => ({
    
  }),
}
</script>