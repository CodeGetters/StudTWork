/*
 * @Description:
 * @Author: CodeGetters
 * @version:
 * @Date: 2023-06-23 21:44:59
 * @LastEditors: CodeGetters
 * @LastEditTime: 2023-06-28 16:42:15
 */
import { describe, expect, it, test } from "vitest";

import HelloWorld from "../src/components/HelloWorld.vue";

describe("tests", () => {
  it("should works", () => {
    expect(1 + 1).toEqual(2);
  });
});

describe("test", () => {
  it("1+1", () => {
    expect(1 + 1).toBe(2);
  });
});

test("Hello", () => {
  console.log(HelloWorld);
});
