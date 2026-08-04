// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Search & Filter Functionality for DevOps Tools
       ========================================================================== */
    const searchInput = document.getElementById('toolSearch');
    const toolCards = document.querySelectorAll('.tool-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            toolCards.forEach(card => {
                const toolTitle = card.querySelector('h3').textContent.toLowerCase();
                const toolDesc = card.querySelector('p').textContent.toLowerCase();

                if (toolTitle.includes(searchTerm) || toolDesc.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'modalPop 0.3s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    /* ==========================================================================
       2. Dynamic 3D Card Hover & Cursor Tracking Effect
       ========================================================================== */
    toolCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Tilt calculation
            const rotateX = (-y / 10).toFixed(2);
            const rotateY = (x / 10).toFixed(2);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    /* ==========================================================================
       3. Dynamic Theme Preset Switcher (Rainbow, Cyberpunk, Emerald, Sunset)
       ========================================================================== */
    // Create Theme Toggle Buttons dynamically in Header
    const authContainer = document.querySelector('.auth-buttons');
    if (authContainer) {
        const themeBtn = document.createElement('button');
        themeBtn.className = 'btn-theme';
        themeBtn.innerHTML = '<i class="fa-solid fa-palette"></i>';
        themeBtn.title = 'Switch Color Theme';
        
        const themes = ['', 'theme-cyberpunk', 'theme-emerald', 'theme-sunset'];
        let currentThemeIdx = 0;

        themeBtn.addEventListener('click', () => {
            // Remove active theme class
            if (themes[currentThemeIdx]) {
                document.body.classList.remove(themes[currentThemeIdx]);
            }

            // Cycle to next theme
            currentThemeIdx = (currentThemeIdx + 1) % themes.length;

            if (themes[currentThemeIdx]) {
                document.body.classList.add(themes[currentThemeIdx]);
            }
        });

        authContainer.prepend(themeBtn);
    }

    /* ==========================================================================
       4. Interactive Button Notification (Click Handler)
       ========================================================================== */
    const heroBtn = document.getElementById('btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            alert('DevOps Engineer Portfolio loaded successfully! Contact Sravankumar at 8886464553.');
        });
    }
});

/* ==========================================================================
   5. Modal Dialog Functions (Login & Password Management)
   ========================================================================== */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside the content box
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
