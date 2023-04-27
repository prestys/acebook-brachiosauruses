import Post from './Post'


describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })


  it('renders a delete button only on a users\' post', () => {
    const mockPost = {
      _id: 5489,
      message: "test",
      author: {
        id:1234,
      },
    };

    const currentUser = 1234;
    window.localStorage.setItem("userID", currentUser)
    cy.mount(<Post post={mockPost} />);
    if (mockPost.author.id === currentUser) {
      cy.screenshot()
    cy.get('[data-cy="delete"]').should('be.visible')
    } else {
      cy.expect(cy.get('[data-cy="delete"]')).to.be.null;
    }
  })
})
