import faker from "faker";

describe("Activity tests", () => {

  const apiUrl = Cypress.config("apiUrl");
  let name;
  let username;

  before(() => {

    name = faker.name.firstName();
    username = name.toLowerCase();

    const body = {
      operationName: "AddUser",
      query: `mutation AddUser($input: AddUserInput!) {
        addUser(input: $input) {
          user {
            username
          }
        }
      }`,
      variables: {
        input: {
          name,
          username
        }
      }
    };

    cy.request(
      "POST", 
      apiUrl, 
      body
    ).then(({ body }) => {
      expect(body).to.have.property("data");
      expect(body).not.to.have.property("errors");
    })
  });

  after(() => {
    const body = {
      operationName: "RemoveUser",
      query: `mutation RemoveUser($input: RemoveUserInput!) {
        removeUser(input: $input) {
          user {
            username
          }
        }
      }`,
      variables: {
        input: {
          username
        }
      }
    };

    cy.request(
      "POST", 
      apiUrl, 
      body
      ).then(({ body }) => {
        cy.log("my msg", body);
        expect(body).to.have.property("data");
        expect(body).not.to.have.property("errors");
      })
    });

  it("Can add an activity", () => {
    cy.visit(`/${username}`);

    cy.get("[data-test=form-input-discipline]").select("5cf37805ff40523bc45ec250");
    // cy.get("[data-test=form-input-discipline]").select("swim");    
    cy.get("[data-test=form-input-distance]").type("3");
    cy.get(".rdt > .form-control").clear().type("1/1-2019");

    cy.get("[data-test=form-output-score]").should("have.value", "75");


    cy.get("[data-test=activity-list-item]").should("have.length", 0);
    cy.get("[data-test=form-btn-submit]").click();
    cy.get("[data-test=activity-list-item]").should("have.length", 1);
  });
});