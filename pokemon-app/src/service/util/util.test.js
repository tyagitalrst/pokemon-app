import * as util from "./index";

describe("Util Function", () => {
  test("generateQueryPagination funct", () => {
    expect(util.generateQueryPagination(1, 5)).toStrictEqual([
      { limit: 5, offset: 0 },
    ]);
  });

  test("checkOwnedPokemonName funct", () => {
    let pokemonCollection = [{name: "pokemon", pokemonName: "ninja"}]
    expect(util.checkOwnedPokemonName("pokemon", "", false, [])).toStrictEqual(
      []
    );

    expect(util.checkOwnedPokemonName("pokemon", "boba", true, pokemonCollection)).toStrictEqual(
      []
    );
  });

  test("startEndNumberList funct", () => {
    expect(util.startEndNumberList(1, 10)).toStrictEqual({
      start: 1,
      end: 10,
    });
  });

  test("letterCapitalize funct", () => {
    expect(util.letterCapitalize("testing capitalize")).toBe(
      "Testing Capitalize"
    );
  });
});
