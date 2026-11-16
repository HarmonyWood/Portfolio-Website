document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const icon = menuToggle.querySelector('.material-symbols-outlined');
        icon.textContent = mobileMenu.classList.contains('open') ? 'close' : 'menu';
    });

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
            btn.classList.add('active', 'bg-primary', 'text-white');
            const filter = btn.dataset.filter;
            masonryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    // Set initial active state
    document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active', 'bg-primary', 'text-white');

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');

    document.querySelectorAll('.masonry-item img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightboxFn() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeLightbox.addEventListener('click', closeLightboxFn);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxFn();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightboxFn();
    });

    // IntersectionObserver for animations (unchanged)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.glass-card, .masonry-item, h1, h2').forEach(item => {
        item.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        observer.observe(item);
    });
    
});


// PROJECT POPUP DATA
const projectData = {
    project2: [
        {
            title: "Project Overview",
            description: "Introduction to my second project.",
            image: "images/image-02.jpg"
        },
        {
            title: "Concept Development",
            description: "Exploring the visual direction.",
            image: "images/project2-process.jpg"
        },
        {
            title: "Final Designs",
            description: "The completed project.",
            image: "images/project2-final.jpg"
        }
    ]
};

let currentProject = "";
let currentPage = 0;

function openProject(project) {
    currentProject = project;
    currentPage = 0;

    document.getElementById("project-overlay").classList.add("active");
    document.body.style.overflow = "hidden";

    showProjectPage();
}

function closeProject() {
    document.getElementById("project-overlay").classList.remove("active");
    document.body.style.overflow = "";
}

function changePage(direction) {
    const pages = projectData[currentProject];

    currentPage += direction;

    if (currentPage < 0) currentPage = pages.length - 1;
    if (currentPage >= pages.length) currentPage = 0;

    showProjectPage();
}

function showProjectPage() {
    const pages = projectData[currentProject];
    const page = pages[currentPage];

    document.getElementById("project-content").innerHTML = `
        <h1>${page.title}</h1>
        <p>${page.description}</p>
        <img src="${page.image}" alt="${page.title}"
             style="width:100%; height:auto; margin-top:24px;">
    `;

    document.getElementById("project-counter").textContent =
        `${String(currentPage + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;

    document.querySelector(".project-window").scrollTop = 0;
}

// Close with Escape; navigate with arrow keys
document.addEventListener("keydown", (event) => {
    const overlay = document.getElementById("project-overlay");

    if (!overlay.classList.contains("active")) return;

    if (event.key === "Escape") closeProject();
    if (event.key === "ArrowRight") changePage(1);
    if (event.key === "ArrowLeft") changePage(-1);
});

// Close when clicking the dark background
document.getElementById("project-overlay").addEventListener("click", (event) => {
    if (event.target.id === "project-overlay") closeProject();
});
