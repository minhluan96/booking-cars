<template>
  <div class="container-fluid">
    <NavBar />
    <div class="row card-contain">
      <div class="col-xs-12">
        <el-card class="box-card login-card">
          <div slot="header" class="clearfix">
            <h2>ĐĂNG NHẬP</h2>
          </div>
          <el-input style="margin-top: 10px"
            placeholder="Tên tài khoản"
            v-model="inputName">
            <i slot="prefix" class="el-input__icon glyphicon glyphicon-user"></i>
          </el-input>

          <el-input style="margin-top: 10px"
            placeholder="Mật khẩu"
            type="password"
            v-model="inputPass">
            <i slot="prefix" class="el-input__icon glyphicon glyphicon-lock"></i>
          </el-input>

          <el-alert style="margin-top: 12px"
            :title="errorMessage"
            v-if="errorMessage != ''"
            :closable="false"
            type="error">
          </el-alert>

          <div style="margin-top: 20px">
            <el-button @click="singupButtonClick">Đăng ký</el-button>
            <el-button type="primary" @click="onButtonLoginClick">Đăng nhập</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'login',
  components: {
    NavBar
  },
  data() {
    return {
      inputName: '',
      inputPass: '',
      errorMessage: ''
    }
  },
  methods: {
    onButtonLoginClick() {
      if (!this.validateInput()) return
      var userPayload = { Username: this.inputName, Password: this.inputPass }
      this.$store.dispatch('loginRequest', userPayload).then(value => {
        if (!value.auth) {
          this.errorMessage = 'Tên tài khoản hoặc mật khẩu không chính xác'
          return
        }
        localStorage.setItem('user', JSON.stringify(value))
        this.$router.push( {name: 'home'} )
      }).catch(err => {
        this.errorMessage = 'Đăng nhập thất bại'
        this.$message({ type: 'error', message: `Đăng nhập thất bại. Có lỗi xảy ra: ${err}` });
      })
    },
    singupButtonClick() {
      this.$router.push('/signup')
    },
    validateInput() {
      if (this.inputName.trim() === '' || this.inputPass.trim() === '') {
        this.errorMessage = "Vui lòng nhập đầy đủ thông tin"
        return false
      }
      this.errorMessage = ''
      return true
    }
  },
  mounted() {
    //do something after mounting vue instance
    var currentUser = JSON.parse(localStorage.getItem('user'))
    if (currentUser != null) {
      this.$router.push('/')
    }
  }

}
</script>

<style lang="css">
  .login-card {
    margin: 0 auto;
    height: 350px;
  }

  .card-contain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 70vh;
  }
</style>
