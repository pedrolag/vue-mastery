<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">

      <!-- Card header -->
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>

      <!-- Card body -->
      <v-card-text>
        <v-form>

          <!-- Username input -->
          <v-text-field
            label="Username"
            type="text"
            prepend-icon="mdi-account-circle"
          />

          <!-- Password input -->
          <v-text-field 
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />

        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <!-- Card footer -->
      <v-card-actions>

        <!-- Register button -->
        <v-btn
          color="success"
        >Register</v-btn>

        <v-spacer></v-spacer>

        <!-- Login button -->
        <v-btn
          color="info"
        >Login</v-btn>

      </v-card-actions>

    </v-card>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    showPassword: false
  }),
};
</script>
