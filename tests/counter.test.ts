import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;


describe("get-count", () => {
  it("ensures simnet is well initalised", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("should return u0 for principals that never called count-up before", () => {
    const getCountResult = simnet.callReadOnlyFn("counter", "get-count", [Cl.principal(address1)], address1);
    console.log(Cl.prettyPrint(getCountResult.result));
    expect(getCountResult.result).toEqual(Cl.uint(0));
  })

  it("should return u1 for a principal that has called count-up one time", () => {
    simnet.callPublicFn("counter", "count-up", [], address1);
    const getCountResult = simnet.callReadOnlyFn("counter", "get-count", [Cl.principal(address1)], address1);
    console.log(Cl.prettyPrint(getCountResult.result));
    expect(getCountResult.result).toEqual(Cl.uint(1));
  })

});