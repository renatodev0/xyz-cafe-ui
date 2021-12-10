<template>
  <div class="">
    <div class="home">
      <small class="display-3"> ☕ </small> <br />
      <small class="h2 cafe"> Seja Bem Vindo</small>
      <p class="display-2 cafe">XYZ CAFE</p>

      <router-link class="col-md-8 btn btn-primary mt-2" tag="a" to="/menu">
        <span class="">ACOMPANHAR PEDIDO</span>
      </router-link>
      <router-link class="col-md-6 btn btn-success mt-2" tag="a" to="/menu">
        <span class="">NOVO PEDIDO</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String,
  },
  mounted() {
    document.querySelector("body").setAttribute("style", "background:#eac29a");
    window.document.title = "XYZ Cafe";
  },
};
</script>

<style scoped>
.home {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-family: "Oswald", sans-serif;
}
.cafe {
  color: #5c3935;
}
</style>
