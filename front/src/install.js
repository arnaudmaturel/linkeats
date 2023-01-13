import SideBar from "./components/SideBar.vue";

const SideBarSimple = {
 install(Vue, options) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  Vue.component("side-bar", SideBar);
 }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(SideBarSimple);
}

export default SideBarSimple;