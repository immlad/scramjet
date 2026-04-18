const form = document.getElementById("scramjet-form") as HTMLFormElement | null;
const input = document.getElementById("url-input") as HTMLInputElement | null;
const toggle = document.getElementById("dark-toggle") as HTMLButtonElement | null;

// Dark Mode Toggle
toggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// URL Handler
function handleURL(raw: string): void {
    if (!raw) return;

    let url = raw.trim();

    if (!url.startsWith("http") && url.includes(".")) {
        url = "https://" + url;
    }

    if (!url.startsWith("http") && !url.includes(".")) {
        url = "https://www.google.com/search?q=" + encodeURIComponent(url);
    }

    window.location.href = "/proxy/" + btoa(url);
}

// Form submit
form?.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    if (input) handleURL(input.value);
});

// App grid + dock clicks
document.querySelectorAll<HTMLElement>("[data-url]").forEach((el) => {
    el.addEventListener("click", () => {
        const target = el.dataset.url;
        if (target) handleURL(target);
    });
});
