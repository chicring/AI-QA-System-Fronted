<script setup lang="ts">
import { ref } from 'vue';
import { register } from '@/api/user';
import type { UserRegisterRequest } from '@/api/types/user';

const registerRequest = ref<UserRegisterRequest>({
  username: '',
  password: '',
  nickname: '',
  mobile: '',
  email: '',
  sex: 1
})

const show1 = ref(false);
const Regform = ref();


const passwordRules = ref([
  (v: string) => !!v || '密码不能为空',
  (v: string) => (v && v.length <= 10) || '密码长度不能超过10个字符'
]);
const emailRules = ref([(v: string) => !!v || '邮箱不能为空', (v: string) => /.+@.+\..+/.test(v) || '请输入有效的邮箱地址']);

async function validate() {
  
  await register(registerRequest.value);
}
</script>

<template>

  <v-form @submit="validate" ref="Regform" lazy-validation class="mt-7 loginForm">
  
    <v-text-field
          v-model="registerRequest.nickname"
          density="comfortable"
          hide-details="auto"
          variant="outlined"
          color="primary"
          label="用户名"
          class="mt-4 mb-4"
        >
    </v-text-field>
    <v-text-field
          v-model="registerRequest.mobile"
          density="comfortable"
          hide-details="auto"
          variant="outlined"
          color="primary"
          label="手机号"
          class="mt-4 mb-4"
        >
    </v-text-field>
    <v-text-field
      v-model="registerRequest.email"
      :rules="emailRules"
      label="邮箱地址"
      class="mt-4 mb-4"
      required
      density="comfortable"
      hide-details="auto"
      variant="outlined"
      color="primary"
    ></v-text-field>
    <v-text-field
      v-model="registerRequest.username"
      label="用户昵称"
      class="mt-4 mb-4"
      required
      density="comfortable"
      hide-details="auto"
      variant="outlined"
      color="primary"
    ></v-text-field>
    <v-text-field
      v-model="registerRequest.password"
      :rules="passwordRules"
      label="密码"
      required
      density="comfortable"
      variant="outlined"
      color="primary"
      hide-details="auto"
      :append-icon="show1 ? '$eye' : '$eyeOff'"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
      class="pwdInput"
    ></v-text-field>
    
    <!-- <v-radio-group v-model="registerRequest.sex" row class="mt-2">
      <v-radio label="男" :value="1"></v-radio>
      <v-radio label="女" :value="2"></v-radio>
    </v-radio-group> -->

    <v-btn rounded="md" color="secondary" block class="mt-4" variant="flat" size="large" type="submit">注册</v-btn>
    
  </v-form>

  <v-row>
    <v-col class="d-flex align-center">
      <v-divider class="custom-devider" />
      <v-btn variant="outlined" class="orbtn" rounded="md" size="small">或</v-btn>
      <v-divider class="custom-devider" />
    </v-col>
  </v-row>
  <div class="mt-1">
    <v-btn variant="plain" block to="/login" class="mt-2 text-capitalize mr-n2">已有账号？</v-btn>
  </div>
</template>
<style lang="scss">
.custom-devider {
  border-color: rgba(0, 0, 0, 0.08) !important;
}
.googleBtn {
  border-color: rgba(0, 0, 0, 0.08);
  margin: 30px 0 20px 0;
}
.outlinedInput .v-field {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: none;
}
.orbtn {
  padding: 2px 40px;
  border-color: rgba(0, 0, 0, 0.08);
  margin: 20px 15px;
}
.pwdInput {
  position: relative;
  .v-input__append {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
