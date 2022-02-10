<template>
  <v-app>
    <v-main>
      <v-banner v-if="isConnected" color="success" dark single-line>
        Connected to a Database
      </v-banner>
      <v-banner v-else color="danger" dark single-line>
        Without Connection
      </v-banner>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",

  data: () => ({}),
  methods: {
    ...mapActions(["testConnection","getPersonas","getMunicipios"])
  },
  computed:{
    ...mapGetters(["isConnected"]),
  },
  async mounted(){
    await this.testConnection();
    this.getPersonas();
    this.getMunicipios();
  },
};
</script>
