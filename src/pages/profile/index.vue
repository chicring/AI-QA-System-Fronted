<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="3">
                <UserInfo />
                <p class="text-h5 text-center text-medium-emphasis mb-3">我的简历</p>
                <Resume />
            </v-col>
            <v-col cols="12" md="9">
                <Timeline />
                <v-divider class="mt-3 mb-6" />
                <HistoryTable />
            </v-col>
        </v-row>
    </v-container>
</template> 

<script setup lang="ts">
import UserInfo from './components/UserInfo.vue';
import Timeline from './components/Timeline.vue';
import HistoryTable from './components/HistoryList.vue';
import Resume from './components/Resume.vue';
</script>
