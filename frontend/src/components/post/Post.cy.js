import Post from "./Post";

describe("Post", () => {
  it("renders a post with a message", () => {
    cy.mount(
      <Post post={{ _id: 1, message: "Hello, world", author: { id: 1234 } }} />
    );
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
  });

  it("renders a delete button only on a users' post", () => {
    const post = {
      _id: 5489,
      message: "test",
      author: {
        id: 1234,
      },
    };
    const createdBy = post.author.id
    const currentUser = 1234;
    const fakeToken = "fakeToken"
    window.localStorage.setItem("userID", currentUser);
    window.localStorage.setItem("token", fakeToken);
    cy.mount(<Post post={post} userID={currentUser} token={fakeToken} setToken={()=>{}} />);
    cy.log("this is the type of current user--",typeof currentUser)
    cy.log("this is the type of created by user--",typeof createdBy)
    cy.log("this is the type of local storage--",typeof window.localStorage.getItem("userID"))
    if (createdBy === currentUser) {
      cy.get('[data-cy="delete"]').should("be.visible");
    } else {
      cy.get('[data-cy="delete"]').should("not.exist");
    }
  });
});
