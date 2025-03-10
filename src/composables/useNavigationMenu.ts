export function useNavigationMenu() {

    const navigationMenu =  [
        {
            label: '主页',
            icon: '',
            route: '/'
        },
        {
            label: '题库',
            icon: '',
            route: '/question'
        },
        {
            label: '练习',
            icon: '',
            route: '/practice'
        },
        {
            label: '我的',
            icon: '',
            route: '/profile'
        }
    ]

    return { navigationMenu }
}
