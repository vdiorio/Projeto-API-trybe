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
      createCards(title, note, situation, evaluatorComment.at(-1).body);
      })
}

function createCards(title, note, situation, requisites) {
  const cardSection = document.querySelector('.sticks');
  const line = document.createElement('li');  
  line.id = title;
  const a = document.createElement('a');
  const h2 = document.createElement('h2');
  h2.innerText = title;
  const p = document.createElement('p');
  p.innerText = `Requisitos totais: ${note}%  
  Desempenho: ${situation}`;

  line.appendChild(a);
  line.onclick = () => createRequisites(title, requisites);
  a.appendChild(h2);
  a.appendChild(p);
  cardSection.appendChild(line);
}

function createRequisites (title, requisites) {
  const requisitesContainer = document.querySelector('.sticks_results')
  requisitesContainer.innerHTML = '';
  const text = requisites.split('*Avaliação*')[1].split('--- | :---:')[1].split(/\r?\n/g);
  for (let i = 1; i < text.length; i += 1) {
    text[i] = text[i].includes(' | :heavy_check_mark:') 
      ? `&#9989; ${text[i]}<br>` : `&#10060; ${text[i]}<br>`
  }
  
  const viewRequisites = document.createElement('li');
  viewRequisites.id = title;
  text.forEach((linha) => viewRequisites.innerHTML += linha.replaceAll(' | :heavy_check_mark:', '')
    .replaceAll(' | :heavy_multiplication_x:', ''))
  viewRequisites.width = '600px';
  viewRequisites.heigth = '600px';
  requisitesContainer.appendChild(viewRequisites)
}

function getUserPullRequests(user) {
  const cardContainer = document.querySelector('.sticks');
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

input.addEventListener('keyup', (event) => {
  if (event.key === "Enter") userButton.click();
});

userButton.addEventListener('click', () => {
  if (lastName === input.value ) return true;  
  getUserPullRequests(input.value)
});