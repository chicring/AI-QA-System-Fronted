<script setup lang="ts">
import Logo from '@/layouts/full/logo/LogoDark.vue';
import AuthRegister from './forms/AuthRegister.vue';
</script>

<template>
  <v-row class="h-screen" no-gutters>
    <!--左侧部分-->
    <v-col cols="12" class="d-flex align-center bg-lightprimary">
      <v-container>
        <div class="pa-7 pa-sm-12">
          <v-row justify="center">
            <v-col cols="12" lg="10" xl="6" md="7">
              <v-card elevation="0" class="loginBox">
                <v-card variant="outlined">
                  <v-card-text class="pa-9">
                    <!--左侧Logo部分-->
                    <v-row>
                      <v-col cols="12" class="text-center">
                        <Logo />
                        <h2 class="text-secondary text-h2 mt-8">注册</h2>
                        <h4 class="text-disabled text-h4 mt-3">请输入您的注册信息</h4>
                      </v-col>
                    </v-row>
                    <!--左侧Logo部分结束-->

                    <!--左侧表单部分-->
                    <AuthRegister />
                    <!--左侧表单部分结束-->
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <!--左侧部分结束-->
  </v-row>
</template>
<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>
