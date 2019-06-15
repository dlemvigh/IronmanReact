describe("Summary test", () => {
  let username;

  before(() => {
    cy.addUser().then(result => {
      username = result;
    });
  });

  after(() => {
    cy.removeUser(username);
  });

  it("When adding first activity, user is added to leaderboard, without needing to refresh", () => {
    cy.visit("/");
    cy.get("[data-test=leaderboard-list]").should("exist");
    cy.get(`[data-test=leaderboard-item-${username}]`).should("not.exist");

    cy.get("[data-test=nav-athletes-menu]").click();
    cy.get(`[data-test=nav-athletes-item-${username}]`).click();

    cy.get("[data-test=activity-list-item]").should("have.length", 0);
    cy.get("[data-test=form-input-distance]").type("1");
    cy.get("[data-test=form-btn-submit]").click();
    cy.get("[data-test=activity-list-item]").should("have.length", 1);

    cy.get("[data-test=brand]").click();
    cy.get("[data-test=leaderboard-list]").should("exist");
    cy.get(`[data-test=leaderboard-item-${username}]`)
      .should("exist")
      .contains("5 points");
  });

  it("When activity is updated, the user's score is updated on leaderboard", () => {
    cy.visit("/");
    cy.get("[data-test=leaderboard-list]").should("exist");
    cy.get(`[data-test=leaderboard-item-${username}]`).should("exist");

    cy.get("[data-test=nav-athletes-menu]").click();
    cy.get(`[data-test=nav-athletes-item-${username}]`).click();

    cy.get("[data-test=activity-list-item-edit")
      .eq(0)
      .click();
    cy.get("[data-test=form-input-distance]")
      .clear()
      .type("2");
    cy.get("[data-test=form-btn-submit]").click();
    cy.get("[data-test=brand]").click();

    cy.get("[data-test=leaderboard-list]").should("exist");
    cy.get(`[data-test=leaderboard-item-${username}]`)
      .should("exist")
      .contains("10 points");
  });

  it("When added additional activity, user's score is updated on leaderboard", () => {
    cy.visit("/");
    cy.get("[data-test=leaderboard-list]").should("exist");
    cy.get(`[data-test=leaderboard-item-${username}]`)
      .should("exist")
      .contains("10 points");

    cy.get("[data-test=nav-athletes-menu]").click();
    cy.get(`[data-test=nav-athletes-item-${username}]`).click();
    cy.get("[data-test=form-input-distance]").type("2");

    cy.get("[data-test=activity-list-item]").should("have.length", 1);
    cy.get("[data-test=form-btn-submit]").click();
    cy.get("[data-test=activity-list-item]").should("have.length", 2);

    cy.get("[data-test=brand]").click();
    cy.get("[data-test=leaderboard-list]").should("exist");
    cy.get(`[data-test=leaderboard-item-${username}]`)
      .should("exist")
      .contains("20 points");
  });

  it("When activity is deleted, the user's score is updated on leaderboard", () => {
    cy.visit("/");
    cy.get("[data-test=leaderboard-list]").should("exist");
    cy.get(`[data-test=leaderboard-item-${username}]`)
      .should("exist")
      .contains("20 points");

    cy.get("[data-test=nav-athletes-menu]").click();
    cy.get(`[data-test=nav-athletes-item-${username}]`).click();

    cy.get("[data-test=activity-list-item]").should("have.length", 2);
    cy.get("[data-test=activity-list-item-delete")
      .eq(0)
      .click();
    cy.get("[data-test=activity-list-item]").should("have.length", 1);
    cy.get("[data-test=brand]").click();

    cy.get("[data-test=leaderboard-list]").should("exist");
    cy.get(`[data-test=leaderboard-item-${username}]`)
      .should("exist")
      .contains("10 points");
  });

  it("When last activity is deleted, the user is removed from leaderboard", () => {
    cy.visit("/");
    cy.get("[data-test=leaderboard-list]").should("exist");
    cy.get(`[data-test=leaderboard-item-${username}]`)
      .should("exist")
      .contains("10 points");

    cy.get("[data-test=nav-athletes-menu]").click();
    cy.get(`[data-test=nav-athletes-item-${username}]`).click();

    cy.get("[data-test=activity-list-item]").should("have.length", 1);
    cy.get("[data-test=activity-list-item-delete")
      .eq(0)
      .click();
    cy.get("[data-test=activity-list-item]").should("have.length", 0);
    cy.get("[data-test=brand]").click();

    cy.get("[data-test=leaderboard-list]").should("exist");
    cy.get(`[data-test=leaderboard-item-${username}]`).should("not.exist");
  });
});
