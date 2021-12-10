<template>
  <div class="">
    <div class="menu">
      <small class="display-3"> ☕ </small> <br />
      <p class="display-3 cafe">XYZ CAFE</p>
      <div v-if="success">
        <small class="h1 cafe"> Pagamento efetivado com sucesso </small><br>
        <router-link class="col-md-1 btn btn-success mt-2" tag="a" to="/">
          <span class="">PÁGINA INICIAL</span>
        </router-link>
      </div>
      <div v-else-if="readyToPayment">
        <small class="h1 cafe"> Pagamento </small>
        <div class="d-flex justify-content-center">
          <b-card class="card mt-5 w-50" title="Informe os dados do seu cartão">
            <b-card-text class="d-flex justify-content-center">
              <b-form class="w-75">
                <b-form-group
                  id="input-group-2"
                  label="Titular do Cartão"
                  label-for="input-2"
                  class="mt-3"
                >
                </b-form-group>
                <b-form-input
                  id="input-2"
                  placeholder="Nome Completo"
                  required
                ></b-form-input>

                <b-form-group
                  id="input-group-1"
                  label="CPF do Titular"
                  label-for="input-1"
                  class="mt-3"
                >
                </b-form-group>
                <b-form-input
                  id="input-1"
                  placeholder="000.000.000-00"
                  required
                  v-mask="'999.999.999-99'"
                ></b-form-input>

                <b-form-group
                  id="input-group-1"
                  label="Número do cartão"
                  label-for="input-1"
                  class="mt-3"
                >
                </b-form-group>
                <b-form-input
                  id="input-1"
                  placeholder="8888 8888 8888 8888"
                  required
                  v-mask="'9999 9999 9999 9999'"
                ></b-form-input>

                <div class="col-md-3">
                  <b-form-group
                    id="input-group-1"
                    label="CVV"
                    label-for="input-1"
                    class="mt-3"
                  >
                  </b-form-group>
                  <b-form-input
                    id="input-1"
                    placeholder="888"
                    required
                    v-mask="'9999'"
                  ></b-form-input>
                  
                </div>

                <div class="col-md-3">
                  <b-form-group
                    id="input-group-1"
                    label="Vencimento"
                    label-for="input-1"
                    class="mt-3"
                  >
                  </b-form-group>
                  <b-form-input
                    id="input-1"
                    placeholder="88/8888"
                    required
                    v-mask="'99/9999'"
                  ></b-form-input>
                </div>
                
                <b-button type="submit" variant="primary" @click.prevent="confimOrder()">Pagar</b-button>
              </b-form>
            </b-card-text>
          </b-card>
        </div>
      </div>
      <div v-else>
        <small class="h1 cafe"> Cardápio</small>
        <div class="d-flex mt-5">
          <div class="col-md-9">
            <div class="d-flex products-view">
              <b-card
                v-for="product in products"
                :key="product.id"
                :title="product.name"
                tag="article"
                style="max-width: 20rem"
                class="mb-2 col-md-5 ml-3"
              >
                <b-card-text>
                  <img :src="product.photo" class="photo mb-3" /><br />
                  <span class="h2">R$ {{ product.price }}</span>
                </b-card-text>

                <a href="#" class="add" @click.prevent="selectProduct(product)"
                  ><span variant="primary">Adicionar</span>
                </a>
              </b-card>
            </div> <br>
          </div>

          <div class="col-md-3">
            <b-card class="card" title="Seu pedido">
              <b-card-text>
                <div v-for="product in selectedProducts" :key="product.id">
                  <span class="col-md-6 h4 text-primary">{{
                    product.name
                  }}</span>
                  <span class="col-md-4 h4 text-primary"></span>
                  <span class="col-md-2 h4 text-success">{{
                    product.price.toFixed(1)
                  }}</span>
                </div>
              </b-card-text>
              <span class="col-md-2 h4 text-success"
                >Total R$ {{ totalOrder.toFixed(1) }}</span
              >
              <b-card-text class="mt-4" v-if="selectedProducts.length"
                >Selecione a mesa e faça o pagamento
              </b-card-text>
              <div v-if="!table && selectedProducts.length" class="mb-2">
                <b-form-select
                  v-model="table"
                  :options="availableTables"
                  placeholder="Selecione a mesa..."
                  size="sm"
                  class="mt-3 col-md-3"
                ></b-form-select>
              </div>
              <div v-else-if="selectedProducts.length">
                <p>
                  Mesa {{ table }} <br /><small
                    ><a href="#" @click.prevent="table = 0">Trocar</a></small
                  >
                </p>
                <b-link
                  href="#"
                  class="btn btn-success"
                  @click.prevent="readyToPayment = true"
                  >Pagar</b-link
                >
              </div>
            </b-card>
            <textarea class="form-control mt-4" v-model="observation" placeholder="Alguma observação?">Ollá</textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AwesomeMask from "awesome-mask";

export default {
  name: "Menu",
  props: {
    msg: String,
  },
  directives: {
    mask: AwesomeMask,
  },
  data() {
    return {
      products: [],
      totalOrder: 0.0,
      selectedProducts: [],
      selectedProductsIds: [],
      table: 0,
      observation: '',
      availableTables: [1, 2, 3, 4, 5, 6],
      readyToPayment: false,
      success: false
    };
  },
  methods: {
    async getProducts() {
      await axios
        .get("http://localhost:3000/products")
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => console.log(error));
    },

    selectProduct(product) {
      this.selectedProducts.push(product);
      this.selectedProductsIds.push(product.id);
      this.totalOrder += product.price;
    },

    async confimOrder() {
        await axios
        .post("http://localhost:3000/orders", {
          products: String(this.selectedProductsIds),
          price: this.totalOrder,
          payment: true,
          status: 'production',
          observation: this.observation,
          table: this.table
        })
        .then(() => {
          this.success = true
        })
        .catch((error) => console.log(error));
    }
  },
  mounted() {
    this.getProducts();
    document.querySelector("body").setAttribute("style", "background:#eac29a");
    window.document.title = "XYZ Cafe - Menu";
  },
};
</script>

<style scoped>
.cafe {
  color: #5c3935;
}

.products-view {
  overflow: auto;
}

.card {
  border-radius: 8px;
}

.photo {
  border-radius: 5px;
  min-height: 20px;
  max-height: 9rem;
  max-width: 80%;
}

/* width */
::-webkit-scrollbar {
  height: 5px !important;
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 8px;
  background: #eac29a;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: #a37854;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5c3935;
}
</style>
