// ===============================
// CYBER//X INTERACTIONS
// ===============================


// Smooth button interaction
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent.includes("INITIALIZE")) {
            alert(
                "SYSTEM INITIALIZATION COMPLETE.\n\n" +
                "Welcome to CYBER//X."
            );
        }

        if (button.textContent.includes("EXPLORE")) {
            document
                .querySelector("#technology")
                .scrollIntoView({
                    behavior: "smooth"
                });
        }

        if (button.textContent.includes("WATCH")) {
            alert(
                "INTRO VIDEO\n\n" +
                "Neural interface sequence loading..."
            );
        }
    });
});

// ===============================
// CYBORG MOUSE PARALLAX
// ===============================
const cyborg = document.querySelector(".cyborg-container");
document.addEventListener("mousemove", (event) => {
    const x =
        (event.clientX / window.innerWidth - 0.5) * 10;
    const y =
        (event.clientY / window.innerHeight - 0.5) * 10;
    if (cyborg) {
        cyborg.style.transform =
            `translate(${x}px, ${y}px)`;
    }
});

// ===============================
// SYSTEM COUNTER ANIMATION
// ===============================
const stats = document.querySelectorAll(
    ".hero-stats strong"
);
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
            }
        });
    },
    {
        threshold: 0.5
    }
);

stats.forEach(stat => {
    stat.style.opacity = "0";
    observer.observe(stat);
});

// ===============================
// NAVBAR ACTIVE LINK
// ===============================
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => {
            item.style.color = "";
        });
        link.style.color = "#00eaff";
    });
});