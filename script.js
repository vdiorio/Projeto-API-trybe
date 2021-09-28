function findProjects(project) {
  fetch(`${project.comments_url}?per_page=100`)
    .then((response) => response.json())
      .then((arr) => {
        let evaluatorComment = arr.filter((comment) => comment.user.login.includes('evaluation'))
          .reduce((acc, curr) => {
            let atual = parseFloat([curr.body.split('totais | ')[1].split('%')[0]])
            if (acc < atual) return atual;
          return acc;
        }, 0);
      createCards(project.title.split('] ')[1], `${evaluatorComment}%`)
      })
}

function getUserPullRequests(user) {
  return fetch(`https://api.github.com/search/issues?q=state%3Aopen+author%3A${user}+type%3Apr`)
  .then((response) => response.json())
  .then((object) => object.items.forEach((project) =>{
    if(project.html_url.includes('tryber')){
      findProjects(project)
    }
  }))
    .catch(alert('Usuário inválido'));
}

function createCards(title, note) {
  const cardSection = document.querySelector('.card-container');
  const section = document.createElement('div');
  section.classList = 'card has-text-black column';
  const div = document.createElement('div');
  div.className = 'icon card';
  const i = document.createElement('i');
  const h4 = document.createElement('h4');
  h4.innerText = title;
  const p = document.createElement('p');
  p.innerText = note;

  section.appendChild(div);
  section.appendChild(h4);
  section.appendChild(p);
  div.appendChild(i);
  cardSection.appendChild(section);
}

document.querySelector('button').addEventListener('click', () => {
  const input = document.querySelector('input');
  getUserPullRequests(input.value);
});
