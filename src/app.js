    const form = document.getElementById('searchForm');
    const input = document.getElementById('usernameInput');
    const resultDiv = document.getElementById('result');
    const Image = document.getElementById('image')
    const UserId = document.getElementById('UserId')
    const BioSection = document.getElementById('BioSection')
    const Repos = document.getElementById('Repos')
    const VisitProfile = document.getElementById('VisitProfile')
      
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = input.value.trim();
  if (!username) return;

  resultDiv.innerHTML = "Loading...";

  const response = await fetch(`https://api.github.com/users/${username}`);
  
  if (!response.ok) {
    resultDiv.innerHTML = `<p class="text-red-500 font-semibold">User not found</p>`;
    return;
  }

  const data = await response.json();
  Image.src = data.avatar_url;
  Image.classList.remove('hidden'); // show image
  
  UserId.innerText = data.name || data.login;
  BioSection.innerText = data.bio || "No bio available";
  Repos.innerText = `Repos: ${data.public_repos} | Followers: ${data.followers}`;
  VisitProfile.innerHTML = `<a href="${data.html_url}" target="_blank" class="text-indigo-600 hover:underline font-medium">Visit Profile</a>`;
  
  resultDiv.innerHTML = "";
});
