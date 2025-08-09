
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
  }
  
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
  root = null;
  rootMargin = '';
  thresholds = [0];

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();
