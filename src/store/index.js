import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personas: [
      {
        nombreCompleto: "JUAN ANTONIO GUEVARA MARTINEZ",
        dui: "00176095-4",
        domicilio: {
          nombre: "El Porvenir",
          departamento: {
            nombre: "Santa Ana",
          },
        },
      },
      {
        nombreCompleto: "LUIS MANUEL GRANADINO LEON",
        dui: "06011251-6",
        domicilio: {
          nombre: "Santiago de la Frontera",
          departamento: {
            nombre: "Santa Ana",
          },
        },
      },
    ],
    municipios: [
      { nombre: "El Porvenir", departamento: { nombre: "Santa Ana" } },
      {
        nombre: "Santiago de la Frontera",
        departamento: { nombre: "Santa Ana" },
      },
      { nombre: "Concepcion de Ataco", departamento: { nombre: "Ahuachapan" } },
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
