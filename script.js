function createCard(project) {
  fetch(`${project.comments_url}?per_page=100`)
    .then((response) => response.json())
      .then((arr) => {
        let evaluatorComment = arr.filter((comment) => comment.user.login.includes('evaluation')).reduce((acc, curr) => {
            if (Date.parse(acc.created_at) < Date.parse(curr.created_at)) return curr;
          return acc;
        }, arr[0])
      console.log(`${project.title.split('] ')[1]}: ${evaluatorComment.body.split('obrigatórios | ')[1].split('%')[0]}%`)
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

window.onload = getUserPullRequests('vdiorio');