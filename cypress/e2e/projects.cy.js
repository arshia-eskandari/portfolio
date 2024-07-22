describe("Skills Section Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#projects");
  });

  it("Ensures that project titles and details are not empty", () => {
    cy.viewport(1200, 800);
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

  it("Allows navigation through next and previous buttons", () => {
    cy.viewport(1200, 800);
    cy.get("#projects #project-1 #media-index").should("contain", "1");

    cy.get("#projects #project-1 .right-button").click();
    cy.get("#projects #project-1 #media-index").should("contain", "2");

    cy.get("#projects #project-1 .left-button").click();
    cy.get("#projects #project-1 #media-index").should("contain", "1");
  });

  it("Loops correctly from first to last item and back", () => {
    cy.viewport(1200, 800);
    cy.get("#projects #project-1 #media-index").should("contain", "1");

    cy.get("#projects #project-1 .left-button").click();
    cy.get("#projects #project-1 #media-index").should("contain", "6");

    cy.get("#projects #project-1 .right-button").click();
    cy.get("#projects #project-1 #media-index").should("contain", "1");
  });

  it("Swipes correctly", () => {
    cy.viewport("iphone-6");

    cy.get("#projects #project-1 .media-carousel")
      .scrollIntoView()
      .should("be.visible")
      .wait(500)
      .trigger("mousedown", { which: 1 })
      .trigger("mousemove", "right")
      .trigger("mousemove", "left")
      .wait(0)
      .trigger("mouseup");

    cy.get("#projects #project-1 #media-index").should("contain", "2");
  });
});
