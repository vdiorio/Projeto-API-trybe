let lastName;
const input = document.querySelector('input');
const userButton = document.querySelector('button');

async function findProjects(project) {
  await fetch(`${project.comments_url}?per_page=100`)
    .then((response) => response.json())
      .then((arr) => {
        const title = project.comments_url.split('-project-')[1].split('/')[0].replaceAll('-', ' ');
        let situation;
        let evaluatorComment = arr.filter((comment) => comment.user.login.includes('evaluation'));
        let note = evaluatorComment.reduce((acc, curr) => {
            let atual = parseFloat([curr.body.split('totais | ')[1].split('%')[0]]);
            if (acc < atual) {
              situation = curr.body.split('Desempenho | ')[1].split('C')[0]
              return atual
            }
          return acc;
        }, 0);
      createCards(title, note, situation);
      createRequisites(title, evaluatorComment.at(-1).body);
      })
}

function getUserPullRequests(user) {
  const cardContainer = document.querySelector('.card-container');
  return fetch(`https://api.github.com/search/issues?q=state%3Aopen+author%3A${user}+type%3Apr`)
    .then((response) => response.json())
      .then((object) => {
        object.items.forEach((project) =>{
        if(project.html_url.includes('tryber')){
          cardContainer.innerHTML = '';
          findProjects(project);
        }
        lastName = user
        })})
    .catch(() => alert('Usuário inválido'));
}

function createRequisites (title, requisites) {
  const text = requisites.split('*Avaliação*')[1].split('--- | :---:')[1];
  const viewRequisites = document.createElement('p');
  viewRequisites.id = title;
  viewRequisites.innerHTML = text
    .replaceAll(':heavy_check_mark:','&#9989;<br>')
    .replaceAll(':heavy_multiplication_x:','&#10060;<br>');
  viewRequisites.style.backgroundColor = 'white';
  document.getElementById(title).appendChild(viewRequisites);
}

function createCards(title, note, situation) {
  const cardSection = document.querySelector('.card-container');
  const section = document.createElement('div');
  section.classList = 'card has-text-black column';
  section.id = title;
  const div = document.createElement('div');
  div.className = 'icon card';
  const i = document.createElement('i');
  const h4 = document.createElement('h4');
  h4.innerText = title;
  const p = document.createElement('p');
  p.innerText = `Requisitos totais: ${note}% | Desempenho: ${situation}`;

  section.appendChild(div);
  section.appendChild(h4);
  section.appendChild(p);
  div.appendChild(i);
  cardSection.appendChild(section);
}

input.addEventListener('keyup', (event) => {
  if (event.key === "Enter") userButton.click();
});

userButton.addEventListener('click', () => {
  if (lastName === input.value ) return true;
  getUserPullRequests(input.value)
});