<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Cloud Prism
          </v-list-item-title>
          <v-list-item-subtitle>
            Connected
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-card
        class="mx-auto"
        max-width="300"
      >
        <v-list density="compact">
          <v-list-item v-for="(item, i) in items" :key="i" :value="item" :to="item.link" color="primary" @click="handleClick(item.text)">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Write code</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'

  const drawer = ref(null)
</script>

<script>
  import axios from 'axios';

  export default {
    data: () => ({
      items: [
        { text: 'Home', icon: 'mdi-home', link: '/' },
        { text: 'Task', icon: 'mdi-numeric-1-box', link: '/tasks/1' },
        { text: 'Task', icon: 'mdi-numeric-2-box', link: '/tasks/2' },
        { text: 'Connect', icon: 'mdi-login', link: '/oauth2/auth'},
        { text: 'Disconnect', icon: 'mdi-logout', link: '/logout'}
      ],
    }),
    methods: {
      handleClick(itemText) {
        if (itemText === 'Connect') {
          console.log('Connect is called');
          this.connect();
        }
      },
      async connect() {
        try {
            const response = await axios.get('http://localhost:4000/oauth2/auth-url');
            console.log('Redirecting to:', response.data);
            window.location.href = response.data;
        } catch (error) {
            console.error('Authentication failed:', error);
        }
      }
    }
  }
</script>