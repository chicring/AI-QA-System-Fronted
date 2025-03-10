<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
                <v-card flat>
                    <v-img rounded="md" :src="categoryDetail.imageUrl!" height="180px" cover>
                    </v-img>

                    <v-card-title>{{ categoryDetail.categoryName }}</v-card-title>

                    <div class="text-body-1 text-medium-emphasis px-4">{{ categoryDetail.description }}</div>
                </v-card>
            </v-col>

            <v-col cols="12" md="8">
                <QuestionList />
            </v-col>
        </v-row>

    </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import QuestionList from './components/QuestionList.vue';
import type { CategoryItem } from '@/api/types/index';
import { ref, onMounted } from 'vue';
import { getCategoryDetail } from '@/api/question';

const route = useRoute();
const id = route.params.id;

const categoryDetail = ref<CategoryItem>({
    id: null,
    categoryName: '',
    description: '',  // Note: capital D in Description as per API spec
    categoryLevel: null,
    parentCategoryId: null,
    sortNum: 0,
    imageUrl: '',
})

function fetchCategoryDetail() {
    getCategoryDetail(id as string).then((res) => {
        categoryDetail.value = res.data
    })
}

fetchCategoryDetail()

</script>

