<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { Form } from 'vee-validate';
import {useToast} from 'vue-toast-notification';

const toast = useToast();
const valid = ref(false);
const show1 = ref(false);
const logform = ref();
const password = ref('');
const username = ref('');

const passwordRules = ref([
  (v: string) => !!v || '密码必填',
  (v: string) => (v && v.length <= 10) || '密码长度不能超过10个字符'
]);
const emailRules = ref([(v: string) => !!v || '用户名必填']);


function validate(values: any, { setErrors }: any) {

  const authStore = useAuthStore();
  authStore.login({
    username: username.value,
    password: password.value
  })
  .then(() => {
    toast.success('登录成功', {position:'top'});
    const userStore = useUserStore();
    userStore.fetchUserInfo();
    window.location.href = '/';
  })
  .catch((error) => setErrors({ apiError: error.msg }));

}

</script>

<template>

  <!-- <h5 class="text-h5 text-center my-4 mb-8">Sign in with Email address</h5> -->
  <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <v-text-field
      v-model="username"
      :rules="emailRules"
      label="用户名"
      class="mt-4 mb-8"
      required
      density="comfortable"
      hide-details="auto"
      variant="outlined"
      color="primary"
    ></v-text-field>
    <v-text-field
      v-model="password"
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

    <div class="d-sm-flex align-end mt-2 mb-7 mb-sm-0">
      <!-- <v-checkbox
        v-model="checkbox"
        :rules="[(v: any) => !!v || 'You must agree to continue!']"
        label="Remember me?"
        required
        color="primary"
        class="ms-n2"
        hide-details
      ></v-checkbox> -->
      <div class="ml-auto">
        <a href="javascript:void(0)" class="text-primary  text-decoration-none">忘记密码？</a>
      </div>
    </div>

    <v-btn rounded="md" color="secondary" :loading="isSubmitting" block class="mt-2" variant="flat" size="large" :disabled="valid" type="submit">
      登录</v-btn>
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>

  <v-row>
    <v-col class="d-flex align-center">
      <v-divider class="custom-devider" />
      <v-btn flat class="orbtn" rounded="md" size="small">OR</v-btn>
      <v-divider class="custom-devider" />
    </v-col>
  </v-row>

  <div>
    <v-btn block variant="plain" to="/register" class="mt-2 text-capitalize mr-n2">没有账号？注册</v-btn>
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
  padding: 2px 10px;
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
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>
