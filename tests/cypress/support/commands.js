import faker from "faker";

Cypress.Commands.add("addUser", () => {
  const apiUrl = Cypress.config("apiUrl");
  const name = faker.name.firstName();
  const username = name.toLowerCase();

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

  cy.request({
    url: apiUrl, 
    method: "POST", 
    body
  }).its("body.data.addUser.user.username");
});

Cypress.Commands.add("removeUser", (username) => {
  const apiUrl = Cypress.config("apiUrl");

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
    expect(body).to.have.property("data");
    expect(body).not.to.have.property("errors");
  });
});
