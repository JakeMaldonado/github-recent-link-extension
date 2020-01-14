// add listener for a new link message

// add onload to get all the stored links

function getRecentLinks() {
  chrome.runtime.sendMessage({recenturls: "get"}, function(response) {
    console.log(response.pr_urls);
  });
}


function updatePopupLinks(links) {
  const linkContainer = document.getElementById('linkContainer');
  links.forEach(link => {
    let linkTag = document.createElement('a');
    linkTag.href = link;
    linkContainer.appendChild(linkTag);
  });
}

