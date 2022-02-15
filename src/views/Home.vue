<template>
  <v-app id="inspire" class="grey lighten-3">
    <v-container>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step step="1" editable> Vendedor </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" editable> Comprador </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" editable> Semoviente </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            step="4"
            :editable="cv.comprador.isValid && cv.vendedor.isValid"
          >
            Certificado
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <form-persona vendedor rol="Vendedor"></form-persona>
          </v-stepper-content>

          <v-stepper-content step="2">
            <form-persona comprador rol="Comprador"></form-persona>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-sheet min-height="85vh" rounded="lg" class="px-6 pt-8">
              <v-form ref="form">
                <v-text-field
                  v-model.number="cv.semoviente.cantidad"
                  label="Cantidad"
                  required
                ></v-text-field>

                <v-text-field
                  v-model.number="cv.semoviente.valor"
                  label="Valor"
                  required
                ></v-text-field>

                <v-textarea
                  rows="4"
                  v-model="cv.semoviente.descripcion"
                  label="Descripcion"
                ></v-textarea>

                <v-file-input
                  prepend-icon="mdi-camera"
                  label="Fierro"
                  v-model="cv.semoviente.img"
                  accept="image/*"
                  capture="camera"
                  @change="onFileChange"
                ></v-file-input>
              </v-form>

              <v-row class="mt-6">
                <v-col>
                  <v-btn block large text @click="prevStep()"> Regresar </v-btn>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <v-btn block large color="primary" @click="nextStep()">
                    Continuar
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card class="py-2" min-height="80vh">
              <v-sheet
                elevation="5"
                class="px-3 contenedor"
                color="#FFFDF7"
                v-if="cv.comprador.isValid && cv.vendedor.isValid"
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
                      <span v-if="cv.vendedor.sexo == 'M'">DON:</span>
                      <span v-else>DOÑA:</span>
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
                      <span v-if="cv.comprador.sexo == 'M'">Al Sr.</span>
                      <span v-else>A la Sra.</span>
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
                      , el
                      <span v-if="cv.semoviente.cantidad > 1">o los</span>
                      semoviente<span v-if="cv.semoviente.cantidad > 1">s</span
                      ><br />
                      expresado<span v-if="cv.semoviente.cantidad > 1">s</span>
                      a continuacion
                      <b>
                        {{ cv.semoviente.cantidad }}-{{
                          cv.semoviente.descripcion
                        }}
                      </b>
                      <br />
                      semoviente<span v-if="cv.semoviente.cantidad > 1">s</span>
                      que esta<span v-if="cv.semoviente.cantidad > 1">n</span>
                      herrado________venteado______con el
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
                      <div class="fierro-container">
                        FIGURA DEL FIERRO
                        <v-img
                          alt="Logo gobierno"
                          class="fierro-img"
                          contain
                          :src="img"
                          transition="scale-transition"
                        ></v-img>
                      </div>
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
                <v-btn text @click="prevStep()"> Regresar </v-btn>
                <v-btn color="primary" @click="imprimir()"> Imprimir </v-btn>
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
import FormPersona from "../components/FormPersona";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    FormPersona,
  },
  data: () => ({
    img: "",
  }),

  computed: {
    ...mapGetters(["cv", "step"]),
    monto() {
      return numeros.aLetras(this.cv.semoviente.valor);
    },
    e1: {
      set(step) {
        this.setStep(step);
        return step;
      },
      get() {
        return this.step;
      },
    },
  },

  methods: {
    ...mapMutations(["setStep", "prevStep", "nextStep"]),
    ...mapActions(["print", "savePersona"]),

    onFileChange() {
      let reader = new window.FileReader();
      reader.readAsDataURL(this.cv.semoviente.img);
      reader.onload = () => {
        let imageDataUrl = reader.result;
        this.img = imageDataUrl;
      };
    },

    imprimir() {
      window.print();
      //this.print();
      //this.savePersona();
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

.fierro-container {
  text-align: center;
  margin: 0 auto;
  border-style: solid;
  border-width: 1px;

  height: 110px;
  width: 360px;
}

.fierro-img {
  margin: 0 auto;
  background-color: antiquewhite;

  width: 160px;
  height: 80px;
}

.contenedor {
  display: grid;
  margin: 0px auto;
  border-radius: 0px !important;
  height: 279.4mm !important;
  width: 215.9mm !important;

  grid-template-columns: 2fr 10fr;
  grid-template-rows: 100px 175px 175px 280px;
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
  .fierro-container {
    height: 70px;
    width: 180px;
  }

  .fierro-img {
    width: 70px;
    height: 50px;
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
    padding-left: 22px;
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

@media print {
  @page {
    size: letter portrait !important;
    margin: 0 !important;
  }

  .contenedor {
    height: 279.4mm !important;
    width: 215.9mm !important;

    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0 auto;
    print-color-adjust: exact;
  }
}
</style>


