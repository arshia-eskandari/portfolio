describe("Experiences Section Tests", () => {
  beforeEach(() => {
    cy.visit("/#experiences");
  });
  it("Opens and closes the accordion correctly", () => {
    cy.get("#experiences>div>div:nth-child(1)>div")
      .click()
      .should("have.attr", "data-state", "open");
    cy.get("#experiences>div>div:nth-child(1)>div>div")
      .should("be.visible")
      .should("have.attr", "data-state", "open");

    cy.wait(300);

    cy.get("#experiences>div>div:nth-child(1)>div>h3")
      .click()
      .should("have.attr", "data-state", "closed");
    cy.get("#experiences>div>div:nth-child(1)>div>div")
      .should("be.hidden")
      .should("have.attr", "data-state", "closed");
  });
});
