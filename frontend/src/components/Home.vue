<template>
  <div class="apigateway-test">
    <div class="contents">
      <p>{{user.name}}: {{ status }}</p>
      <hr>
      <div v-show="items.length > 0" class="items">
        <div v-for="item in items" :key="item.id" class="item">
          <div>
            <span @click="onUpdateMode">{{ item.content }}</span>
            <span @click="deleteItem(item)">X</span>

            <div v-if="updateMode">
              <textarea v-model="editText"></textarea>
              <br>
              <button @click="updateItem(item)">更新</button>
            </div>
          </div>
          <br>
          <br>
        </div>
      </div>

      <br>
      <br>
      <br>
      <br>
      <div>
        <textarea v-model="contentText"></textarea>
        <br>
        <button @click="addItem">追加</button>
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
import * as api from "@/libs/api/api";
export default {
  data() {
    return {
      status: "",
      user: {
        uid: null
      },
      items: [],
      contentText: "",
      editText: "",
      updateMode: false
    };
  },
  created() {
    Auth.currentSession()
      .then(data => {
        this.status = "ログインしています";
        this.user.uid = data.idToken.payload["cognito:username"];
        this.user.name = data.idToken.payload["name"];
      })
      .catch(err => {
        console.log(err);
        this.status = "ログインしていません";
        this.$router.push({ name: "SignIn" });
      });
  },
  mounted() {
    api
      .getItems()
      .then(resp => {
        this.items = resp.data.Items;
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    signOut() {
      Auth.signOut()
        .then(data => {
          console.log(data);
          this.$router.push({ name: "SignIn" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onUpdateMode() {
      this.updateMode = !this.updateMode;
    },
    addItem() {
      api
        .addItem(this.contentText)
        .then(resp => {
          this.items.push(resp);
          this.contentText = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateItem(item) {
      api
        .updateItem(item.id, this.editText)
        .then(() => {
          this.items[this.items.indexOf(item)].content = this.editText;
          this.editText = "";
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteItem(item) {
      api
        .deleteItem(item)
        .then(() => {
          this.items.splice(this.items.indexOf(item), 1);
        })
        .catch(err => {
          console.log(err);
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
