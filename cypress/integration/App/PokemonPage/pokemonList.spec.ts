/**
 * Created by andreaskarantzas on 31.12.20
 */
context("PokemonPage", () => {
  before(() => {
    cy.visit("/");
    // wait for the data to be loaded
    cy.wait(3000);
    // find on pokemon number 1: Bulbasaur
    cy.get("#bulbasaur").should("be.visible");
    // click on Bulbasaur
    cy.get("#bulbasaur").click();
  });

  it("the title should be Bulbasaur", () => {
    // wait for the data to be loaded
    cy.wait(3000);
    cy.get("#page_title_navigation").contains("Bulbasaur");
  });

  it("the back button should be visible", () => {
    cy.get("#back_arrow_icon").should("be.visible");
  });

  it("press to add to the bag", () => {
    // wait for the data to be loaded
    cy.wait(3000);
    // check if item is in bag
    cy.get("#not_added_in_bag").should("be.visible");
    // click on button
    cy.get("#not_added_in_bag").click();
    cy.wait(1000);
    // check if button changes
    cy.get("#added_in_bag").should("be.visible");
  });
});
