<template>
  <section id="hero">
    <v-parallax height="750">
      <v-row justify="center" class="h-100">
        <v-col cols="12" md="9">
          <v-row justify="center">
            <v-col cols="12" md="6" xl="6" align-self="center">
              <div class="mt-16">
                <h2 class="display-2 font-weight-bold mb-4">题库问答系统</h2>
                <h3 class="font-weight-light">
                  题库包含1000+道面试题，覆盖后端，前端，测试，产品，运营，设计，销售，管理等多个领域，帮助你快速提升面试能力。<br>
                  提供AI练习，帮助你快速提升掌握。<br>
                </h3>
                <v-btn
                  rounded
                  outlined
                  large
                  to="/question"
                  class="mt-5"
                >
                  开始
                  <IconChevronRight class="ml-2" />
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" md="6" xl="6" class="hidden-sm-and-down"> 
  
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-parallax>
    <Features />
  </section>
</template>

<script setup lang="ts">
import { IconChevronRight } from '@tabler/icons-vue';
import Features from './components/Features.vue';
</script>
