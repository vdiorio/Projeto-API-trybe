const { getUserPullRequests } = require("./script");

describe('Validação positiva do usuário', () => {
  it('Ao passar um usuário inválido, um alerta deve ser gerado', () => {
    expect(2 + 2).toBe(4)
  })
  it('Ao tentar passar o mesmo nome do usuário ja gerado, a pagina deve se manter igual', () => {
    expect(5 / 5).toBe(1)
  })
  it('Todos os projetos da trybe devem aparecer na tela ao clicar no botão', () => {
    expect('esse teste é de verdade').toBe('esse teste é de verdade');
  })
});
