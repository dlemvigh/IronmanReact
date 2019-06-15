describe("Activity mobile tests", () => {
  let username;

  before(() => {
    cy.addUser().then(result => {
      username = result;
    });
  });

  after(() => {
    cy.removeUser(username);
  });

  beforeEach(() => {
    cy.viewport("iphone-6");
  })

  it("Can add an activity");

  it("Can update an activity");

  it("Can remove an activity");
})