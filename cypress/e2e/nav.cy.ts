describe("Nav Tests", () => {
  const sections = ["about", "experiences", "skills", "contact"];

  beforeEach(() => {
    cy.visit("/");
  });

  it("Successfully loads nav content", () => {
    ["Projects", "Experiences", "About", "Skills", "Contact"].forEach(
      (section) => {
        cy.contains("nav a", section).should("exist");
        cy.get(`#${section.toLowerCase()}`).should("be.visible");
      },
    );
  });

  const testNavigation = (device: any = "") => {
    if (device) {
      cy.viewport(device);
    }
    if (device === "iphone-6") {
      return sections.forEach((section) => {
        cy.get(`nav>div>a[href*="#${section}"]`).click();
        cy.url().should("include", `/#${section}`);
      });
    }
    sections.forEach((section) => {
      cy.get(`nav div div a[href*="#${section}"]`).click();
      cy.url().should("include", `/#${section}`);
    });
  };

  it("Scrolls to the correct sections on medium size screens and above", () => {
    testNavigation();
  });

  it("Scrolls to correct sections on mobile screens", () => {
    testNavigation("iphone-6");
  });
});
