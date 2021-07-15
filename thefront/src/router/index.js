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
    }
  },

  {
  path: '/profil',
  name: 'Profil',
  component: () => import('../views/Profil.vue'),
  meta: {

  }
  },

  /*{
    path: '/UserProfile/items.userId',
    name: 'userProfile',
    props : true,
    component: () =>import('../views/UserProfil.vue'),
    meta: {
    }
  },*/

  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
    }
  },
  {
   path: '/UserProfile/:id',
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
  {
    path:'/bienvenue',
    name: 'bienvenue',
    component: () =>import('../views/Bienvenue.vue'),
    meta: {
    }
  },

  ]
const router  =  new VueRouter({
  mode: "history", routes});

/*router.beforeEach((to, from, next) => {

    if (!localStorage.getItem('token') && (to.name != 'login' || 'register')){
      // Continue to page.
      next({name : 'login'})
    } else {
      // Not logged in, redirect to login.
      next()
    }
  });*/

Vue.use(VueRouter);
export default router