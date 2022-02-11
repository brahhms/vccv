import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const personaDefault = {
  nombreCompleto: null,
  dui: null,
  sexo: null,
  domicilio: {
    nombre: "",
    departamento: {
      nombre: "",
    },
  },
  isValid: false,
};

function isPersonaValid(persona) {
  if (persona) {
    if (persona.sexo && persona.nombreCompleto && persona.dui && persona.domicilio &&
      persona.sexo != '' && persona.nombreCompleto != '' && persona.dui != '' && persona.domicilio != '') {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

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
            nombre: "Santa Ana"
          }
        }
      },
      {
        nombreCompleto: "LUIS MANUEL GRANADINO LEON",
        dui: "06011251-6",
        sexo: "M",
        domicilio: {
          nombre: "Santiago de la Frontera",
          departamento: {
            nombre: "Santa Ana"
          }
        }
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
      vendedor: personaDefault,
      comprador: personaDefault,
      semoviente: {
        valor: 1800,
        cantidad: 1,
        descripcion:
          'Toro prieto 2-parches Blancos en la Pansa y Cola Blanca, Comp. seg. ant. serie "J" Nº 599668, Exp. en Candelaria de la Frontera el 5 de Julio de 2021. Que se agrega.- ',
        img: null
      },
      fecha: "25/12/2022",
    },
    isConnected: false,

    step: 1
  },
  mutations: {
    validar(state) {
      state.cv.vendedor.isValid = isPersonaValid(state.cv.vendedor);
      state.cv.comprador.isValid = isPersonaValid(state.cv.comprador);
    },
    nextStep(state) {
      if (state.step > 4) {
        state.step = 1;
      } else {
        state.step++;
      }
    },
    prevStep(state) {
      if (state.step > 1) {
        state.step--;
      }
    },
    setStep(state, step) {
      state.step = step;
    },
    setVendedor(state, persona) {
      state.cv.vendedor = persona;
    },
    setComprador(state, persona) {
      state.cv.comprador = persona;
    },
    setConnectedStatus(state, status) {
      state.isConnected = status;
    },
    setPersonas(state, personas) {
      state.personas = personas;
    },
    setMunicipios(state, municipios) {
      state.municipios = municipios;
    },
  },
  actions: {
    async testConnection({ commit }) {
      const res = await axios.get('/');
      if (res.data) {
        commit('setConnectedStatus', true);
      } else {
        commit('setConnectedStatus', false);
      }
    },
    async print() {
      console.log("imprimiendo...");
    },

    async savePersona({
      state
    }) {

      if (state.cv.vendedor._id == undefined) {
        const nuevo = { ...state.cv.vendedor };
        nuevo.isValid = undefined;
        console.log(nuevo);

        let res = await axios.post('/savePersona', nuevo);
        if (res.data.ok) {
          console.log("ok");
        }
      }
      if (state.cv.comprador._id == undefined) {
        const nuevo = { ...state.cv.comprador };
        
        nuevo.isValid = undefined;
        console.log(nuevo);

        let res = await axios.post('/savePersona', nuevo);
        if (res.data.ok) {
          console.log("ok");
        }
      }

    },


    async getPersonas({ commit }) {
      const res = await axios.get('/personas');
      if (res.statusText == 'OK') {
        commit('setPersonas', res.data);
      } else {
        commit('setPersonas', []);
      }
    },
    async getMunicipios({ commit }) {
      const res = await axios.get('/municipios');

      if (res.statusText == 'OK') {
        commit('setMunicipios', res.data);
      } else {
        commit('setMunicipios', []);
      }
    }
  },
  modules: {
  },
  getters: {
    nuevoVendedor: state => state.cv.vendedor,
    nuevoComprador: state => state.cv.comprador,
    cv: state => state.cv,
    personaDefault: () => personaDefault,

    isConnected: state => state.isConnected,
    step: state => state.step
  }
})
