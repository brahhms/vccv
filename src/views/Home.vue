<template>
  <v-app id="inspire" class="grey lighten-3">
    <v-container>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step step="1" editable> Vendedor </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" editable> Comprador </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" editable> Certificado </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="mb-12" color="grey lighten-1" min-height="70vh">
              <v-sheet min-height="70vh" rounded="lg" class="px-12 pt-8">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <b>Vendedor</b>

                  <v-combobox
                    v-model="cv.vendedor"
                    :items="personas"
                    item-text="nombreCompleto"
                    required
                    :rules="nameRules"
                    label="Nombre Completo"
                    return-object
                  >
                  </v-combobox>

                  <v-text-field
                    v-model="cv.vendedor.dui"
                    label="DUI"
                    required
                  ></v-text-field>

                  <v-autocomplete
                    v-model="cv.vendedor.domicilio"
                    :items="municipios"
                    item-text="nombre"
                    required
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Domicilio"
                    return-object
                  >
                    <template v-slot:selection="data">
                      {{ data.item.nombre }}
                    </template>
                    <template v-slot:item="data">
                      {{ data.item.nombre }}
                    </template>
                  </v-autocomplete>

                  <v-text-field
                    v-model="cv.vendedor.domicilio.departamento.nombre"
                    label="Departamento"
                    required
                    disabled
                  ></v-text-field>
                </v-form>
              </v-sheet>
            </v-card>

            <v-btn color="primary" @click="nextStep(1)"> Continue </v-btn>

            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12" color="grey lighten-1" min-height="70vh">
              <v-sheet min-height="70vh" rounded="lg" class="px-12 pt-8">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <b>Comprador</b>

                  <v-combobox
                    v-model="cv.comprador"
                    :items="personas"
                    item-text="nombreCompleto"
                    required
                    :rules="nameRules"
                    label="Nombre Completo"
                    return-object
                  >
                  </v-combobox>

                  <v-text-field
                    v-model="cv.comprador.dui"
                    label="DUI"
                    required
                  ></v-text-field>

                  <v-autocomplete
                    v-model="cv.comprador.domicilio"
                    :items="municipios"
                    item-text="nombre"
                    required
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Domicilio"
                    return-object
                  >
                    <template v-slot:selection="data">
                      {{ data.item.nombre }}
                    </template>
                    <template v-slot:item="data">
                      {{ data.item.nombre }}
                    </template>
                  </v-autocomplete>

                  <v-text-field
                    v-model="cv.comprador.domicilio.departamento.nombre"
                    label="Departamento"
                    required
                    disabled
                  ></v-text-field>
                </v-form>
              </v-sheet>
            </v-card>

            <v-btn color="primary" @click="nextStep(2)"> Continue </v-btn>

            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12 py-4"
              color="grey lighten-1"
              min-height="70vh"
            >
              <v-sheet
                height="792"
                width="612"
                elevation="5"
                class="px-4 py-4 contenedor"
                style="text-align: justify"
                color="white" 
              >
                <div class="sello oficinaCentral">sello oficina central</div>
                <div class="contenido">
                  <v-row>
                    <v-col class="text-center">
                      <b>CERTIFICADO DE CARTA DE VENTA</b>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      Don:
                      <b>
                        {{ cv.vendedor.nombreCompleto }}. DUI:
                        {{ cv.vendedor.dui }}.
                      </b>
                      mayor de edad, del domicilio de
                      <b>
                        {{ cv.vendedor.domicilio.nombre }}
                      </b>
                      Departamento de
                      <b>
                        {{ cv.vendedor.domicilio.departamento.nombre }}
                      </b>
                      ,ha dado en venta por la suma de
                      <b>
                        {{ monto }}
                      </b>
                      Al Sr.
                      <b>
                        {{ cv.comprador.nombreCompleto }}. DUI:
                        {{ cv.comprador.dui }}.
                      </b>
                      mayor de edad, vecino de
                      <b>
                        {{ cv.comprador.domicilio.nombre }}
                      </b>
                      Departamento de
                      <b>
                        {{ cv.comprador.domicilio.departamento.nombre }}
                      </b>
                      , el o__ semoviente__expresado__ a continuacion
                      <b>
                        {{ cv.semoviente.cantidad }}-{{
                          cv.semoviente.descripcion
                        }}
                      </b>
                    </v-col>
                  </v-row>
                </div>
                <div class="sello alcaldia">sello alcaldia</div>
                <div class="sello">exento</div>
                <div class="pie-pagina">fierro</div>
              </v-sheet>
            </v-card>

            <v-btn color="primary" @click="nextStep(3)"> Continue </v-btn>

            <v-btn text> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </v-app>
</template>


<script>
import numeros from "../store/numeros.js";
import { mapState } from "vuex";

export default {
  data: () => ({
    cv: {
      vendedor: {
        nombreCompleto: "",
        dui: "",
        domicilio: {
          nombre: "",
          departamento: {
            nombre: "",
          },
        },
      },
      comprador: {
        nombreCompleto: "",
        dui: "",
        domicilio: {
          nombre: "",
          departamento: {
            nombre: "",
          },
        },
      },
      semoviente: {
        valor: 1800,
        cantidad: 1,
        descripcion:
          'Toro prieto 2-parches Blancos en la Pansa y Cola Blanca, Comp. seg. ant. serie "J" Nº 599668, Exp. en Candelaria de la Frontera el 5 de Julio de 2021. Que se agrega.- ',
      },
    },
    e1: 1,
    steps: 2,
    valid: true,
    nameRules: [(v) => !!v || "Name is required"],
    personaDefault: {
      nombreCompleto: "prueba",
      dui: "",
      domicilio: {
        nombre: "",
        departamento: {
          nombre: "",
        },
      },
    },
  }),
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
    "cv.vendedor"(val) {
      if (val == null || val == undefined) {
        this.personaDefault.nombreCompleto = null;
        val = this.personaDefault;
        this.cv.vendedor = val;
      } else if (typeof val == "string") {
        this.personaDefault.nombreCompleto = val;
        val = this.personaDefault;
        console.log(
          "guardar nueva persona{nombre:" +
            this.personaDefault.nombreCompleto +
            ", }"
        );
        this.cv.vendedor = val;
      }
    },
    "cv.comprador"(val) {
      if (val == null || val == undefined) {
        this.personaDefault.nombreCompleto = null;
        val = this.personaDefault;
        this.cv.comprador = val;
      } else if (typeof val == "string") {
        this.personaDefault.nombreCompleto = val;
        val = this.personaDefault;
        console.log(
          "guardar nueva persona{nombre:" +
            this.personaDefault.nombreCompleto +
            ", }"
        );
        this.cv.comprador = val;
      }
    },
  },

  computed: {
    ...mapState(["personas", "municipios"]),
    monto() {
      return numeros.aLetras(this.cv.semoviente.valor);
    },
  },

  methods: {
    nextStep(n) {
      if (n === 3) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
  },
};
</script>

<style scoped>

.contenedor {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 200px 200px 150px;
  margin: 0px auto;
  border-radius: 0px !important;
}

.contenedor > div {
  padding: 20px;
}

.contenido {
  grid-row: 1/3;
  grid-column: 2 / 4;
}

.sello {
  border-style: solid;
  border-width: 1px;
}
</style>


