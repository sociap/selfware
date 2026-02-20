document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.glass-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (nav && navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav-open')) {
                    nav.classList.remove('nav-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = href ? document.querySelector(href) : null;

            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .concept-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    const projectReference = document.getElementById('project-reference');
    if (projectReference) {
        const projectId = new URLSearchParams(window.location.search).get('projectId');
        projectReference.textContent = projectId
            ? `Projeto #${projectId} criado com sucesso.`
            : 'Projeto sem identificação. Volte para a página inicial e envie o formulário.';
    }

    // Form submission handle
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            const formData = new FormData(contactForm);
            const payload = {
                project: 'selfware',
                params: 'nome,email,descricao',
                nome: formData.get('nome'),
                email: formData.get('email'),
                descricao: formData.get('descricao')
            };

            btn.innerText = 'Enviando...';
            btn.disabled = true;

            try {
                const response = await fetch('https://sociap.io/api/contact', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Falha ao iniciar o projeto.');
                }

                const result = await response.json();

                if (!result?.id) {
                    throw new Error('API retornou um projeto sem ID.');
                }

                window.location.href = `/pagamentos.html?projectId=${encodeURIComponent(result.id)}`;
            } catch (error) {
                alert('Não foi possível iniciar o projeto agora. Tente novamente em instantes.');
                console.error(error);
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }
});
