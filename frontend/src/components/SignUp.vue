<template>
  <div class="page">
    <p>{{ status }}</p>
    <p>{{ message_text }}</p>
    <div v-show="signupShowing" class="login-form">
      <p>サインアップ</p>
      <ul class="login-form">
        <li>
          <label>ユーザー名</label>
          <input v-model="userInfo.username" type="text">
        </li>
        <li>
          <label>Email</label>
          <input v-model="userInfo.email" type="email">
        </li>
        <li>
          <label>パスワード</label>
          <input v-model="userInfo.password" type="password">
        </li>
      </ul>
      <button class="btn btn-primary" @click="signUp">サインアップ</button>
      <br>
      <router-link :to="{ name: 'SignIn'}">SignInする場合はこちら</router-link>
    </div>

    <div v-show="confirmShowing" class="login-form">
      <p>検証コード入力</p>
      <ul class="login-form">
        <li>
          <label>コード</label>
          <input v-model="code" type="number">
        </li>
      </ul>
      <button class="btn btn-primary" @click="confirm">送信</button>
      <br>
      <br>
      <br>
      <button class="btn btn-primary" @click="resend">検証コードを再送信する</button>
    </div>
  </div>
</template>
<script>
import Amplify, { Auth } from "aws-amplify";
const awsExports = require("@/aws-exports").default;
Amplify.configure(awsExports);
export default {
  data() {
    return {
      status: "",
      userInfo: {
        email: "",
        username: "",
        password: ""
      },
      message_text: "",
      url: "",
      code: "",
      signupShowing: true,
      confirmShowing: false
    };
  },
  created() {
    this.checkLogin();
  },
  mounted() {
    console.log(this.userInfo);
  },
  methods: {
    checkLogin() {
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
    signUp() {
      Auth.signUp({
        username: this.userInfo.email,
        password: this.userInfo.password,
        attributes: {
          name: this.userInfo.username
        }
      })
        .then(data => {
          console.log(data);
          this.signupShowing = false;
          this.confirmShowing = true;
        })
        .catch(err => {
          console.log(err);
          this.message_text = "サインアップが失敗しました";
        });
      this.checkLogin();
    },
    confirm() {
      Auth.confirmSignUp(this.userInfo.email, this.code)
        .then(data => {
          console.log(data);
          this.$router.push({ name: "SignIn" });
        })
        .catch(err => {
          console.log(err);
          this.message_text = "検証コードが間違っています";
        });
      this.checkLogin();
    },
    resend() {
      Auth.resendSignUp(this.userInfo.email)
        .then(() => {
          this.message_text = "検証コードを再送信しました";
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
<style scoped>
.login-form {
  list-style: none;
}
</style>