document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const icon = menuToggle.querySelector('.material-symbols-outlined');

            if (icon) {
                icon.textContent = mobileMenu.classList.contains('open')
                    ? 'close'
                    : 'menu';
            }
        });
    }

    // Gallery filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b =>
                b.classList.remove('active', 'bg-primary', 'text-white')
            );

            btn.classList.add('active', 'bg-primary', 'text-white');

            const filter = btn.dataset.filter;

            masonryItems.forEach(item => {
                item.style.display =
                    filter === 'all' || item.dataset.category === filter
                        ? 'block'
                        : 'none';
            });
        });
    });

    document.querySelector('.filter-btn[data-filter="all"]')
        ?.classList.add('active', 'bg-primary', 'text-white');

    // Project presentation popup
    const projectData = {
        'pure-care': {
            title: 'Pure Care Identity',
            images: [
                'images/projects/Global Campaign/Global Design Cover.jpg',
                'images/projects/Global Campaign/fonts.jpg',
                'images/projects/Global Campaign/3posters.jpg'
                // Add more Pure Care image paths here
            ]
        },

        'nexus-dashboard': {
            title: 'Nexus Dashboard',
            images: [
                'images/image-02.jpg'
                // Add more Nexus Dashboard image paths here
            ]
        },

        'vibrant-vines': {
            title: 'Vibrant Vines',
            images: [
                'images/image-03.jpg'
                // Add more Vibrant Vines image paths here
            ]
        },

        'yellow-spark': {
            title: 'Yellow Spark Stationery',
            images: [
                'images/image-04.jpg'
                // Add more Yellow Spark image paths here
            ]
        },

        'zest-soda': {
            title: 'Zest Soda',
            images: [
                'images/image-05.jpg'
                // Add more Zest Soda image paths here
            ]
        },

        'portfolio-brochure': {
            title: 'Portfolio Brochure',
            images: [
                'images/image-06.jpg'
                // Add more brochure image paths here
            ]
        },

        'zest-soda-2': {
            title: 'Zest Soda',
            images: [
                'images/image-07.jpg'
                // Add more Zest Soda image paths here
            ]
        },

        'portfolio-brochure-2': {
            title: 'Portfolio Brochure',
            images: [
                'images/image-08.jpg'
                // Add more brochure image paths here
            ]
        },

        'portfolio-brochure-3': {
            title: 'Portfolio Brochure',
            images: [
                'images/image-09.jpg'
                // Add more brochure image paths here
            ]
        }
    };

    const projectOverlay = document.getElementById('project-overlay');
    const projectContent = document.getElementById('project-content');
    const projectClose = document.querySelector('.project-close');

    function openProject(projectId) {
        const project = projectData[projectId];

        if (!project || !projectOverlay || !projectContent) return;

        projectContent.innerHTML = `
            <h1>${project.title}</h1>
            <div class="project-images">
                ${project.images.map((image, index) => `
                    <img src="${image}" alt="${project.title} - Image ${index + 1}">
                `).join('')}
            </div>
        `;
        

        projectOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        const projectWindow = document.querySelector('.project-window');
        if (projectWindow) projectWindow.scrollTop = 0;
    }

    function closeProject() {
        if (!projectOverlay) return;

        projectOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Clicking any gallery card opens its project
    masonryItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();

            const projectId = item.dataset.project;
            if (projectId) openProject(projectId);
        });
    });

    // Close button
    projectClose?.addEventListener('click', closeProject);

    // Clicking the dark background closes the popup
    projectOverlay?.addEventListener('click', event => {
        if (event.target === projectOverlay) closeProject();
    });

    // Escape key closes the popup
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeProject();
    });

    // Scroll animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card, .masonry-item, h1, h2')
        .forEach(item => {
            item.classList.add(
                'transition-all',
                'duration-700',
                'opacity-0',
                'translate-y-10'
            );
            observer.observe(item);
        });
});
