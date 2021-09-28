function createCard(project) {
  fetch(`${project.comments_url}?per_page=100`)
    .then((response) => response.json())
      .then((arr) => {
        let evaluatorComment = arr.filter((comment) => comment.user.login.includes('evaluation')).reduce((acc, curr) => {
            if (Date.parse(acc.created_at) < Date.parse(curr.created_at)) return curr;
          return acc;
        }, arr[0])
      console.log(`${project.title.split('] ')[1]} ${evaluatorComment.body.split('obrigatórios | ')[1].split('%')[0]}%`)
      })
}

function getUserPullRequests(user) {
  return fetch(`https://api.github.com/search/issues?q=state%3Aopen+author%3A${user}+type%3Apr`)
  .then((response) => response.json())
  .then((object) => object.items.forEach((project) =>{
    if(project.html_url.includes('tryber')){
      createCard(project)
    }
  }));
}

function createCards() {
  const cardSection = document.querySelector('.card-content');
  let projectCount = ['Project 2', 'Project 3']

  projectCount.forEach(() => {
    const section = document.createElement('section');
    section.className = 'card';
    const div = document.createElement('div');
    div.className = 'icon';
    const i = document.createElement('i');
    const h4 = document.createElement('h4');
    for (let index of projectCount) {
      h4.innerText = projectCount[index];
      console.log(projectCount[index]);
    }
    const p = document.createElement('p');
    p.innerText = 'Click to see this project';

    cardSection.appendChild(section);
    section.appendChild(div);
    section.appendChild(h4);
    section.appendChild(p);
    div.appendChild(i);
  })
}
// createCards()

window.onload = getUserPullRequests('vdiorio');