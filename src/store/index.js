import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personas: [
      {
        nombreCompleto: "JUAN ANTONIO GUEVARA MARTINEZ",
        dui: "00176095-4",
        sexo: "M",
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
        sexo: "M",
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
    cv: {
      vendedor: {
        nombreCompleto: "",
        dui: "",
        sexo: null,
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
        sexo: null,
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
        img: null
      },
      fecha: "25/12/2022",
    },

  },
  mutations: {
    setVendedor(state, persona) {
      state.cv.vendedor = persona;
    },
    setComprador(state, persona) {
      state.cv.comprador = persona;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    nuevoVendedor: state => state.cv.vendedor,
    nuevoComprador: state => state.cv.comprador,
    cv: state => state.cv,
    valid: state => {
      if (!state.cv.vendedor) {
        return false;
      }
      if (!state.cv.comprador) {
        return false;
      }
      return true
    },
  }
})
