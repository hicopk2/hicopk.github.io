const GITHUB_USER = "yourusername"; // <-- change to your GitHub username

// Dark Mode Toggle
document.querySelector('#theme-toggle').addEventListener('change', function(e){
    document.body.classList.toggle('dark', e.target.checked);
});

// Fetch user's public repositories from GitHub API and show project cards
fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated`)
    .then(res => res.json())
    .then(repos => {
        const container = document.getElementById('projects');
        repos.forEach(repo => {
            if (!repo.fork && repo.description) { // Show only main repos with descriptions
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;
                container.appendChild(card);
            }
        });
    }).catch(err => {
        document.getElementById('projects').innerHTML = "<p>Failed to load projects.</p>";
    });
