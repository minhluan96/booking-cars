<template>
  <div class="">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><strong>LOCATION IDENTIFIER</strong></el-menu-item>
      <el-menu-item index="3" v-if="isShowUserOnNav()">{{username}}</el-menu-item>
      <el-menu-item index="4" v-if="isShowUserOnNav()" @click="logut">Đăng xuất</el-menu-item>
    </el-menu>
    <div class="line"></div>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        username: ''
      }
    },
    methods: {
      logut() {
        localStorage.removeItem('user')
        this.$router.push('/login')
      },
      isShowUserOnNav() {
        if (localStorage.getItem('user') != null) {
          return true
        }
        return false
      }
    },
    mounted() {
      //do something after mounting vue instance
      var currentUser = JSON.parse(localStorage.getItem('user'))
      if (currentUser == null) return
      var payload = { ID: currentUser.user.id }
      this.$store.dispatch('getUserInfo', payload).then(value => {
        this.username = value.Username
      }).catch(err => {
        this.$message({ type: 'error', message: `Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại` });
      })
    }
  }
</script>
