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

                <v-radio-group v-model="cv.vendedor.sexo" column>
                  <v-radio label="Masculino" color="blue" value="M"></v-radio>
                  <v-radio label="Femenino" color="pink" value="F"></v-radio>
                </v-radio-group>
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

                <v-radio-group v-model="cv.comprador.sexo" column>
                  <v-radio label="Masculino" color="blue" value="M"></v-radio>
                  <v-radio label="Femenino" color="pink" value="F"></v-radio>
                </v-radio-group>
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
                color="#FFFDF7"
              >
                <div class="encabezado">
                  <v-row>
                    <v-col cols="2">
                      <v-img
                        alt="Logo gobierno"
                        contain
                        src="../assets/logo.svg"
                        transition="scale-transition"
                        width="100%"
                      ></v-img>
                    </v-col>
                    <v-col>
                      <b> ALCALDIA MUNICIPAL DE CANDELARIA DE LA FRONTERA </b>
                      <b>Departamento de Santa Ana</b>
                    </v-col>
                  </v-row>
                </div>
                <div class="sello oficinaCentral">
                  Sello de la Oficina Central
                </div>
                <div class="contenido">
                  <v-row>
                    <v-col cols="12" class="text-center pb-0">
                      <b class="titulo-contenido">
                        CERTIFICADO DE CARTA DE VENTA
                      </b>
                    </v-col>

                    <v-col class="pt-0">
                      DON:
                      <b>
                        {{ cv.vendedor.nombreCompleto }}. DUI:
                        {{ cv.vendedor.dui }}.-
                      </b>
                      mayor de edad, del domicilio de
                      <b>
                        {{ cv.vendedor.domicilio.nombre }}
                      </b>
                      <br />
                      Departamento de
                      <b>
                        {{ cv.vendedor.domicilio.departamento.nombre }}
                      </b>
                      ,ha dado en venta por la <br />
                      suma de
                      <b>
                        {{ monto }}
                      </b>
                      <br />
                      Al Sr.
                      <b>
                        {{ cv.comprador.nombreCompleto }}. DUI:
                        {{ cv.comprador.dui }}.-
                      </b>
                      mayor de <br />
                      edad, vecino de
                      <b>
                        {{ cv.comprador.domicilio.nombre }}
                      </b>
                      <br />
                      Departamento de
                      <b>
                        {{ cv.comprador.domicilio.departamento.nombre }}
                      </b>
                      , el o______________ semoviente____________ <br />
                      expresado_________ a continuacion
                      <b>
                        {{ cv.semoviente.cantidad }}-{{
                          cv.semoviente.descripcion
                        }}
                      </b>
                      <br />
                      semoviente________que
                      esta_______herrado________venteado______con el
                      <br />
                      fierro Del Ant._______ No.____0000014245.-
                      <br />
                      Del departamento de Santa Ana
                    </v-col>
                  </v-row>
                </div>
                <div class="sello alcaldia">Sello de la Alcaldia</div>
                <div class="sello">EXENTO</div>
                <div class="pie-pagina">
                  <v-row>
                    <v-col>
                      <div class="fierro">FIGURA DEL FIERRO</div>
                      Para seguridad del comprador, se le extiende la presente
                      en la Alcaldia Municipal de Candelaria de la Frontera a 10
                      de enero de 2021.
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-center firma">
                      <hr />
                      Firma del Comprador
                    </v-col>
                    <v-col class="text-center firma">
                      <hr />
                      Firma del Vendedor
                    </v-col>
                  </v-row>
                </div>
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
        sexo:"M",
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
        sexo:"M",
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
      fecha: "25/12/2022",
    },
    e1: 1,
    steps: 2,
    valid: true,
    nameRules: [(v) => !!v || "Name is required"],
    personaDefault: {
      nombreCompleto: "prueba",
      dui: "",
      sexo:"M",
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
.firma {
  margin: 0 auto;

  width: 50px !important;
  margin-top: 50px;
}

.fierro {
  text-align: center;
  margin: 0 auto;
  border-style: solid;
  border-width: 1px;

  height: 110px;
  width: 360px;
}

.contenedor {
  display: grid;
  margin: 0px auto;
  border-radius: 0px !important;

  grid-template-columns: 2fr 10fr;
  grid-template-rows: 80px 175px 175px 280px;
  padding: 10px;
  font-size: 12px;
}

.encabezado {
  grid-row: 1;
  grid-column: 1 / 4;
  font-family: "Times New Roman", Times, serif;

  padding-left: 13px;
  font-size: 14px !important;
}

.encabezado > div {
  padding: 0px !important;
}

.contenido {
  grid-row: 2/4;
  grid-column: 2 / 4;
  padding: 0px 5px !important;
}

.contenido,
.pie-pagina {
  padding: 0px 5px !important;
  line-height: 2em;
  text-align: justify !important;
}

.titulo-contenido {
  font-family: "Times New Roman", Times, serif;
  font-size: 14px !important;
}

.sello {
  border-style: solid;
  border-width: 1px;
  text-align: center;

  font-size: 7px !important;
}

@media only screen and (max-width: 670px) {
  .fierro {
    height: 70px;
    width: 180px;
  }

  .firma {
    width: 50px;
    margin-top: 10px;
  }

  .contenedor {
    width: 340px !important;
    height: 440px !important;

    grid-template-columns: 2.5fr 8.5fr;
    grid-template-rows: 40px 100px 100px 160px;
    padding: 10px;
    font-size: 7px;
  }

  .encabezado {
    font-size: 8px !important;
  }

  .container {
    padding: 0px !important;
  }

  .titulo-contenido {
    font-size: 12px !important;
  }

  .sello {
    font-size: 5px !important;
  }
}
</style>


