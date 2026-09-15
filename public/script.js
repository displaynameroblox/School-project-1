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

    const textTranslations = { en: new Map(), ar: new Map() };
    const addTextTranslation = (english, arabic) => {
        textTranslations.ar.set(english, arabic);
        textTranslations.en.set(arabic, english);
    };

    [
        ['Browse', 'تصفح'],
        ['Library', 'المكتبة'],
        ['Available now', 'متاح الآن'],
        ['Projects & studies', 'المشاريع والدراسات'],
        ['Find a project or study.', 'اعثر على مشروع أو دراسة.'],
        ['Browse everything our group is building and researching. Select an item to read its full overview.', 'تصفح كل ما تبنيه مجموعتنا وتبحث فيه. اختر عنصراً لقراءة نظرة شاملة عنه.'],
        ['Search projects and studies', 'ابحث في المشاريع والدراسات'],
        ['Search by title, type, or topic...', 'ابحث حسب العنوان أو النوع أو الموضوع...'],
        ['Filter', 'تصفية'],
        ['Show', 'عرض'],
        ['Everything', 'الكل'],
        ['Studies', 'الدراسات'],
        ['Showing 4 items', 'عرض 4 عناصر'],
        ['Showing 3 items', 'عرض 3 عناصر'],
        ['Showing 2 items', 'عرض عنصرين'],
        ['Showing 1 item', 'عرض عنصر واحد'],
        ['No projects or studies match your search.', 'لا توجد مشاريع أو دراسات تطابق بحثك.'],
        ['Project', 'مشروع'],
        ['Study · العربية', 'دراسة · العربية'],
        ['View project →', 'عرض المشروع ←'],
        ['Read study →', 'قراءة الدراسة ←'],
        ['Our group', 'مجموعتنا'],
        ['We learn, build, and share together.', 'نتعلم ونبني ونتشارك معاً.'],
        ['We value curiosity, practical work, thoughtful research, and collaboration that turns ideas into useful outcomes.', 'نقدّر الفضول والعمل التطبيقي والبحث المتأني والتعاون الذي يحوّل الأفكار إلى نتائج مفيدة.'],
        ['What we value', 'ما نؤمن به'],
        ['Our principles', 'مبادئنا'],
        ['Curiosity', 'الفضول'],
        ['Keep exploring', 'واصل الاستكشاف'],
        ['We ask better questions, test ideas, and stay open to learning from every project.', 'نطرح أسئلة أفضل ونختبر الأفكار ونبقى منفتحين للتعلم من كل مشروع.'],
        ['Craft', 'الإتقان'],
        ['Make things well', 'أنجز العمل بإتقان'],
        ['We focus on reliable systems, clear communication, and work that can grow over time.', 'نركز على الأنظمة الموثوقة والتواصل الواضح والعمل القابل للتطور مع الوقت.'],
        ['Teamwork', 'العمل الجماعي'],
        ['Share the process', 'شارك مراحل العمل'],
        ['We support one another and make our projects, research, and lessons useful to the whole group.', 'ندعم بعضنا ونجعل مشاريعنا وأبحاثنا ودروسنا مفيدة للمجموعة بأكملها.'],
        ['Meet the team', 'تعرّف على الفريق'],
        ['People behind the work', 'الأشخاص وراء العمل'],
        ['Founder · Software & Game Developer', 'المؤسس · مطور برمجيات وألعاب'],
        ['Cybersecurity Specialist', 'متخصص في الأمن السيبراني'],
        ['Building games, software, automation, and developer tools.', 'يطور الألعاب والبرمجيات والأتمتة وأدوات المطورين.'],
        ['Developing security automation, OSINT utilities, and vulnerability research tools.', 'يطور أتمتة أمنية وأدوات استخبارات المصادر المفتوحة وأدوات أبحاث الثغرات.'],
        ['View profile →', 'عرض الملف ←'],
        ['Our school', 'مدرستنا'],
        ['Where learning happens.', 'حيث يحدث التعلم.'],
        ['Our community is inspired by the learning environment at مدارس الأقصى الأهلية والعالمية, where academic growth, creativity, and student development are encouraged every day.', 'يستلهم مجتمعنا بيئة التعلم في مدارس الأقصى الأهلية والعالمية، حيث يتم تشجيع النمو الأكاديمي والإبداع وتطور الطلاب كل يوم.'],
        ['School', 'المدرسة'],
        ['Learning focus', 'محور التعلم'],
        ['Academic excellence', 'التميز الأكاديمي'],
        ['Student growth', 'نمو الطلاب'],
        ['Skills & character', 'المهارات والشخصية'],
        ['A well-known private school community focused on quality education, student success, and an inspiring learning environment for future growth.', 'مجتمع مدرسي أهلي معروف يركز على جودة التعليم ونجاح الطلاب وبيئة تعلم ملهمة للنمو المستقبلي.'],
        ['The school promotes strong study habits, modern teaching methods, and a culture of discipline, curiosity, and achievement.', 'تعزز المدرسة عادات الدراسة الجيدة وطرائق التدريس الحديثة وثقافة الانضباط والفضول والإنجاز.'],
        ['Beyond the classroom, students are encouraged to develop confidence, teamwork, communication, and leadership skills for the future.', 'خارج الفصل، يتم تشجيع الطلاب على تطوير الثقة والعمل الجماعي والتواصل والقيادة للمستقبل.'],
        ['School connections', 'روابط المدرسة'],
        ['Our work is shaped by the learning culture and support systems that surround us. We value strong educational communities, meaningful mentorship, and the role of schools in helping students grow into capable, confident people.', 'يتشكل عملنا بثقافة التعلم وأنظمة الدعم المحيطة بنا. ونقدر المجتمعات التعليمية القوية والإرشاد المؤثر ودور المدارس في مساعدة الطلاب على النمو ليصبحوا أشخاصاً مقتدرين وواثقين.'],
        ['Team member', 'عضو في الفريق'],
        ['Profile', 'الملف الشخصي'],
        ['Specialties', 'التخصصات'],
        ['View CV', 'عرض السيرة الذاتية'],
        ['Back to About Us', 'العودة إلى من نحن'],
        ['Not found', 'غير موجود'],
        ['That page could not be found.', 'تعذر العثور على هذه الصفحة.'],
        ['The page you were looking for may have moved, been removed, or never existed.', 'ربما نُقلت الصفحة التي تبحث عنها أو أزيلت أو لم تكن موجودة من الأساس.'],
        ['Back home', 'العودة للرئيسية'],
        ['Explore projects', 'استكشف المشاريع'],
        ['Project ReLife 2001', 'مشروع ReLife 2001'],
        ['Local Manager Library', 'مكتبة Local Manager'],
        ['Displayoptiy', 'Displayoptiy'],
        ['A story-based roleplay experience set in 2000s New York City, rebuilt on a cleaner and more scalable foundation.', 'تجربة لعب أدوار قصصية تدور في نيويورك خلال عقد الألفين، أعيد بناؤها على أساس أنظف وأكثر قابلية للتوسع.'],
        ['A modular Luau toolkit for file management, downloads, HTML-to-GUI layouts, media, and system diagnostics inside Roblox.', 'أداة Luau معيارية لإدارة الملفات والتنزيلات وتحويل HTML إلى واجهات رسومية والوسائط وتشخيص النظام داخل Roblox.'],
        ['A client-side Roblox music player with playlists, playback controls, search, themes, and local persistence.', 'مشغل موسيقى يعمل على جانب العميل داخل Roblox، مع قوائم تشغيل وعناصر تحكم وبحث وسمات وحفظ محلي.'],
        ['View source on GitHub', 'عرض المصدر على GitHub'],
        ['Story-based roleplay in a 2000s city.', 'لعب أدوار قصصي في مدينة من عقد الألفين.'],
        ['A personal music experience inside Roblox.', 'تجربة موسيقية شخصية داخل Roblox.'],
        ['A practical toolkit for Roblox workflows.', 'أداة عملية لسير العمل داخل Roblox.'],
        ['Project', 'المشروع'],
        ['Visuals', 'المرئيات'],
        ['Build direction', 'اتجاه البناء'],
        ['What it includes', 'ما يتضمنه'],
        ['Project context', 'سياق المشروع'],
        ['Experience', 'التجربة'],
        ['Built for listening', 'مصمم للاستماع'],
        ['Project lifecycle', 'دورة حياة المشروع'],
        ['How Displayoptiy evolved', 'كيف تطور Displayoptiy'],
        ['Relationship to the library', 'العلاقة بالمكتبة'],
        ['A real application built on shared tools', 'تطبيق فعلي مبني على أدوات مشتركة'],
        ['Getting started', 'البدء'],
        ['Load the module, then call the manager', 'حمّل الوحدة ثم استدعِ المدير'],
        ['API examples', 'أمثلة على واجهة API'],
        ['Common workflows', 'سير العمل الشائعة'],
        ['Architecture', 'البنية'],
        ['Designed for inconsistent runtimes', 'مصمم لبيئات تشغيل مختلفة'],
        ['Core modules', 'الوحدات الأساسية'],
        ['What it provides', 'ما يقدمه'],
        ['Files', 'الملفات'],
        ['Network', 'الشبكة'],
        ['UI', 'الواجهة'],
        ['Media', 'الوسائط'],
        ['Instances', 'العناصر'],
        ['Diagnostics', 'التشخيص'],
        ['Safe file workflows', 'سير عمل آمن للملفات'],
        ['Downloads & requests', 'التنزيلات والطلبات'],
        ['HTML-to-GUI', 'تحويل HTML إلى واجهة'],
        ['Audio & video', 'الصوت والفيديو'],
        ['Save and organize', 'الحفظ والتنظيم'],
        ['Environment profiling', 'تحليل البيئة'],
        ['Full controls', 'عناصر تحكم كاملة'],
        ['Shuffle & repeat', 'التبديل والتكرار'],
        ['Organize music', 'تنظيم الموسيقى'],
        ['Home & search', 'الرئيسية والبحث'],
        ['Personal settings', 'الإعدادات الشخصية'],
        ['Reliable local storage', 'حفظ محلي موثوق'],
        ['Foundation', 'الأساس'],
        ['More ways to manage music', 'طرق أكثر لإدارة الموسيقى'],
        ['Complete public release', 'الإصدار العام الكامل'],
        ['Current projects', 'المشاريع الحالية'],
        ['Featured study', 'الدراسة المميزة'],
        ['Study tracks', 'مسارات الدراسة'],
        ['How we learn', 'كيف نتعلم'],
        ['Technology & Software', 'التقنية والبرمجيات'],
        ['Science & Research', 'العلوم والبحث'],
        ['Design & Communication', 'التصميم والتواصل'],
        ['Leadership & Teamwork', 'القيادة والعمل الجماعي'],
        ['Research library', 'مكتبة الأبحاث'],
        ['Campus portal', 'بوابة الحرم الدراسي'],
        ['Digital learning lab', 'مختبر التعلم الرقمي'],
        ['Volunteer outreach', 'التواصل التطوعي']
        ,['A story-rich environment inspired by the atmosphere and culture of early 2000s city life.', 'بيئة غنية بالقصص مستوحاة من أجواء وثقافة حياة المدن في أوائل عقد الألفين.']
        ,['Clean gameplay systems, immersive lighting, sound design, and improved performance.', 'أنظمة لعب نظيفة وإضاءة غامرة وتصميم صوتي وأداء محسن.']
        ,['Active development focused on architecture, storytelling, and gameplay reliability.', 'تطوير مستمر يركز على البنية والسرد وموثوقية أسلوب اللعب.']
        ,['Snapshots from the game’s world, development process, and atmosphere.', 'لقطات من عالم اللعبة وعملية تطويرها وأجوائها.']
        ,['A look inside ReLife 2001', 'نظرة داخل ReLife 2001']
        ,['In-game view beneath the open sky.', 'لقطة داخل اللعبة تحت سماء مفتوحة.']
        ,['Development view of the city environment.', 'لقطة من تطوير البيئة الحضرية.']
        ,['A darker night-time scene with neon lighting.', 'مشهد ليلي أكثر قتامة بإضاءة نيون.']
        ,['A client-side music player designed around a familiar streaming experience. It combines responsive playback controls with playlist management, search, themes, and local settings persistence.', 'مشغل موسيقى يعمل على جانب العميل ومصمم حول تجربة بث مألوفة. يجمع بين عناصر تحكم سريعة وقوائم التشغيل والبحث والسمات وحفظ الإعدادات محلياً.']
        ,['Play, pause, next track, previous track, and configurable volume controls keep listening flexible.', 'تجعل عناصر التشغيل والإيقاف والانتقال بين المقاطع والتحكم القابل للضبط بمستوى الصوت الاستماع مرناً.']
        ,['Integrated playback modes support continuous listening and make the player feel closer to a full streaming client.', 'تدعم أوضاع التشغيل المدمجة الاستماع المستمر وتجعل المشغل أقرب إلى عميل بث متكامل.']
        ,['Create, rename, delete, search, and reorder custom track lists instead of relying on one fixed queue.', 'أنشئ قوائم المقاطع المخصصة وأعد تسميتها واحذفها وابحث فيها وأعد ترتيبها بدلاً من الاعتماد على قائمة ثابتة.']
        ,['A universal song view, Home tab, and search tools make tracks easier to find across supported games.', 'تجعل واجهة الأغاني العامة وعلامة الرئيسية وأدوات البحث العثور على المقاطع أسهل عبر الألعاب المدعومة.']
        ,['Choose Dark, Light, or Neon themes and customize the visual palette to match your setup.', 'اختر السمات الداكنة أو الفاتحة أو النيون وخصص لوحة الألوان لتناسب إعدادك.']
        ,['Playlists and configuration are saved to local workspace files when available, with in-memory session storage as a fallback when file access is restricted.', 'تُحفظ قوائم التشغيل والإعدادات في ملفات مساحة العمل المحلية عند توفرها، مع استخدام تخزين الجلسة في الذاكرة كبديل عند تقييد الوصول للملفات.']
        ,['Luau and Roblox Studio', 'Luau وRoblox Studio']
        ,['JavaScript, Node.js, Python, and APIs', 'JavaScript وNode.js وPython وواجهات API']
        ,['Game systems, automation, and developer libraries', 'أنظمة الألعاب والأتمتة ومكتبات المطورين']
        ,['Python security scripting, socket programming, and API automation', 'برمجة أمنية بلغة Python وبرمجة المقابس وأتمتة واجهات API']
        ,['OSINT, reconnaissance, vulnerability assessment, and threat research', 'استخبارات المصادر المفتوحة والاستطلاع وتقييم الثغرات وأبحاث التهديدات']
        ,['Scapy, Volatility 3, Prowler, sqlmap, and Burp Suite extensions', 'Scapy وVolatility 3 وProwler وsqlmap وإضافات Burp Suite']
        ,['تحميل ملف الدراسة PDF', 'Download the study PDF']
        ,['عن الدراسة', 'About the study']
        ,['الذكاء الاصطناعي في قطاع الإنتاج والتصنيع', 'Artificial Intelligence in Production & Manufacturing']
        ,['دراسة شاملة حول دور الثورة الصناعية الرابعة في إعادة تشكيل الكفاءة التشغيلية والإنتاجية وجودة التصنيع.', 'A comprehensive study of how the Fourth Industrial Revolution is reshaping operational efficiency, productivity, and manufacturing quality.']
        ,['تستعرض الدراسة تطبيقات الذكاء الاصطناعي في المصانع الذكية، بما في ذلك فحص الجودة بالرؤية الحاسوبية، الصيانة التنبؤية، التوائم الرقمية، برمجة الروبوتات، وتحسين سلاسل التوريد.', 'The study reviews AI applications in smart factories, including computer-vision quality inspection, predictive maintenance, digital twins, robot programming, and supply-chain optimization.']
        ,['تتضمن الدراسة مؤشرات تشغيلية وأمثلة على التحسينات المحتملة، إضافة إلى التحديات والانتقال نحو الصناعة 5.0.', 'It includes operational indicators and examples of potential improvements, as well as the challenges of moving toward Industry 5.0.']
        ,['العودة إلى المكتبة', 'Return to the library']
        ,['Project', 'مشروع']
        ,['Projects', 'المشاريع']
        ,['Study', 'دراسة']
        ,['Team members', 'أعضاء الفريق']
        ,['View project →', 'عرض المشروع ←']
        ,['View study →', 'عرض الدراسة ←']
        ,['Meet the team →', 'تعرّف على الفريق ←']
        ,['What we build', 'ما نبنيه']
        ,['Web', 'الويب']
        ,['Research', 'البحث']
        ,['Community', 'المجتمع']
        ,['A collaborative platform for announcements, resources, and project updates for students and mentors.', 'منصة تعاونية للإعلانات والموارد وتحديثات المشاريع للطلاب والمشرفين.']
        ,['A study-focused initiative analyzing how digital tools improve student learning and participation.', 'مبادرة تركز على دراسة كيفية تحسين الأدوات الرقمية لتعلم الطلاب ومشاركتهم.']
        ,['A community effort connecting students with local programs, workshops, and shared educational events.', 'جهد مجتمعي يربط الطلاب بالبرامج وورش العمل والفعاليات التعليمية المحلية المشتركة.']
        ,['Research · العربية', 'بحث · العربية']
        ,['Read the paper', 'قراءة البحث']
        ,['Exploring code, product thinking, and practical digital tools used in real teams.', 'استكشاف البرمجة والتفكير في المنتجات والأدوات الرقمية العملية المستخدمة في الفرق الحقيقية.']
        ,['Investigating experiments, data collection, and evidence-based problem solving.', 'دراسة التجارب وجمع البيانات وحل المشكلات القائم على الأدلة.']
        ,['Improving visual storytelling, user experience, and how ideas are shared clearly.', 'تحسين السرد البصري وتجربة المستخدم ووضوح مشاركة الأفكار.']
        ,['Strengthening collaboration, planning, and decision-making across projects.', 'تعزيز التعاون والتخطيط واتخاذ القرار عبر المشاريع.']
        ,['Client V0.0c · music', 'العميل V0.0c · موسيقى']
        ,['Luau · music player', 'Luau · مشغل موسيقى']
        ,['Luau · toolkit', 'Luau · أداة']
        ,['Play on Roblox', 'العب على Roblox']
    ].forEach(([english, arabic]) => addTextTranslation(english, arabic));

    const translateTextNodes = (lang) => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) {
            if (node.parentElement.closest('pre, code, script, style')) {
                continue;
            }
            textNodes.push(node);
        }
        textNodes.forEach((textNode) => {
            const trimmed = textNode.nodeValue.trim();
            const translated = textTranslations[lang].get(trimmed);
            if (translated) {
                textNode.nodeValue = textNode.nodeValue.replace(trimmed, translated);
            }
        });
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

        document.querySelectorAll('[placeholder], [aria-label], [title]').forEach((node) => {
            ['placeholder', 'aria-label', 'title'].forEach((attribute) => {
                const value = node.getAttribute(attribute);
                const translated = value ? textTranslations[lang].get(value) : null;
                if (translated) {
                    node.setAttribute(attribute, translated);
                }
            });
        });

        if (languageToggle) {
            const isArabic = lang === 'ar';
            languageToggle.textContent = isArabic ? 'EN' : 'AR';
            languageToggle.setAttribute('aria-label', isArabic ? 'Switch to English' : 'التبديل إلى العربية');
        }

        if (dirToggle) {
            dirToggle.textContent = lang === 'ar' ? 'LTR' : 'RTL';
        }

        translateTextNodes(lang);
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

    const searchInput = document.getElementById('project-search');
    const filterToggle = document.getElementById('filter-toggle');
    const filterMenu = document.getElementById('project-filters');
    const typeSelect = document.getElementById('project-type');
    const projectCards = [...document.querySelectorAll('.searchable-card')];
    const resultsSummary = document.getElementById('results-summary');
    const emptyResults = document.getElementById('empty-results');

    const requestedType = new URLSearchParams(window.location.search).get('type');
    if (typeSelect && (requestedType === 'project' || requestedType === 'study')) {
        typeSelect.value = requestedType;
        if (filterMenu) {
            filterMenu.hidden = false;
        }
        filterToggle?.setAttribute('aria-expanded', 'true');
    }

    const filterProjects = () => {
        const query = searchInput?.value.trim().toLowerCase() || '';
        const selectedType = typeSelect?.value || 'all';
        let visibleCount = 0;

        projectCards.forEach((card) => {
            const matchesQuery = card.textContent.toLowerCase().includes(query);
            const matchesType = selectedType === 'all' || card.dataset.type === selectedType;
            const isVisible = matchesQuery && matchesType;
            card.hidden = !isVisible;
            if (isVisible) {
                visibleCount += 1;
            }
        });

        if (resultsSummary) {
            const activeLanguage = document.documentElement.lang;
            const summary = visibleCount === 1
                ? (activeLanguage === 'ar' ? 'عرض عنصر واحد' : 'Showing 1 item')
                : (activeLanguage === 'ar' ? `عرض ${visibleCount} عناصر` : `Showing ${visibleCount} items`);
            resultsSummary.textContent = summary;
        }
        if (emptyResults) {
            emptyResults.hidden = visibleCount !== 0;
        }
    };

    searchInput?.addEventListener('input', filterProjects);
    typeSelect?.addEventListener('change', filterProjects);
    filterToggle?.addEventListener('click', () => {
        const isOpen = filterMenu?.hidden === false;
        if (filterMenu) {
            filterMenu.hidden = isOpen;
        }
        filterToggle.setAttribute('aria-expanded', String(!isOpen));
    });
    filterProjects();

});
