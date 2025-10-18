const starMenuContainer = document.getElementById("starMenuContainer");
console.log("star", starMenuContainer);
if (!starMenuContainer) {
    throw new Error("No starMenu container");
}

document.addEventListener("alpine:init", () => {
    // @ts-ignore
    Alpine.data("stars", () => ({
        isMenuOpen: false,
        backgroundStyle: "z-index: 10",
        starMenuStyle: "z-index: 20",
        contentStyle: "z-index: 30",
        updateBackgroundStyles({ isMenuOpen }: { isMenuOpen: boolean }) {
            console.log("current state", isMenuOpen);
            this.isMenuOpen = !this.isMenuOpen;
            if (this.isMenuOpen) {
                this.backgroundStyle = "z-index: 10";
                this.starMenuStyle = "z-index: 30";
                this.contentStyle = "z-index: 20";
            } else {
                this.backgroundStyle = "z-index: 10";
                this.starMenuStyle = "z-index: 20";
                this.contentStyle = "z-index: 30";
            }
        },
    }));
});
starMenuContainer.style.color = "red";
