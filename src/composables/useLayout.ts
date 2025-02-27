export function useLayout() {

    function toggleDarkMode() {
        document.querySelector("html")!.classList.toggle("my-dark");
        console.log(document.querySelector("html")!.classList);
    }

    return {
        toggleDarkMode
    }
}