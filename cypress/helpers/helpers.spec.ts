/**
 * Created by andreaskarantzas on 01.01.21.
 */
export const select_first_pokemon = () => {
  cy.visit("/");
  // wait for the data to be loaded
  cy.wait(3000);
  // find on pokemon number 1: Bulbasaur
  cy.get("#bulbasaur").should("be.visible");
  // click on Bulbasaur
  cy.get("#bulbasaur").click();
};

export const add_pokemon_to_bag = () => {
  // check if item is in bag
  cy.get("#not_added_in_bag").should("be.visible");
  // click on button
  cy.get("#not_added_in_bag").click();
  cy.wait(1000);
};

export const navigate_to_my_bag = () => {
  // bag fab button should be visible
  cy.get("#fab_bag").should("be.visible");
  // click fab button
  cy.get("#fab_bag").click();
  cy.wait(1000);
  // check the current page is the bagPage
  cy.location("pathname").should("include", "/my-bag");
};

export const type_in_search_box = (query: string) => {
  cy.get("#autocomplete-box").clear();
  // enter name that does not exist and check
  cy.get("#autocomplete-box").type(query).should("have.value", query);
};
