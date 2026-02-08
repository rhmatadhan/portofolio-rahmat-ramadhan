const nav = document.getElementById("site-nav");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");

const setNavBackground = () => {
	if (window.scrollY > 10) {
		nav.classList.add("bg-white/80", "backdrop-blur", "shadow-sm");
	} else {
		nav.classList.remove("bg-white/80", "backdrop-blur", "shadow-sm");
	}
};

const toggleMenu = () => {
	const isOpen = mobileMenu.classList.contains("opacity-100");
	if (isOpen) {
		mobileMenu.classList.remove("max-h-64", "opacity-100", "pointer-events-auto");
		mobileMenu.classList.add("max-h-0", "opacity-0", "pointer-events-none");
		iconOpen.classList.remove("hidden");
		iconClose.classList.add("hidden");
		menuToggle.setAttribute("aria-expanded", "false");
		return;
	}

	mobileMenu.classList.remove("max-h-0", "opacity-0", "pointer-events-none");
	mobileMenu.classList.add("max-h-64", "opacity-100", "pointer-events-auto");
	iconOpen.classList.add("hidden");
	iconClose.classList.remove("hidden");
	menuToggle.setAttribute("aria-expanded", "true");
};

window.addEventListener("scroll", setNavBackground);
menuToggle.addEventListener("click", toggleMenu);

mobileMenu.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => {
		if (window.innerWidth < 768) {
			toggleMenu();
		}
	});
});

setNavBackground();

const revealSections = () => {
	const sections = document.querySelectorAll(".reveal");
	if (!sections.length) {
		return;
	}

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (prefersReducedMotion) {
		sections.forEach((section) => {
			section.classList.remove("opacity-0", "translate-y-4");
			section.classList.add("opacity-100", "translate-y-0");
		});
		return;
	}

	const observer = new IntersectionObserver(
		(entries, obs) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.remove("opacity-0", "translate-y-4");
					entry.target.classList.add("opacity-100", "translate-y-0");
					obs.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.2,
			rootMargin: "0px 0px -10% 0px",
		}
	);

	sections.forEach((section) => observer.observe(section));
};

revealSections();
