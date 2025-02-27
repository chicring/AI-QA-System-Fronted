import { computed } from 'vue'

export function useNavigationMenu() {

    const navigationMenu = computed(() => [
        {
            label: '主页',
            icon: 'pi pi-home',
            route: '/'
        },
        {
            label: '题库',
            icon: 'pi pi-book',
            route: '/question'
        },
        {
            label: '练习',
            icon: 'pi pi-comment',
            route: '/practice'
        },
        {
            label: '我的',
            icon: 'pi pi-user',
            route: '/profile'
        }
    ])

    return { navigationMenu }
}
