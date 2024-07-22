describe("Skills Section Tests", () => {
  beforeEach(() => {
    cy.visit("/#skills");
  });

  it("Successfully loads skills content", () => {
    cy.get("#skills h2").contains("Skills");
    cy.get("#skills input").should("exist");
  });
});
