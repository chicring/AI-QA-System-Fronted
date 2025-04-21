<template>
<div>
    <v-row class="config-row">
        <v-col cols="12" sm="6">
          <v-list-item density="compact">
                <v-list-item-title class="property-name">
                  <span>{{ config.label }}</span>
                </v-list-item-title>

                <v-list-item-subtitle class="property-hint">
                  <span>
                    {{ config.description }}
                  </span>
                </v-list-item-subtitle>
            </v-list-item>
        </v-col>

        <v-col cols="12" sm="1" class="d-flex align-center">
          <v-chip
              color="primary" 
              label 
              size="x-small" 
              variant="flat">
              {{ config?.type || 'string' }}
          </v-chip>
        </v-col>

         <v-col cols="12" sm="5">
            <!-- 提供默认插槽，允许自定义输入控件 -->
            <slot 
                :model-value="modelValue" 
                :update-value="updateValue" 
                :config="config">
                <!-- 默认输入控件，当没有提供插槽内容时使用 -->
                <v-text-field
                  v-if="config.type === 'string'"
                  v-model="internalValue"
                  density="compact"
                  variant="outlined"
                  class="config-field"
                  hide-details
                >
                </v-text-field>

                <v-select
                  v-else-if="config.type === 'bool'"
                  v-model="internalValue"
                  density="compact"
                  variant="outlined"
                  class="config-field"
                  hide-details
                ></v-select>

                <v-text-field
                  v-else-if="config.type === 'number'"
                  v-model="internalValue"
                  density="compact"
                  variant="outlined"
                  class="config-field"
                  hide-details
                  type="number"
                >
                </v-text-field>

                <v-textarea
                  v-else-if="config.type === 'text'"
                  v-model="internalValue"
                  rows="3"
                  density="compact"
                  variant="outlined"
                  class="config-field"
                ></v-textarea>
            </slot>
         </v-col>
    </v-row>
</div>

</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ConfigProps {
  key: string;
  label: string;
  type: 'string' | 'bool' | 'number' | 'text';
  description?: string;
  default?: any;
}

const props = defineProps<{
  config: ConfigProps;
  modelValue?: any;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

// 更新值的方法，可以被插槽内容使用
const updateValue = (value: any) => {
  emit('update:modelValue', value);
};

// 使用计算属性实现双向绑定
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>

<style scoped>
.config-row {
  margin: 0;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.property-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87);
}

.property-hint {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin-top: 2px;
}
</style>
