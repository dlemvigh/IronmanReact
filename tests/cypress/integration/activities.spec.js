describe("Activity tests", () => {

  let username;

  before(() => {
    cy.addUser().then(result => {
      username = result;
    });
  });

  after(() => {
    cy.removeUser(username);
  });

  it("Can add an activity", () => {
    cy.visit(`/${username}`);

    cy.get("[data-test=form-input-discipline]").select("swim");    
    cy.get("[data-test=form-input-distance]").type("3");
    cy.get(".rdt > .form-control").clear().type("1/1-2019");

    cy.get("[data-test=form-output-score]").should("have.value", "75");


    cy.get("[data-test=activity-list-item]").should("have.length", 0);
    cy.get("[data-test=form-btn-submit]").click();
    cy.get("[data-test=activity-list-item]").should("have.length", 1);
  });
});