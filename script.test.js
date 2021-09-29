const funcoes = require('./script');


describe('Validação positiva do usuário', () => {
  it('deveria retornar os objetos no container', () => {
    const a = 'Matheus-mont';
    await funcoes.getUserPullRequests(a);
    const b = document.('card');
    expect(await funcoes.getUserPullRequests(a))
  })
})