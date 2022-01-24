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
                  <v-text-field
                    v-model="cv.vendedor.nombres"
                    :rules="nameRules"
                    label="Nombre Completo"
                    required
                  ></v-text-field>

                  <v-select
                    v-model="cv.vendedor.domicilio"
                    :items="municipios"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Domicilio"
                    required
                  ></v-select>

                  <v-text-field
                    v-model="cv.vendedor.domicilio.departamento.nombre"
                    label="Departamento"
                    required
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
                  <v-text-field
                    v-model="cv.comprador.nombres"
                    :rules="nameRules"
                    label="Nombre Completo"
                    required
                  ></v-text-field>

                  <v-select
                    v-model="cv.comprador.domicilio"
                    :items="municipios"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Domicilio"
                    required
                  ></v-select>

                  <v-text-field
                    v-model="cv.comprador.domicilio.departamento.nombre"
                    label="Departamento"
                    required
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
export default {
  data: () => ({
    cv: {
      vendedor: {
        nombres: "JUAN ANTONIO",
        apellidos: "GUEVARA MARTINEZ",
        dui: "00176095-4",
        domicilio: {
          nombre: "El Porvenir",
          departamento: {
            nombre: "Santa Ana",
          },
        },
      },
      comprador: {
        nombres: "JUAN ANTONIO",
        apellidos: "GUEVARA MARTINEZ",
        dui: "00176095-4",
        domicilio: {
          nombre: "El Porvenir",
          departamento: {
            nombre: "Santa Ana",
          },
        },
      },
      monto: 1700,
    },
    e1: 1,
    steps: 2,
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 50) || "Name must be less than 10 characters",
    ],
    select: null,
    municipios: [
      { nombre: "El Porvenir", departamento: { nombre: "Santa Ana" } },
    ],
  }),
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
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