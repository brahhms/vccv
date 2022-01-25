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

            <v-btn color="primary" @click="nextStep(3)"> Continue </v-btn>

            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12" color="grey lighten-1" min-height="70vh">
              <v-sheet min-height="70vh" rounded="lg" class="px-12 pt-8">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <b>CERTIFICADO DE CARTA DE VENTA</b>
                  Don {{ cv.vendedor.nombres }} {{ cv.vendedor.apellidos }}.
                  DUI: {{ cv.vendedor.dui }}. mayor de edad, del domicilio de
                  {{ cv.vendedor.domicilio.nombre }}
                  Departamento de
                  {{ cv.vendedor.domicilio.departamento.nombre }}
                  ,ha dado en venta por la suma de {{ cv.monto }} Al
                  {{ cv.comprador.nombres }}
                </v-form>
              </v-sheet>
            </v-card>

            <v-btn color="primary" @click="nextStep(n)"> Continue </v-btn>

            <v-btn text> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </v-app>
</template>


<script>
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
            nombre: null,
          },
        },
      },
      comprador: {
        nombreCompleto: "",
        dui: "",
        domicilio: {
          nombre: "",
          departamento: {
            nombre: null,
          },
        },
      },
      monto: 1700,
    },
    e1: 1,
    steps: 2,
    valid: true,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) =>
        (v.nombreCompleto && v.nombreCompleto.length <= 150) ||
        "Name must be less than 150 characters",
    ],
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
        this.cv.vendedor = this.personaDefault;
      } else if (
        val.nombreCompleto == undefined ||
        val.nombreCompleto == null
      ) {
        this.personaDefault.nombreCompleto = val;
        this.cv.vendedor = this.personaDefault;
      }

      console.log(this.cv.vendedor.nombreCompleto);
    },
  },

  computed: {
    ...mapState(["personas", "municipios"]),
  },

  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
  },
};
</script>