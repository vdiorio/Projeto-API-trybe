const funcoes = require('./script');


describe('Validação positiva do usuário', () => {
  it('deveria retornar os objetos no container', async () => {
    const a = 'Matheus-mont';
    await funcoes.getUserPullRequests(a);
    const b = document.querySelectorAll('.card h4');
    const c = ["Trybewarts", "Project Jest", "Color guess", "Meme generator", "Shopping cart", "Zoo functions project", "Unit tests", "Playground Functions", "Project lessons learned", "\"To-do\" list project", "Project Pixel Art", "Mistery letter"]
    for (let i = 0; i < b.length; i += 1){
      c.push(b[i].innerText);
    }
    expect(b).toEqual(c);
  })
})