describe("Hero Section Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Successfully loads hero content", () => {
    cy.get("#hero h1").contains("Arshia Eskandari");
    cy.get("#hero p").contains(
      "Full-stack developer passionate about turning challenges into seamless software solutions.",
    );
    cy.contains("#hero a", "About").should("exist");
    cy.contains("#hero a", "Contact").should("exist");
  });

  it("Scrolls to the about section", () => {
    cy.get('#hero a[href*="#about"]').click();
    cy.url().should("include", "/#about");
  });

  it("Scrolls to the contact section", () => {
    cy.get('#hero a[href*="#contact"]').click();
    cy.url().should("include", "/#contact");
  });
});
