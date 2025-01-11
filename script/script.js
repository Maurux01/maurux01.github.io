<script>
        // Datos de las tecnologías
        const technologies = [
            { 
                name: 'Angular', 
                src: 'https://angular.io/assets/images/logos/angular/angular.svg',
                url: 'https://angular.io/'
            },
            { 
                name: 'CSS3', 
                src: 'https://cdn-icons-png.flaticon.com/128/5968/5968242.png',
                url: 'https://www.w3schools.com/css/css_intro.asp'
            },
            { 
                name: 'JavaScript', 
                src: 'https://img.icons8.com/?size=256&id=108784&format=png',
                url: 'https://aws.amazon.com/what-is/javascript/?nc1=h_ls'
            },
            { 
                name: 'HTML5', 
                src: 'https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/html5/html5-original-wordmark.svg',
                url: 'https://www.w3schools.com/html/html_intro.asp'
            },
            { 
                name: 'Python', 
                src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
                url: 'https://www.python.org'
            },
            { 
                name: 'Node.js', 
                src: 'https://cdn-icons-png.flaticon.com/128/919/919825.png',
                url: 'https://nodejs.org/'
            },
            { 
                name: 'React', 
                src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
                url: 'https://reactjs.org/'
            },
            { 
                name: 'Java', 
                src: 'https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/java/java-original-wordmark.svg',
                url: 'https://www.java.com'
            },
            { 
                name: 'MySQL', 
                src: 'https://raw.githubusercontent.com/devicons/devicon/ca28c779441053191ff11710fe24a9e6c23690d6/icons/mysql/mysql-original-wordmark.svg',
                url: 'https://www.mysql.com/'
            } 
        ];

        // Renderizado de componentes
        function renderPersonalCV() {
            const root = document.getElementById('root');
            
            // Header
            const header = document.createElement('header');
            header.innerHTML = `
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/perfil.jpg-3qI6BfhFqG3rP67BQ2lVqTiIfyP4El.jpeg" alt="Mauro Infante">
                <h1>Mauro Infante</h1>
                <div class="title-container">
                    <p class="title-text">
                        <span class="role">Industrial Engineer</span>
                        <span class="separator">|</span>
                        <span class="role">Jr Software Engineer</span>
                        <span class="separator">|</span>
                        <span class="role">Quality Assurance</span>
                    </p>
                </div>
            `;
            root.appendChild(header);

            // Agregar dentro de la función renderPersonalCV, después de crear la imagen
            const profileImg = header.querySelector('img');
            profileImg.addEventListener('mouseover', createParticles);

            function createParticles() {
                for (let i = 0; i < 15; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    
                    // Posición inicial (alrededor de la imagen)
                    const angle = (Math.random() * Math.PI * 2);
                    const radius = 75; // La mitad del ancho de la imagen
                    particle.style.left = `${profileImg.offsetLeft + profileImg.offsetWidth/2}px`;
                    particle.style.top = `${profileImg.offsetTop + profileImg.offsetHeight/2}px`;
                    
                    // Dirección aleatoria
                    const x = Math.cos(angle) * (Math.random() * 100 + 50);
                    const y = Math.sin(angle) * (Math.random() * 100 + 50);
                    particle.style.setProperty('--x', `${x}px`);
                    particle.style.setProperty('--y', `${y}px`);
                    
                    // Animación
                    particle.style.animation = `particleMove ${Math.random() * 1 + 0.5}s ease-out forwards`;
                    
                    header.appendChild(particle);
                    
                    // Limpiar partículas
                    setTimeout(() => particle.remove(), 2000);
                }
            }

            // About Section
            const aboutSection = document.createElement('section');
            aboutSection.id = "about";
            aboutSection.innerHTML = `
                <h2 class="neon-title about-title">ABOUT ME</h2>
                <div class="info">
                    <p>🌱 Learning <strong>machine learning</strong></p>
                    <p>🫂 I seek to collaborate <strong>with other creators</strong></p>
                    <p>👨‍💻 All of my projects are available at <a href="https://github.com/Maurux01">My profile</a>/ <a href="https://drive.google.com/drive/folders/1Sq5hnD3T1hJmHeicdiXK0TyH4OPDFrV3?usp=drive_link" target="_blank">Code certificates</a></p>/<a href="https://drive.google.com/drive/u/0/folders/1yW6YV73z90q1kUUwXLvQkCM7AZ8X2lTO" target="_blank" rel="noopener noreferrer">Other certificates</a>/<a href="https://drive.google.com/file/d/1jWo6rGPY5Gjf7cLy88XKt0zkzlYzjoPM/view?usp=drive_link" target="_blank">Descargar mi CV</a>


            `;
            root.appendChild(aboutSection);

            // Technologies Section
            const techSection = document.createElement('section');
            techSection.id = "technologies";
            techSection.innerHTML = `
                <h2 class="technologies-title">TECHNOLOGIES</h2>
                <div class="tech-container"></div>
            `;
            const techContainer = techSection.querySelector('.tech-container');
            technologies.forEach((tech, index) => {
                const techItem = document.createElement('div');
                techItem.className = 'tech-item';
                techItem.style.animationDelay = `${0.1 * index}s`;
                techItem.innerHTML = `
                    <a href="${tech.url}" target="_blank" class="tech-link">
                        <img src="${tech.src}" alt="${tech.name}">
                        <p>${tech.name}</p>
                    </a>
                `;
                techContainer.appendChild(techItem);
            });
            root.appendChild(techSection);

            // Stats Section
            const statsSection = document.createElement('section');
            statsSection.id = "stats";
            statsSection.innerHTML = `
                <h2 class="neon-title stats-title">MY GITHUB STATS 🏆</h2>
                
                <div class="github-stats-container">
                    <div class="github-stats">
                        <!-- Lenguajes más usados -->
                        <div class="stats-card">
                            <a href="https://github.com/Maurux01" target="_blank">
                                <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=maurux01&layout=compact&theme=radical&bg_color=0D1117&title_color=58A6FF&text_color=FFFFFF&icon_color=58A6FF&border_color=30363D" 
                                     alt="Most Used Languages">
                            </a>
                        </div>

                        <!-- Estadísticas generales -->
                        <div class="stats-card">
                            <a href="https://github.com/Maurux01" target="_blank">
                                <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=maurux01&theme=github_dark" 
                                     alt="GitHub Stats" />
                            </a>
                        </div>

                        <!-- Estadísticas de contribuciones -->
                        <div class="stats-card">
                            <a href="https://github.com/Maurux01" target="_blank">
                                <img src="https://github-readme-streak-stats.herokuapp.com/?user=maurux01&theme=dark&hide_border=true" 
                                     alt="GitHub Streak" />
                            </a>
                        </div>
                    </div>
                </div>
            `;
            root.appendChild(statsSection);

            // Footer Section
            const footer = document.createElement('footer');
            footer.innerHTML = `
                <a href="https://linkedin.com/in/infmauro" target="_blank" class="linkedin">
                    <img src="https://img.icons8.com/?size=100&id=447&format=png&color=000000" alt="LinkedIn">
                    LinkedIn
                </a>
                <a href="https://github.com/Maurux01" target="_blank" class="github">
                    <img src="https://img.icons8.com/?size=100&id=lkh3AbJLmFpp&format=png&color=000000" alt="GitHub">
                    GitHub
                </a>
            `;
            root.appendChild(footer);
        }

        // Run the render function
        renderPersonalCV();

        // Agregar botón de cambio de tema
        function addThemeToggle() {
            const button = document.createElement('button');
            button.className = 'theme-toggle';
            button.innerHTML = `
                <div class="toggle-circle"></div>
                <span class="icon sun">☀️</span>
                <span class="icon moon">🌙</span>
            `;
            
            // Verificar el tema guardado
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            }

            // Manejar el click del botón
            button.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                if (currentTheme === 'dark') {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                }
            });

            document.body.appendChild(button);
        }

        // Asegúrate de llamar a esta función después de renderizar el CV
        addThemeToggle();

        // Añade esta función en tu JavaScript
        async function fetchGitHubLanguages() {
            try {
                const username = 'Maurux01';
                const response = await fetch(`https://api.github.com/users/${username}/repos`);
                const repos = await response.json();
                
                // Objeto para almacenar el total de bytes por lenguaje
                let languageTotals = {};
                
                // Obtener los lenguajes de cada repositorio
                for (const repo of repos) {
                    const langResponse = await fetch(repo.languages_url);
                    const languages = await langResponse.json();
                    
                    // Sumar bytes por lenguaje
                    for (const [lang, bytes] of Object.entries(languages)) {
                        languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
                    }
                }
                
                // Calcular porcentajes
                const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);
                const languagePercentages = {};
                for (const [lang, bytes] of Object.entries(languageTotals)) {
                    languagePercentages[lang] = (bytes / totalBytes * 100).toFixed(1);
                }
                
                // Ordenar lenguajes por porcentaje
                const sortedLanguages = Object.keys(languagePercentages).sort((a, b) => languagePercentages[b] - languagePercentages[a]);
                
                // Mostrar los lenguajes más utilizados en tiempo real
                console.log('Lenguajes más utilizados:', sortedLanguages);
            } catch (error) {
                console.error('Error al obtener los lenguajes de GitHub:', error);
            }
        }

        function createTechCard(tech) {
            return `
                <div class="tech-card">
                    <img src="${tech.icon}" alt="${tech.name}">
                    <p>${tech.name}</p>
                </div>
            `;
        }
    </script>

