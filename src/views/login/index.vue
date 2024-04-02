<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { type FormInstance, type FormRules } from 'element-plus'
import { Key, User } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { getLoginCodeApi } from '@/api/login'
import { type LoginRequestData } from '@/api/login/types/login'

const router = useRouter()

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)
/** 验证码图片 URL */
const codeUrl = ref('')
/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  username: 'admin',
  password: '12345678',
  code: ''
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}
/** 登录逻辑 */
function handleLogin() {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true
      useUserStore()
        .login(loginFormData)
        .then(() => {
          router.push({ path: '/' })
        })
        .catch(() => {
          createCode()
          loginFormData.password = ''
        })
        .finally(() => {
          loading.value = false
        })
    }
    else {
      console.error('表单校验不通过', fields)
    }
  })
}
/** 创建验证码 */
function createCode() {
  // 先清空验证码的输入
  loginFormData.code = ''
  // 获取验证码
  codeUrl.value = ''
  getLoginCodeApi().then((res) => {
    codeUrl.value = res.data
  })
}

/** 初始化验证码 */
createCode()
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="content">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-row style="width: 100%">
              <el-col :span="18">
                <el-input
                  v-model.trim="loginFormData.code"
                  placeholder="验证码"
                  type="text"
                  tabindex="3"
                  :prefix-icon="Key"
                  maxlength="6"
                />
              </el-col>
              <el-col :span="6">
                <el-button style="margin-top: 0px; margin-left: 8px; padding-left: 8px; padding-right: 8px">
                  获取验证码
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-button :loading="loading" type="primary" size="large" style="width: 100%" @click.prevent="handleLogin">
            登 录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--el-bg-color);
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
      }
    }
  }
}
</style>
