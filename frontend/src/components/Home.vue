<template>
  <div class="apigateway-test">
    <div class="contents">
      <p>{{ status }}</p>
      <div v-show="items.length > 0" class="items">
        <div v-for="item in items" :key="item.id" class="item">
          <p>{{ item.id }}</p>
        </div>
      </div>

      <div v-if="user.uid !== null">
        <p>
          <button class="btn btn-primary" @click="signOut">ログアウト</button>
        </p>
      </div>
      <div v-else>
        <p>
          <router-link :to="{ name: 'SignUp'}">SignUpする場合はこちら</router-link>
        </p>
        <p>
          <router-link :to="{ name: 'SignIn'}">SignInする場合はこちら</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { Auth } from "aws-amplify";
// import * as api from "@/libs/api/api";
export default {
  data() {
    return {
      status: "",
      message: "empty",
      user: {
        uid: null
      },
      items: []
    };
  },
  created() {
    Auth.currentSession()
      .then(data => {
        this.status = "ログインしています";
        this.user.uid = data.idToken.payload["cognito:username"];
      })
      .catch(err => {
        console.log(err);
        this.status = "ログインしていません";
        this.$router.push({ name: "SignIn" });
      });
  },
  mounted() {},
  methods: {
    signOut() {
      Auth.signOut()
        .then(data => {
          console.log(data);
          this.message_text = "ログアウトしました";
          this.$router.push({ name: "SignIn" });
        })
        .catch(err => {
          console.log(err);
          this.message_text = "ログアウトできませんでした";
        });
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
