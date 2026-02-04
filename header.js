class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="glass-nav">
                <div class="container flex-row-between nav-bar">
                    <a href="/"><div class="logo">Self<span>ware</span></div></a>
                    <button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-links">
                        <li><a href="/#concept">Conceito</a></li>
                        <li><a href="/#services">Serviços</a></li>
                        <li><a href="/post.html">Posts</a></li>
                        <li><a href="/#contact">Contato</a></li>
                        <li><a class="btn btn-primary nav-login" href="https://sociap.io/login" target="_blank" rel="noopener noreferrer">Login</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }
}

customElements.define('header-main', Header)