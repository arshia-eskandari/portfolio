describe("Contact Section Tests", () => {
  beforeEach(() => {
    cy.visit("/#contact");
  });
  it("Fills and submits the form successfully", () => {
    cy.get('#contact input[name="firstName"]').type("Arshia");
    cy.get('#contact input[name="lastName"]').type("Eskandari");
    cy.get('#contact input[name="email"]').type("arshia@email.com");
    cy.get('#contact textarea[name="message"]').type(
      "This is from cypress e2e testing to test the contact form functionality.",
    );
    cy.get("#contact button").click();
    cy.get("#contact .success-alert").should("be.visible");
  });

  it("Fills and submits the form unsuccessfully", () => {
    cy.get('#contact input[name="firstName"]')
      .type("Ar")
      .next(".input-error-message")
      .should("be.visible");
    cy.get('#contact input[name="lastName"]')
      .type("Esk")
      .next(".input-error-message")
      .should("be.visible");
    cy.get('#contact input[name="email"]')
      .type("arshia@email.c")
      .next(".input-error-message")
      .should("be.visible");
    cy.get('#contact textarea[name="message"]')
      .type("This is from cypress e2e testing.")
      .next(".input-error-message")
      .should("be.visible");
    cy.get("#contact button").click();
    cy.get("#contact .error-alert").should("be.visible");
  });
});
