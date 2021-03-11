// Grab div that will display our data.
// Use github username to grab info from the GitHub API
// Display the response data from the GitHub API

// Grab div that will display our data

function LoadGitHubUsers(users) {
    users.forEach(user => {
        LoadGitHubUser(user, document.getElementById(`${user}-user-info-card`));
    });
}

function LoadGitHubUser(user, cardInfo) {
    if (cardInfo === null || cardInfo === undefined)
        return;

    const xhrRequest = new XMLHttpRequest();

    // Use provided data to grab user info from GitHub API
    xhrRequest.open("GET", `https://api.github.com/users/${user}`);
    xhrRequest.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const response = JSON.parse(this.response);
            // Display the response data from the GitHub API
            let companyName = response.company;
            let company;
            if (companyName != null) {
                companyName = companyName.replace("@", "");
                company =
                    `<h5>Company: <a target="_blank" href='https://github.com/${companyName}'>${companyName}</a></h5>`;
            } else company = "";

            cardInfo.innerHTML = `
            <div class="github-card-avatar">
                <img src='${response.avatar_url}' class="rounded-circle" alt="${response.name}'s GitHub Avatar"/>
            </div>
            <div class="github-card-body text-break">
                <h3>Name: ${response.name}</h3>
                <h4>Username: ${response.login}</h4>
                ${company}
                <p>Bio: ${response.bio}</p>
                <div class="github-card-row items-space-between">
                    <div class="github-card-item-info">
                        <h5>Public Repos</h5>
                        <p>${response.public_repos}</p>
                    </div>
                    <div class="github-card-item-info">
                        <h5>Followers</h5>
                        <p>${response.followers}</p>
                    </div>
                    <div class="github-card-item-info">
                        <h5>Following</h5>
                        <p>${response.following}</p>
                    </div>
                </div>
                <a target="_blank" href="${response.html_url}" class="btn btn-primary">Visit Profile</a>
            </div>  
            <h2>${response.name}'s Public Projects:</h2>
            <h4>See List: <br />
                <i id="${user}" class="fas fa-arrow-circle-down github-read-more-icon"></i>
            </h4>
            <div id="${user}-github-projects" style="display: none;"></div>`;

            LoadGitHubProjects(user);
        }
    }
    xhrRequest.send();
};

function LoadGitHubProjects(user) {
    const gameCard = document.getElementById(`${user}-github-projects`);

    if (gameCard === null || gameCard === undefined)
        return;

    const xhrRequest = new XMLHttpRequest();

    // Use provided data to grab user info from GitHub API
    xhrRequest.open("GET", `https://api.github.com/users/${user}/repos`);
    xhrRequest.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            const response = JSON.parse(this.response);

            response.forEach(project => {
                // Display the response data from the GitHub API
                let forked;
                if (project.fork) {
                    forked = `<a href='https://github.com/${project.owner.login}/${project.name}/network/members'><p>Yes</p></a>`;
                } else forked = "<p>No</p>";

                gameCard.innerHTML = `${gameCard.innerHTML}
                <div class="github-card-body text-break">
                    <h3>Name: ${project.name}</h3>
                    <p>Description: ${project.description}</p>
                    <div class="github-card-row items-space-between">
                        <div class="github-card-item-info">
                            <h4>Forked</h4>
                            ${forked}
                        </div>
                        <div class="github-card-item-info">
                            <h4>Forks</h4>
                            <p>${project.forks_count}</p>
                        </div>
                        <div class="github-card-item-info">
                            <h4>Watchers</h4>
                            <p>${project.watchers_count}</p>
                        </div>
                    </div>
                <a target="_blank" href="${project.html_url}" class="btn btn-primary">See Project</a>`;
            });
        }
    }
    xhrRequest.send();
}

$(function () {
    $(document).on("click", ".github-read-more-icon", function (obj) {
        obj.stopPropagation();

        const id = $(this).attr("id");

        ExpandProjects(id, $(this));
    });

});

function ExpandProjects(name, expandProjectBtn) {
    const projects = document.getElementById(`${name}-github-projects`);

    if (projects === null || projects === undefined)
        return;

    if (expandProjectBtn === null || expandProjectBtn === undefined)
        return;

    expandProjectBtn.toggleClass("fa-arrow-circle-up");

    if (projects.style.display === null || projects.style.display === undefined || projects.style.display === "block")
        projects.style.display = "none";
    else projects.style.display = "block";
}
