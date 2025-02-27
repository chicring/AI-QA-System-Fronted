
<template>
    <Card style="width: 25rem" >
        <template #header>
            <p class="text-2xl font-bold flex justify-center mt-4">
                登录
            </p>
        </template>
        <template #subtitle>
            <p class="text-sm text-gray-500 flex justify-center">
                登录到您的账户
            </p>
        </template>
        <template #content>
            <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
                <div class="flex flex-col gap-1">
                    <label for="username" class="text-sm text-gray-500">用户名</label>
                    <InputText name="username" type="text"  fluid />
                    <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="password" class="text-sm text-gray-500">密码</label>
                    <InputText name="password" type="text" fluid />
                    <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
                </div>
                <Button type="submit" label="登录" />
            </Form>

            <Divider type="dashed">
                OR
            </Divider>

            <Button class="w-full" severity="secondary" >
                <RouterLink to="/auth/register">
                    注册
                </RouterLink>
            </Button>
        </template>

    </Card>
</template>

<script setup>
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';

const toast = useToast();
const initialValues = ref({
    username: '',
    password: ''
});

const resolver = ref(zodResolver(
    z.object({
        username: z.string().min(1, { message: 'Username is required.' }),
        password: z.string().min(1, { message: 'Password is required.' }).email({ message: 'Invalid email address.' })
    })
));

const onFormSubmit = ({ valid }) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
};

</script>
        