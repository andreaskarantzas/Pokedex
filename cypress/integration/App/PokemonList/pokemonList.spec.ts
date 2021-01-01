/**
 * Created by andreaskarantzas on 31.12.20
 */
import {
  navigate_to_my_bag,
  type_in_search_box,
} from "../../../helpers/helpers.spec";

const pokemonNameThatDoesNotExist = "qwerty";

context("PokemonList", () => {
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
    type_in_search_box(pokemonNameThatDoesNotExist);
    // check if error message appeared
    cy.get("#search_error_text").should("be.visible");
    // check if error message appeared
    cy.get("#search_error_text").contains(pokemonNameThatDoesNotExist);
  });

  it("navigate successfully to bagPage", () => {
    // wait for the data to be loaded
    cy.wait(3000);
    navigate_to_my_bag();
  });
});
