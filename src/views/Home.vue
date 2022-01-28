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
            <v-sheet min-height="80vh" rounded="lg" class="px-6 pt-8">
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
              <v-row class="mt-6">
                <v-spacer></v-spacer>

                <v-btn color="primary" @click="nextStep(1)"> Continuar </v-btn>
              </v-row>
            </v-sheet>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-sheet min-height="80vh" rounded="lg" class="px-6 pt-8">
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
              <v-row class="mt-6">
                <v-spacer></v-spacer>
                <v-btn text @click="nextStep(3)"> Regresar </v-btn>
                <v-btn color="primary" @click="nextStep(2)"> Continuar </v-btn>
              </v-row>
            </v-sheet>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="py-2" min-height="80vh">
              <v-sheet
                height="764"
                width="590"
                elevation="5"
                class="px-3 contenedor"
                color="white"
              >
                <div class="encabezado">
                  <v-row>
                    <v-col cols="2">
                      <v-img
                        alt="Logo gobierno"
                        contain
                        src="../assets/logo.svg"
                        transition="scale-transition"
                        width="30"
                      ></v-img>
                    </v-col>
                    <v-col>
                      <b> ALCALDIA MUNICIPAL DE CANDELARIA DE LA FRONTERA </b>
                      <b>Departamento de Santa Ana</b>
                    </v-col>
                  </v-row>
                </div>
                <div class="sello oficinaCentral">sello oficina central</div>
                <div class="contenido">
                  <v-row>
                    <v-col cols="12" class="text-center pb-1">
                      <b class="f-11">CERTIFICADO DE CARTA DE VENTA</b>
                    </v-col>

                    <v-col class="pt-0">
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
              <v-row class="mt-4 pr-8">
                <v-spacer></v-spacer>
                <v-btn text @click="nextStep(3)"> Regresar </v-btn>
                <v-btn color="primary" @click="nextStep(3)"> OK </v-btn>
              </v-row>
            </v-card>
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
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 50px 110px 110px 150px;
  margin: 0px auto;
  border-radius: 0px !important;
  padding: 10px;
  font-size: 15px;
}

.encabezado {
  font-size: 15px;
  font-family: "Times New Roman", Times, serif;
}

@media only screen and (max-width: 600px) {
  .contenedor {
    width: 340px !important;
    height: 440px !important;
    font-size: 8px;
  }

  .encabezado {
    font-size: 8px !important;
  }

  .container {
    padding: 0px !important;
  }
}

.contenido {
  grid-row: 2/4;
  grid-column: 2 / 4;
  padding: 0px 5px;
  line-height: 1.5em;
  text-align: justify;
}

.encabezado {
  grid-row: 1;
  grid-column: 1 / 4;
  font-family: "Times New Roman", Times, serif;
  padding-left: 14px;
}

.sello {
  border-style: solid;
  border-width: 1px;
}
</style>


