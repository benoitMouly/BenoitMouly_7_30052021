import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import Login from '../views/Connexion.vue';
import Register from '../views/Inscription.vue';



const routes = [

  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
    }
  },
  {
   path: '/profile/:id',
   name: 'userProfile',
   component: () =>import('../views/UserProfil.vue'),
  props: true
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
    }
  },
  ]

const router  =  new VueRouter({
  mode: "history", routes});

router.beforeEach((to, from, next) => {

    if (!localStorage.getItem('token') && (to.name != 'login') && (to.name != 'register')){
      // Authorization to login and register
      next({name : 'login'})
    } else {
      // Logged in, everything fine
      next()
    }
  });

Vue.use(VueRouter);
export default router