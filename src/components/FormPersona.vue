<template>
  <v-sheet min-height="85vh" rounded="lg" class="px-6 pt-8">
    <v-form ref="form">
      <b v-if="vendedor">Vendedor</b>
      <b v-else>Comprador</b>

      <v-combobox
        v-model="model"
        :loading="loading"
        :items="personas"
        :search-input.sync="search"
        item-text="nombreCompleto"
        required
        :rules="nameRules"
        label="Nombre Completo"
        return-object
      >
      </v-combobox>

      <v-text-field
        :disabled="exist"
        v-model="model.dui"
        label="DUI"
        required
      ></v-text-field>

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

      <v-radio-group :disabled="exist" v-model="model.sexo" column>
        <v-radio label="Masculino" color="blue" value="M"></v-radio>
        <v-radio label="Femenino" color="pink" value="F"></v-radio>
      </v-radio-group>
    </v-form>
    <v-row class="mt-2">
      <v-col>
        <v-btn block large text @click="prevStep()"> Regresar </v-btn>
      </v-col>

      <v-spacer></v-spacer>
      <v-col>
        <v-btn
          block
          :disabled="!model.isValid"
          color="primary"
          @click="nextStep()"
          large
        >
          Continuar
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "FormPersona",
  props: {
    comprador: Boolean,
    vendedor: Boolean,
  },

  data: () => ({
    nameRules: [(v) => !!v || "Name is required"],
    duiRules: (value) => {
      const pattern = "^[0-9]{8}-[0-9]{1}";
      return pattern.test(value) || "Invalid e-mail.";
    },
    loading: false,
    search: null,
  }),
  computed: {
    ...mapState(["municipios", "personas"]),
    ...mapGetters(["nuevoComprador", "nuevoVendedor", "personaDefault"]),
    model: {
      set(persona) {
        if (!persona) {
          persona = Object.assign({}, this.personaDefault);
        } else {
          if (typeof persona != "object") {
            let nombreCompleto = persona;
            persona = Object.assign({}, this.personaDefault);
            persona.nombreCompleto = nombreCompleto;
          }
        }
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
    exist() {
      return typeof this.model._id == "string";
    },
  },

  methods: {
    ...mapMutations([
      "setComprador",
      "setVendedor",
      "validar",
      "nextStep",
      "prevStep",
    ]),
    ...mapActions(["searchPersonas"]),

    async querySelections(v) {
      this.loading = true;

      await this.searchPersonas(v);
      this.loading = false;
    },
  },

  watch: {
    model: {
      deep: true,
      handler(newVal) {
        this.model = newVal;
        this.validar();
      },
    },
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },

  mounted() {},
};
</script>
