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

  beforeEach(() => cy.viewport("iphone-6"));

  it("Can add an activity", () => {
    cy.visit(`/${username}`);
    cy.get("[data-test=form-input-discipline-button-bike]").click();
    cy.get("[data-test=form-input-distance]").type("3");

    cy.get("[data-test=form-output-score]").should("have.value", "3");

    cy.get("[data-test=activity-list-item]").should("have.length", 0);
    cy.get("[data-test=form-btn-submit]").click();
    cy.get("[data-test=activity-list-item]").should("have.length", 1).contains("3 km");
  });

  it("Can update an activity", () => {
    cy.visit(`/${username}`);

    cy.get("[data-test=activity-list-item-edit")
      .eq(0)
      .click();
    cy.get("[data-test=form-input-distance]")
      .clear()
      .type("2");
    cy.get("[data-test=form-output-score]").should("have.value", "2");

    cy.get("[data-test=form-btn-submit]").click();
    cy.get("[data-test=activity-list-item]").should("have.length", 1).contains("2 km");
  });

  it("Can remove an activity", () => {
    cy.visit(`/${username}`);

    cy.get("[data-test=activity-list-item]").should("have.length", 1);
    cy.get("[data-test=activity-list-item-delete")
      .eq(0)
      .click();
    cy.get("[data-test=activity-list-item]").should("have.length", 0);
  });
})