/**
 * Created by andreaskarantzas on 31.12.20
 */
import {
  add_pokemon_to_bag,
  navigate_to_my_bag,
  select_first_pokemon,
  type_in_search_box,
} from "../../../helpers/helpers.spec";

context("PokemonPage", () => {
  before(() => {
    select_first_pokemon();
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
    add_pokemon_to_bag();
    // check if button changes
    cy.get("#added_in_bag").should("be.visible");
  });

  it("check that bulbasaur is in myBag", () => {
    select_first_pokemon();
    // wait for the data to be loaded
    cy.wait(3000);
    add_pokemon_to_bag();
    navigate_to_my_bag();
    // find on pokemon number 1: Bulbasaur
    cy.get("#bulbasaur").should("be.visible");
  });

  it("check that bulb as query returns Bulbasaur", () => {
    select_first_pokemon();
    // wait for the data to be loaded
    cy.wait(3000);
    add_pokemon_to_bag();
    navigate_to_my_bag();
    type_in_search_box("bulb");
    // find on pokemon number 1: Bulbasaur
    cy.get("#bulbasaur").should("be.visible");
  });

  it("check that bulbbb as query returns error text", () => {
    select_first_pokemon();
    // wait for the data to be loaded
    cy.wait(3000);
    add_pokemon_to_bag();
    navigate_to_my_bag();
    type_in_search_box("bulbbb");
    // find on pokemon number 1: Bulbasaur
    cy.get("#bulbasaur").should("not.be.visible");
    // check if error message appeared
    cy.get("#search_error_text").should("be.visible");
    // check if error message appeared
    cy.get("#search_error_text").contains("bulbbb");
  });
});
