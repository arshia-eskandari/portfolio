const ABOUT_BODY =
  `I am Arshia Eskandari, a full-stack developer with a passion for crafting ` +
  `comprehensive solutions that span the entire software development lifecycle. My expertise ` +
  `is in transforming complex problems into intuitive, efficient applications. One of my ` +
  `standout projects is the Aruba Smart Map, a navigation service designed for areas with ` +
  `limited internet connectivity, demonstrating my ability to innovate under challenging ` +
  `conditions. My approach involves rigorous problem-solving and strategic planning to ensure ` +
  `functionality and user satisfaction. I am continually driven by the creativity software ` +
  `development affords, using both professional assignments and personal projects to master ` +
  `new skills and technologies. This ongoing learning process is complemented by my commitment ` +
  `to fostering a professional yet flexible work environment that promotes innovation and ` +
  `effective collaboration. In my personal time, I explore new technologies through targeted ` +
  `projects, keeping my skills sharp and continuously expanding my technical repertoire.`;

describe("About Section Tests", () => {
  beforeEach(() => {
    cy.visit("/#about");
  });

  it("Successfully loads about content", () => {
    cy.get("#about h2").contains("About");
    cy.get("#about p").contains(ABOUT_BODY);
    cy.contains("#about a", "Download Resume").should("exist");
  });
});
