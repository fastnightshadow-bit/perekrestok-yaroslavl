import { describe, expect, it } from "vitest";

import { trainingCars } from "@/data/cars";

describe("fleet images", () => {
  it("uses the four supplied real vehicle photographs", () => {
    expect(trainingCars.map(({ model, image }) => ({ model, image }))).toEqual([
      {
        model: "Volkswagen Polo",
        image: "/images/fleet/volkswagen-polo.jpg",
      },
      {
        model: "Renault Logan II",
        image: "/images/fleet/renault-logan-ii.jpg",
      },
      {
        model: "Lada Granta — серебристая",
        image: "/images/fleet/lada-granta-silver.jpg",
      },
      {
        model: "Lada Granta — графитовая",
        image: "/images/fleet/lada-granta-dark.jpg",
      },
    ]);
  });
});
