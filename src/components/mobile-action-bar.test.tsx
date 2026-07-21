import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MobileActionBar } from "./mobile-action-bar";

let observerCallback: IntersectionObserverCallback;

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(() => []);
  unobserve = vi.fn();

  constructor(callback: IntersectionObserverCallback) {
    observerCallback = callback;
  }
}

describe("MobileActionBar", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  it("stays out of the way on the Hero and appears after it", () => {
    render(
      <>
        <section id="hero" />
        <MobileActionBar onEnroll={vi.fn()} />
      </>,
    );

    const bar = screen.getByTestId("mobile-action-bar");
    expect(bar).toHaveAttribute("data-visible", "false");

    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(bar).toHaveAttribute("data-visible", "false");

    act(() => {
      observerCallback(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });
    expect(bar).toHaveAttribute("data-visible", "true");
  });
});
