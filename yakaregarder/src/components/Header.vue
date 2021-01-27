<template>
    <div class="header-top">
        <p> {{ titre }} </p>
        <div v-on:click="disconnect" class="btn btn-danger">Disconnect</div>
    </div>

</template>

<script>
import router from '../router'
export default {
  methods: {
      disconnect: function() {
          router.go()
      }
  },
    name: 'Header',
    data() {
        return {
            titre: 'Welcome on Yakaregarder'
        }
    }
}
</script>

<style scoped>
.header-top {
    position: fixed;
    top: 0;
    height: 50px;
    background: #333;
    color: #f1faf1;
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 25px;
}

.btn {
    position: fixed;
    top:5px;
    right: 40px;
}

</style>