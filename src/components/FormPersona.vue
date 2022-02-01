<template>
  <v-form ref="form">
    <b v-if="vendedor">Vendedor</b>
    <b v-else>Comprador</b>

    <v-combobox
      v-model="model"
      :items="personas"
      item-text="nombreCompleto"
      required
      :rules="nameRules"
      label="Nombre Completo"
      return-object
    >
    </v-combobox>

    <v-text-field v-model="model.dui" label="DUI" required></v-text-field>

    <v-autocomplete
      v-model="model.domicilio"
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
      v-model="model.domicilio.departamento.nombre"
      label="Departamento"
      required
      disabled
    ></v-text-field>

    <v-radio-group v-if="model.sexo == null" v-model="model.sexo" column>
      <v-radio label="Masculino" color="blue" value="M"></v-radio>
      <v-radio label="Femenino" color="pink" value="F"></v-radio>
    </v-radio-group>
  </v-form>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "FormPersona",
  props: {
    comprador: Boolean,
    vendedor: Boolean,
  },

  data: () => ({
    nameRules: [(v) => !!v || "Name is required"],
    personaDefault: {
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
  }),
  computed: {
    ...mapState(["personas", "municipios"]),
    ...mapGetters(["nuevoComprador", "nuevoVendedor"]),
    model: {
      set(persona) {
        if (this.comprador) {
          this.setComprador(persona);
        } else if (this.vendedor) {
          this.setVendedor(persona);
        }
        return persona;
      },
      get() {
        if (this.comprador) {
          return this.nuevoComprador;
        } else if (this.vendedor) {
          return this.nuevoVendedor;
        } else {
          return null;
        }
      },
    },
  },

  methods: {
    ...mapMutations(["setComprador", "setVendedor"]),
    resetPersona() {
      if (this.vendedor) {
        this.setVendedor(this.personaDefault);
      } else {
        this.setComprador(this.personaDefault);
      }
    },
    isValid() {
      if (!this.model) {
        return false;
      }
      return true;
    },
  },

  watch: {
    model(val) {
      if (val == null || val == undefined) {
        this.personaDefault.nombreCompleto = null;
        this.resetPersona();
      } else if (typeof val == "string") {
        this.personaDefault.nombreCompleto = val;
        val = this.personaDefault;
        console.log(
          "guardar nueva persona{nombre:" +
            this.personaDefault.nombreCompleto +
            ", }"
        );
        this.resetPersona();
      }
    },
  },
};
</script>
