describe("Skills Section Tests", () => {
  beforeEach(() => {
    cy.viewport(1200, 800);
    cy.visit("http://localhost:3000/#projects");
  });

  it("ensures that project titles and details are not empty", () => {
    cy.get("h3.font-bold").each(($el) => {
      expect($el.text().trim()).not.to.be.empty;
    });

    cy.get("h4")
      .contains("Objective")
      .next("p")
      .each(($el) => {
        expect($el.text().trim()).not.to.be.empty;
      });

    cy.get("h4")
      .contains("Key Results")
      .next("ul")
      .children("li")
      .each(($el) => {
        expect($el.text().trim()).not.to.be.empty;
      });

    cy.get("h4")
      .contains("Technologies Used")
      .next()
      .find("span")
      .each(($el) => {
        expect($el.text().trim()).not.to.be.empty;
      });

    cy.get("h4")
      .contains("Links")
      .next("ul")
      .find("a")
      .each(($a) => {
        expect($a.text().trim()).not.to.be.empty;
        expect($a).to.have.attr("href").and.not.be.empty;
      });
  });

  it("allows navigation through next and previous buttons", () => {
    cy.get("#projects #project-1 #media-index").should("contain", "1");

    cy.get("#projects #project-1 .right-button").click();
    cy.get("#projects #project-1 #media-index").should("contain", "2");

    cy.get("#projects #project-1 .left-button").click();
    cy.get("#projects #project-1 #media-index").should("contain", "1");
  });

  it("loops correctly from first to last item and back", () => {
    cy.get("#projects #project-1 #media-index").should("contain", "1");

    cy.get("#projects #project-1 .left-button").click();
    cy.get("#projects #project-1 #media-index").should("contain", "6");

    cy.get("#projects #project-1 .right-button").click();
    cy.get("#projects #project-1 #media-index").should("contain", "1");
  });
});
