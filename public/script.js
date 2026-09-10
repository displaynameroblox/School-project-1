document.addEventListener('DOMContentLoaded', () => {
    const yearNode = document.getElementById('year');
    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }

    const savedTheme = localStorage.getItem('school-theme') || 'light';
    const savedLang = localStorage.getItem('school-lang') || 'en';

    const translations = {
        en: {
            'site-name': 'School Group',
            'nav-home': 'Projects & Studies',
            'nav-projects': 'Projects',
            'nav-about': 'About Us',
            'nav-locations': 'Where We Are',
            'nav-home-label': 'Home',
            'lang-label': 'Language',
            'theme-label': 'Theme',
            'theme-light': 'Light',
            'theme-dark': 'Dark',
            'hero-eyebrow': 'Learning together',
            'hero-title': 'Projects, experiments, and growth.',
            'hero-lead': 'We explore ideas, build useful tools, and share knowledge through research, collaborations, and hands-on study projects.',
            'view-projects': 'View projects',
            'meet-team': 'Meet the team',
            'section-projects': 'Current projects',
            'section-tracks': 'Study tracks',
            'section-our-school': 'Our school',
            'tool-panel': 'Live status',
            'tool-available': 'Online',
            'tool-status': 'School resources synced',
            'toggle-english': 'English',
            'toggle-arabic': 'العربية',
            'footer-link': 'Projects & Studies'
        },
        ar: {
            'site-name': 'مجموعة المدرسة',
            'nav-home': 'المشاريع والدراسات',
            'nav-projects': 'المشاريع',
            'nav-about': 'من نحن',
            'nav-locations': 'أماكننا',
            'nav-home-label': 'الرئيسية',
            'lang-label': 'اللغة',
            'theme-label': 'المظهر',
            'theme-light': 'فاتح',
            'theme-dark': 'داكن',
            'hero-eyebrow': 'نتعلم معا',
            'hero-title': 'مشاريع، تجارب ونمو.',
            'hero-lead': 'نستكشف الأفكار، نبني أدوات عملية، ونشارك المعرفة من خلال البحث والتعاون والمشاريع الدراسية التطبيقية.',
            'view-projects': 'عرض المشاريع',
            'meet-team': 'تعرّف على الفريق',
            'section-projects': 'المشاريع الحالية',
            'section-tracks': 'مسارات الدراسة',
            'section-our-school': 'مدرستنا',
            'tool-panel': 'الحالة الحالية',
            'tool-available': 'متصل',
            'tool-status': 'مصادر المدرسة متزامنة',
            'toggle-english': 'English',
            'toggle-arabic': 'العربية',
            'footer-link': 'المشاريع والدراسات'
        }
    };

    const themeToggle = document.getElementById('theme-toggle');
    const languageToggle = document.getElementById('language-toggle');
    const dirToggle = document.getElementById('dir-toggle');

    const applyTheme = (theme) => {
        document.body.classList.toggle('theme-dark', theme === 'dark');
        document.body.classList.toggle('theme-light', theme === 'light');
        localStorage.setItem('school-theme', theme);

        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
    };

    const applyLanguage = (lang) => {
        const selected = translations[lang] || translations.en;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        localStorage.setItem('school-lang', lang);

        document.querySelectorAll('[data-i18n]').forEach((node) => {
            const key = node.dataset.i18n;
            const value = selected[key];
            if (value) {
                node.textContent = value;
            }
        });

        if (languageToggle) {
            const isArabic = lang === 'ar';
            languageToggle.textContent = isArabic ? 'EN' : 'AR';
            languageToggle.setAttribute('aria-label', isArabic ? 'Switch to English' : 'التبديل إلى العربية');
        }

        if (dirToggle) {
            dirToggle.textContent = lang === 'ar' ? 'LTR' : 'RTL';
        }
    };

    const currentTheme = savedTheme === 'dark' ? 'dark' : 'light';
    const currentLang = savedLang === 'ar' ? 'ar' : 'en';

    themeToggle?.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
        applyTheme(nextTheme);
    });

    languageToggle?.addEventListener('click', () => {
        const nextLang = document.body.getAttribute('dir') === 'rtl' ? 'en' : 'ar';
        applyLanguage(nextLang);
    });

    dirToggle?.addEventListener('click', () => {
        applyLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar');
    });

    applyTheme(currentTheme);
    applyLanguage(currentLang);

    const animatedValues = document.querySelectorAll('[data-count]');
    animatedValues.forEach((element) => {
        const targetValue = Number(element.dataset.count || 0);
        const prefix = element.dataset.prefix || '';
        const suffix = element.dataset.suffix || '';
        let current = 0;
        const increment = Math.max(1, Math.ceil(targetValue / 35));

        const tick = () => {
            current += increment;
            if (current >= targetValue) {
                element.textContent = `${prefix}${targetValue}${suffix}`;
                return;
            }
            element.textContent = `${prefix}${current}${suffix}`;
            requestAnimationFrame(tick);
        };

        tick();
    });

    const revealItems = document.querySelectorAll('.reveal, .info-card, .study-item, .location-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => observer.observe(item));

    const liveClock = document.getElementById('live-clock');
    if (liveClock) {
        const updateClock = () => {
            const now = new Date();
            liveClock.textContent = new Intl.DateTimeFormat(document.documentElement.lang === 'ar' ? 'ar-SA' : 'en-US', {
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            }).format(now);
        };
        updateClock();
        setInterval(updateClock, 1000);
    }
});
