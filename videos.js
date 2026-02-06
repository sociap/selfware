document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('video-list');

    if (!list) {
        return;
    }

    fetch('video.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível carregar os vídeos.');
            }
            return response.json();
        })
        .then(videos => {
            if (!Array.isArray(videos) || videos.length === 0) {
                list.innerHTML = '<p class="video-status">Nenhum vídeo disponível no momento.</p>';
                return;
            }

            list.innerHTML = videos.map(video => `
                <article class="video-card glass">
                    <div class="video-cover">
                        <img src="${video.thumbnail}" alt="${video.title}">
                        <span class="video-duration">${video.duration}</span>
                    </div>
                    <div class="video-info">
                        <p class="post-tag">${video.category}</p>
                        <h3>${video.title}</h3>
                        <p class="post-subtitle">${video.description}</p>
                        <div class="video-meta">
                            <span>${video.speaker}</span>
                            <span>${video.date}</span>
                        </div>
                        <a class="btn btn-outline" href="${video.url}" target="_blank" rel="noopener noreferrer">Assistir vídeo</a>
                    </div>
                </article>
            `).join('');
        })
        .catch(() => {
            list.innerHTML = '<p class="video-status">Não foi possível carregar os vídeos. Tente novamente mais tarde.</p>';
        });
});
