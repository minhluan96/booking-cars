<template>
  <div class="container-fluid">
    <NavBar />
    <div class="row card-contain">
      <div class="col-xs-12">
        <el-card class="box-card signup-card">
          <div slot="header" class="clearfix">
            <h2>ĐĂNG KÝ</h2>
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

          <el-input style="margin-top: 10px"
            placeholder="Nhập lại mật khẩu"
            type="password"
            v-model="inputCheckPass">
            <i slot="prefix" class="el-input__icon glyphicon glyphicon-repeat"></i>
          </el-input>

          <el-alert style="margin-top: 12px"
            :title="errorMessage"
            v-if="errorMessage != ''"
            :closable="false"
            type="error">
          </el-alert>

          <div style="margin-top: 20px">
            <el-button @click="cancelSignup">Hủy bỏ</el-button>
            <el-button type="primary" @click="signup">Đăng ký</el-button>
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
      inputCheckPass: '',
      errorMessage: ''
    }
  },
  methods: {
    cancelSignup() {
      this.$router.push('/login')
    },
    signup() {
      if (!this.validateInput()) return
      var roleLocationIdenfifier = 2
      var userPayload = {
        Username: this.inputName,
        Password: this.inputPass,
        Role: roleLocationIdenfifier
      }
      this.$store.dispatch('signupRequest', userPayload).then(value => {
        this.$message({ type: 'success', message: `Đăng ký thành công` });
        this.$router.push('/login')
      }).catch(err => {
        if (err.response.status == 403) {
          this.errorMessage = err.response.data.error
          return
        }
        this.errorMessage = 'Đăng ký không thành công'
        this.$message({ type: 'error', message: `Đăng ký thất bại. Có lỗi xảy ra: ${err}` });
      })
    },
    validateInput() {
      if (this.inputName.trim() === '' || this.inputPass.trim() === '' || this.inputCheckPass.trim() === '') {
        this.errorMessage = 'Vui lòng nhập đầy đủ thông tin'
        return false
      }
      var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if (format.test(this.inputName)) {
        this.errorMessage = 'Tên tài khoản không được chứa các kí tự đặc biệt'
        return false
      }
      if (this.inputPass.trim().length < 6) {
        this.errorMessage = 'Mật khẩu phải có ít nhất 6 kí tự'
        return false
      }
      if (this.inputPass.trim() != this.inputCheckPass.trim()) {
        this.errorMessage = "Nhập lại mật khẩu không chính xác"
        return false
      }
      this.errorMessage = ''
      return true
    }

  }

}
</script>

<style lang="css">
  .signup-card {
    margin: 0 auto;
    height: 420px;
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
