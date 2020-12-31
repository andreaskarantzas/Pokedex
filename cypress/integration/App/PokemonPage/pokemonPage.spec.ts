/**
 * Created by andreaskarantzas on 31.12.20
 */
const pokemonNameThatDoesNotExist = "qwerty";

context("PokemonPage", () => {
  before(() => {
    cy.visit("/");
  });

  it("the title should be Pokédex", () => {
    cy.get("#page_title_navigation").contains("Pokédex");
  });

  it("the back button should not be visible", () => {
    cy.get("#back_arrow_icon").should("not.be.visible");
  });

  it("the error text should appear when param is pokemonNameThatDoesNotExist", function () {
    // wait for the data to be loaded
    cy.wait(3000);
    // clear any text from the search bar
    cy.get("#autocomplete-box").clear();
    // enter name that does not exist and check
    cy.get("#autocomplete-box")
      .type(pokemonNameThatDoesNotExist)
      .should("have.value", pokemonNameThatDoesNotExist);
    // check if error message appeared
    cy.get("#search_error_text").should("be.visible");
    // check if error message appeared
    cy.get("#search_error_text").contains(pokemonNameThatDoesNotExist);
  });

  it("navigate successfully to bagPage", function () {
    // wait for the data to be loaded
    cy.wait(3000);
    // bag fab button should be visible
    cy.get("#fab_bag").should("be.visible");
    // click fab button
    cy.get("#fab_bag").click();
    cy.wait(1000);
    // check the current page is the bagPage
    cy.location("pathname").should("include", "/my-bag");
  });
});
