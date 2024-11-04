describe("Landing Page Test", () => {
  beforeEach(() => {
    cy.visit("/user");
  });
  context("Hero Section", () => {
    it("should display the hero section", () => {
      cy.get("[data-cy=lp-hero-section]").should("be.visible");
    });

    it("should display the hero image", () => {
      cy.get("[data-cy=lp-hero-image]").should("be.visible");
    });

    it("should display title and tagline", () => {
      cy.get("[data-cy=lp-hero-section]").then(($sec) => {
        cy.wrap($sec).find("h1").should("be.visible");
      });

      cy.get("[data-cy=lp-hero-section]").then(($sec) => {
        cy.wrap($sec).find("p").should("be.visible");
      });
    });
  });
});
