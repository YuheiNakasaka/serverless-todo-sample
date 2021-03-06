import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/signin",
      name: "SignIn",
      component: SignIn
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    }
  ]
});
