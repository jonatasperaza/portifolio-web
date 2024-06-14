particlesJS("background", {
 
    particles: {
        number: {
            value: 20,
            density: {
                enable: true,
                value_area: 300,
            },
        },

        color: {
            value: "#ffffff",
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.8,
            random: true,
            anum: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: true,
                speed: 4,
                size_min: 0.3,
                sync: false,
            },
        },

        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },

        move: {
            enable: true,
            speed: 2.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: false,
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse",
            },
            onclick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
    },

    retina_detect: true,

});
document.addEventListener('DOMContentLoaded', () => {
    const username = 'jonatasperaza';
    const projectList = document.getElementById('project-list');
    const repoList = document.getElementById('repo-list');

    // Função para buscar repositórios do GitHub
    async function fetchGitHubRepos() {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();
        return repos;
    }

    // Função para buscar o número de commits de um repositório
    async function fetchCommitCount(repo) {
        const commitsUrl = `https://api.github.com/repos/${username}/${repo.name}/commits`;
        const response = await fetch(commitsUrl);
        const commits = await response.json();
        return commits.length;
    }

    // Função para atualizar a lista de projetos
    async function updateProjects(repos) {
        projectList.innerHTML = '';
        repoList.innerHTML = '';

        for (const repo of repos) {
            const commitCount = await fetchCommitCount(repo);
            if (commitCount > 10) {
                const projectItem = document.createElement('li');
                projectItem.innerHTML = `<a target="_blank" href="${repo.html_url}">${repo.name}</a>`;
                projectList.appendChild(projectItem);

                const repoItem = document.createElement('li');
                repoItem.innerHTML = `<a target="_blank" href="${repo.html_url}">${repo.name}</a>`;
                repoList.appendChild(repoItem);
            }
        }
    }

    // Chama a função para buscar e atualizar os repositórios
    fetchGitHubRepos().then(repos => {
        updateProjects(repos);
    }).catch(error => {
        console.error('Erro ao buscar repositórios do GitHub:', error);
    });
});
