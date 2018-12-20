<template>
  <div class="l-budget-creation">
    <v-layout row wrap>
      <span class="md-budget-state-hint uppercased white--text">status</span>
      <v-flex xs12 md2>
        <v-select
          label="Status"
          :items="states"
          v-model="budget.state"
        >
        </v-select>
      </v-flex>

      <v-flex xs12 md9 offset-md1>
        <v-select
          label="Client"
          :items="clients"
          v-model="budget.client"
          item-text="name"
          item-value="_id"
        >
        </v-select>
      </v-flex>

      <v-flex xs12 md12>
        <v-text-field label="Title"
                      v-model="budget.title"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Description"
                      v-model="budget.description"
                      textarea
                      required
                      color="light-blue lighten-1">
        </v-text-field>
      </v-flex>

      <v-layout row wrap v-for="item in budget.items" class="l-budget-item" :key="item.id">
        <v-flex xs12 md1>
          <v-btn block dark color="red lighten-1" @click.native="removeItem(item)">Remove</v-btn>
        </v-flex>

        <v-flex xs12 md3 offset-md1>
          <v-text-field label="Title"
                        box dark
                        v-model="item.title"
                        required
                        color="light-blue lighten-1">
          </v-text-field>
        </v-flex>

        <v-flex xs12 md1 offset-md1>
          <v-text-field label="Price"
                        box dark
                        prefix="$"
                        v-model="item.price"
                        required
                        color="light-blue lighten-1">
          </v-text-field>
        </v-flex>

        <v-flex xs12 md2 offset-md1>
          <v-text-field label="Quantity"
                        box dark
                        min="0"
                        v-model="item.quantity"
                        type="number"
                        required
                        color="light-blue lighten-1">
          </v-text-field>
        </v-flex>

        <v-flex xs12 md2>
          <span class="md-budget-item-subtotal white--text">ITEM PRICE $ {{ item.subtotal }}</span>
        </v-flex>
      </v-layout>

      <v-flex xs12 md2 offset-md10>
        <v-btn block color="md-add-item-btn light-blue lighten-1" @click.native="addItem()">Add item</v-btn>
      </v-flex>

      <v-flex xs12 md2 offset-md10>
        <span class="md-budget-item-total white--text">TOTAL $ {{ budget.total_price }}</span>
      </v-flex>

      <v-flex xs12 md2 offset-md10>
        <v-btn block color="md-add-item-btn green lighten-1" @click.native="saveBudget(budget)">Save</v-btn>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
  export default {
    props: ['clients', 'saveBudget'],
    data () {
      return {
        budget: {
          title: null,
          description: null,
          state: 'writing',
          client: null,
          get total_price () {
            let value = 0
            this.items.forEach(({ subtotal }) => {
              value += parseInt(subtotal)
            })
            return value
          },
          items: [
            {
              title: null,
              quantity: 0,
              price: 0,
              get subtotal () {
                return this.quantity * this.price
              }
            }
          ]
        },
        states: [
          'writing', 'editing', 'pending', 'approved', 'denied', 'waiting'
        ]
      }
    },
    methods: {
      addItem () {
        const items = this.budget.items
        const item = {
          title: '',
          quantity: 0,
          price: 0,
          get subtotal () {
            return this.quantity * this.price
          }
        }

        items.push(item)
      },

      removeItem (selected) {
        const items = this.budget.items
        items.forEach((item, index) => {
          if (item === selected) {
            items.splice(index, 1)
          }
        })
      }
    }
  }
</script>
