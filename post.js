const POSTS_PER_PAGE = 6;
const postListing = document.getElementById('post-listing');
const postStatus = document.getElementById('post-status');
const postPagination = document.getElementById('post-pagination');
let posts = [];

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
}[char]));

const getPageFromUrl = () => {
    const page = Number(new URLSearchParams(window.location.search).get('page'));
    return Number.isInteger(page) && page > 0 ? page : 1;
};

const updatePageUrl = (page) => {
    const url = new URL(window.location.href);
    if (page === 1) {
        url.searchParams.delete('page');
    } else {
        url.searchParams.set('page', page);
    }
    window.history.pushState({ page }, '', url);
};

const renderPosts = (page) => {
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) || 1;
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

    postListing.innerHTML = pagePosts.map((post) => `
        <article class="post-item glass">
            <div class="post-cover">
                <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt)}">
            </div>
            <div class="post-info">
                <p class="post-tag">${escapeHtml(post.tag)}</p>
                <h3>${escapeHtml(post.title)}</h3>
                <p class="post-subtitle">${escapeHtml(post.subtitle)}</p>
                <a class="btn btn-outline" href="${escapeHtml(post.href)}">Ler post</a>
            </div>
        </article>
    `).join('');

    postStatus.textContent = `${posts.length} posts encontrados • Página ${currentPage} de ${totalPages}`;
    renderPagination(currentPage, totalPages);

    if (currentPage !== page) {
        updatePageUrl(currentPage);
    }
};

const renderPagination = (currentPage, totalPages) => {
    if (totalPages <= 1) {
        postPagination.innerHTML = '';
        return;
    }

    const pageButtons = Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return `<button type="button" class="post-page-button${page === currentPage ? ' active' : ''}" data-page="${page}" aria-label="Ir para página ${page}" ${page === currentPage ? 'aria-current="page"' : ''}>${page}</button>`;
    }).join('');

    postPagination.innerHTML = `
        <button type="button" class="post-page-button" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>
        <div class="post-page-list">${pageButtons}</div>
        <button type="button" class="post-page-button" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>Próxima</button>
    `;
};

postPagination.addEventListener('click', (event) => {
    const button = event.target.closest('[data-page]');
    if (!button || button.disabled) {
        return;
    }

    const page = Number(button.dataset.page);
    updatePageUrl(page);
    renderPosts(page);
    document.querySelector('.post-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

window.addEventListener('popstate', () => renderPosts(getPageFromUrl()));

fetch('post.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Não foi possível carregar post.json.');
        }
        return response.json();
    })
    .then((data) => {
        posts = Array.isArray(data) ? data : [];
        renderPosts(getPageFromUrl());
    })
    .catch((error) => {
        postStatus.textContent = 'Não foi possível carregar os posts agora. Tente novamente em instantes.';
        console.error(error);
    });
