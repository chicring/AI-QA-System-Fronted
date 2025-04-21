<template>
  <section class="features-section py-16">
    <v-container>
      <!-- What is 部分 -->
      <v-row class="mb-15">
        <v-col cols="12" md="6">
          <v-img
            src="@/assets/images/landingpage/features-demo.png"
            class="rounded-lg"
            height="400"
            cover
          ></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <h2 class="text-h3 font-weight-bold mb-6">什么是题库问答系统？</h2>
          <p class="text-body-1 text-medium-emphasis mb-6">
            题库问答系统是一个智能的面试题库平台，简化了面试准备的过程。通过直观的界面和智能算法，帮助你快速掌握面试要点，提升应试能力。
          </p>
          <v-list>
            <v-list-item class="mb-4">
              <template v-slot:prepend>
                <IconCircleCheck class="mr-2" size="24" color="primary" />
              </template>
              <v-list-item-title class="font-weight-medium">智能题库系统</v-list-item-title>
              <v-list-item-subtitle>
                快速生成适合你级别的练习题目
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item class="mb-4">
              <template v-slot:prepend>
                <IconCircleCheck class="mr-2" size="24" color="primary" />
              </template>
              <v-list-item-title class="font-weight-medium">AI 辅助学习</v-list-item-title>
              <v-list-item-subtitle>
                通过 AI 生成高质量的解答和讲解
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <IconCircleCheck class="mr-2" size="24" color="primary" />
              </template>
              <v-list-item-title class="font-weight-medium">丰富题型模板</v-list-item-title>
              <v-list-item-subtitle>
                覆盖多个领域的专业题库模板
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <!-- Why Choose 部分 -->
      <v-row class="mb-15">
        <v-col cols="12" class="text-center mb-10">
          <h2 class="text-h3 font-weight-bold">为什么选择我们的系统</h2>
          <p class="text-body-1 text-medium-emphasis mt-4">
            我们的系统具有用户友好的设计、强大的AI能力和丰富的题库模板，满足不同领域的面试需求。
          </p>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="pa-6" elevation="0" outlined>
            <IconRocket size="40" color="primary" class="mb-4" />
            <h3 class="text-h6 font-weight-bold mb-2">快速上手</h3>
            <p class="text-body-2 text-medium-emphasis">
              简单几步即可开始练习，快速进入学习状态
            </p>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="pa-6" elevation="0" outlined>
            <IconHandClick size="40" color="primary" class="mb-4" />
            <h3 class="text-h6 font-weight-bold mb-2">简单易用</h3>
            <p class="text-body-2 text-medium-emphasis">
              直观的界面设计，清晰的学习路径
            </p>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="pa-6" elevation="0" outlined>
            <IconBrain size="40" color="primary" class="mb-4" />
            <h3 class="text-h6 font-weight-bold mb-2">AI 驱动</h3>
            <p class="text-body-2 text-medium-emphasis">
              智能生成个性化的练习内容和解答
            </p>
          </v-card>
        </v-col>
      </v-row>

      <!-- 模板展示部分 -->
      <v-row>
        <v-col cols="12" class="text-center mb-10">
          <h2 class="text-h3 font-weight-bold">题库模板</h2>
          <p class="text-body-1 text-medium-emphasis mt-4">
            丰富多样的内置题库模板
          </p>
        </v-col>
        
        <v-col cols="12">
          <v-card class="pa-6" color="background">
            <v-row justify="center" align="center">
              <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4" lg="4">
                <v-card class="mx-auto" max-width="300">
                  <v-img
                    src="@/assets/images/landingpage/template-preview.png"
                    height="200"
                    cover
                  ></v-img>
                  <v-card-title>模板 {{ n }}</v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { IconCircleCheck, IconRocket, IconHandClick, IconBrain } from '@tabler/icons-vue';
// 组件逻辑
</script>

<style scoped>
.features-section {
  background-color: #f8f9fa;
}
</style> 