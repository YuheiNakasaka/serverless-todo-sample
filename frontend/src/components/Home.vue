<template>
  <div class="apigateway-test">
    <div class="contents">
      <p>{{ status }}</p>
      <p class="message">{{ message }}</p>
      <p>
        <router-link :to="{ name: 'SignUp'}">SignUpする場合はこちら</router-link>
      </p>
      <p>
        <router-link :to="{ name: 'SignIn'}">SignInする場合はこちら</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import { Auth } from "aws-amplify";
import * as api from "@/libs/api/api";
export default {
  data() {
    return {
      status: "",
      message: "empty"
    };
  },
  created() {
    Auth.currentSession()
      .then(data => {
        console.log(data);
        this.status = "ログインしています";
      })
      .catch(err => {
        console.log(err);
        this.status = "ログインしていません";
      });
  },
  mounted() {
    this.test();
  },
  methods: {
    async test() {
      const { body } = await api.getTest();
      const response = JSON.parse(body);
      this.message = response.message;
    }
  }
};
</script>
<style scoped>
.message {
  font-weight: bold;
  font-size: 24px;
}
</style>
