class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="glass-nav">
                <div class="container flex-row-between nav-bar">
                    <a href="/" style="color: inherit; text-decoration: none;"><div class="logo">Self<span>ware</span></div></a>
                    <button class="nav-toggle" type="button" aria-label="Abrir menu" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-links">
                        <li style="align-self: anchor-center;"><a href="/#concept">Conceito</a></li>
                        <li style="align-self: anchor-center;"><a href="/#services">Serviços</a></li>
                        <li style="align-self: anchor-center;"><a href="/post.html">Posts</a></li>
                        <!-- li style="align-self: anchor-center;"><a href="/videos.html">Vídeos</a></li -->
                        <li style="align-self: anchor-center;"><a href="/#contact">Contato</a></li>
                        <li><a class="btn btn-primary nav-login" href="https://sociap.io/login" target="_blank" style="color:black" rel="noopener noreferrer">Login</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }
}

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="container">
                    <div class="footer-content">
                        <a href="/" style="color: inherit; text-decoration: none;"><div class="logo">Self<span>ware</span></div></a>
                        <p>&copy; 2026 Selfware. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
            <script src="https://analytics.ahrefs.com/analytics.js" data-key="0ERg0NEvo0G39EZJTWa5ag" async></script>
        `;
    }
}

customElements.define('header-main', Header)
customElements.define('footer-main', Footer)


