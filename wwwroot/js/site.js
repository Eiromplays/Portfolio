// Grab div that will display our data.
// Use github username to grab info from the GitHub API
// Display the response data from the GitHub API

// Grab div that will display our data

var gitHubUsers = ["eiromplays", "Frozensoft-Games"];
gitHubUsers.forEach(user => {
    LoadGitHubUser(user, document.getElementById(`${user}-user-info-card`));
});



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
                <img src='${response.avatar_url}' class="rounded-circle" height="300" alt="${response.name}'s GitHub Avatar"/>
            </div>
            <div class="github-card-body">
                <h3>Name: ${response.name}</h3>
                <h4>Username: ${response.login}</h4>
                ${company}
                <p>${response.bio}</p>
                <div class="github-card-row items-space-between">
                    <div class="github-card-item-info">
                        <h4>Public Repos</h4>
                        <p>${response.public_repos}</p>
                    </div>
                    <div class="github-card-item-info">
                        <h4>Followers</h4>
                        <p>${response.followers}</p>
                    </div>
                </div>
                <a target="_blank" href="${response.html_url}" class="btn btn-primary">Visit Profile</a>
            </div>`;
        }
    }
    xhrRequest.send();
};