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
    cy.get(".rdt > .form-control")
      .clear()
      .type("1/1-2019");

    cy.get("[data-test=form-output-score]").should("have.value", "75");

    cy.get("[data-test=activity-list-item]").should("have.length", 0);
    cy.get("[data-test=form-btn-submit]").click();
    cy.get("[data-test=activity-list-item]").should("have.length", 1);
  });

  it("New activities are added on top", () => {
    cy.visit(`/${username}`);
    cy.get("[data-test=form-input-discipline]").select("swim");
    cy.get("[data-test=form-input-distance]").type("1");
    cy.get(".rdt > .form-control")
      .clear()
      .type("1/1-2020");
    cy.get("[data-test=form-btn-submit]").click();

    cy.get("[data-test=activity-list-item]")
      .eq(0)
      .should("contain", 2020);
    cy.get("[data-test=activity-list-item]")
      .eq(1)
      .should("contain", 2019);
  });

  it("Old activities are added to the bottom", () => {
    cy.visit(`/${username}`);
    cy.get("[data-test=form-input-discipline]").select("swim");
    cy.get("[data-test=form-input-distance]").type("1");
    cy.get(".rdt > .form-control")
      .clear()
      .type("1/1-2018");
    cy.get("[data-test=form-btn-submit]").click();

    cy.get("[data-test=activity-list-item]")
      .eq(0)
      .should("contain", 2020);
    cy.get("[data-test=activity-list-item]")
      .eq(1)
      .should("contain", 2019);
    cy.get("[data-test=activity-list-item]")
      .eq(2)
      .should("contain", 2018);
  });
});
