import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";

describe("Next.js production configuration", () => {
  it("keeps server routes enabled and uses image optimization", () => {
    expect(nextConfig.output).not.toBe("export");
    expect(nextConfig.basePath).toBeUndefined();
    expect(nextConfig.assetPrefix).toBeUndefined();
    expect(nextConfig.images?.unoptimized).not.toBe(true);
  });
});
