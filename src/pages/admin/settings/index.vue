<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">系统配置</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>基本设置</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="settings.systemName"
                label="系统名称"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
              <v-text-field
                v-model="settings.version"
                label="系统版本"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
              <v-text-field
                v-model="settings.adminEmail"
                label="管理员邮箱"
                variant="outlined"
                density="comfortable"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>功能开关</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-title>允许用户注册</v-list-item-title>
                <template v-slot:append>
                  <v-switch v-model="settings.allowRegistration"></v-switch>
                </template>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>开启邮件通知</v-list-item-title>
                <template v-slot:append>
                  <v-switch v-model="settings.enableEmailNotification"></v-switch>
                </template>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>维护模式</v-list-item-title>
                <template v-slot:append>
                  <v-switch v-model="settings.maintenanceMode"></v-switch>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" class="mt-4">保存配置</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface SystemSettings {
  systemName: string;
  version: string;
  adminEmail: string;
  allowRegistration: boolean;
  enableEmailNotification: boolean;
  maintenanceMode: boolean;
}

const settings = ref<SystemSettings>({
  systemName: 'AI题库系统',
  version: 'v1.0.0',
  adminEmail: 'admin@example.com',
  allowRegistration: true,
  enableEmailNotification: false,
  maintenanceMode: false
});

onMounted(() => {
  // TODO: 从API获取系统配置
  console.log('系统配置页面已加载');
});
</script> 