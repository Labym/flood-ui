<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="14">
          <el-input size="small" @keyup.enter.native="handleLogin" :maxlength="captcha.len" v-model="loginForm.captcha.value" auto-complete="off" placeholder="请输入验证码">
            <i slot="prefix" class="icon-yanzhengma"></i>
          </el-input>
        </el-col>
        <el-col :span="10">
          <div class="login-code">
            <span class="login-code-img" @click="refreshCode" v-if="captcha.type == 'text'">{{captcha.value}}</span>
            <img :src="captcha.src" alt="验证码" class="login-code-img" @click="refreshCode" v-else/>
            <!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { randomLenNum } from '@/util/util'
  import { mapGetters } from 'vuex'
  export default {
    name: 'userlogin',
    data () {
      const validateCode = (rule, value, callback) => {
        if (this.captcha.value !== value) {
          this.loginForm.captcha.value = ''
          this.refreshCode()
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: '123456',
          captcha: {
            value: ''
          },
          randomStr: ''
        },
        captcha: {
          src: '/admin/code',
          value: '',
          len: 4,
          type: 'image'
        },
        loginRules: {
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
          ],
          captcha: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
          ]
        },
        passwordType: 'password'
      }
    },
    created () {
      this.refreshCode()
    },
    mounted () {},
    computed: {
      ...mapGetters(['tagWel'])
    },
    props: [],
    methods: {
      refreshCode () {
        this.loginForm.captcha.value = ''
        this.loginForm.randomStr = randomLenNum(this.captcha.len, true)
        this.captcha.type === 'text'
          ? (this.captcha.value = randomLenNum(this.captcha.len))
          : (this.captcha.src = `${this.codeUrl}/${this.loginForm.randomStr}`)
      },
      showPassword () {
        this.passwordType === ''
          ? (this.passwordType = 'password')
          : (this.passwordType = '')
      },
      handleLogin () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('LoginByUsername', this.loginForm).then(
              (res) => {
                this.$store.commit('ADD_TAG', this.tagWel)
                this.$router.push({ path: this.tagWel.value })
              },
              () => {
                this.refreshCode()
              }
            )
          }
        })
      }
    }
  }
</script>

<style>

</style>
