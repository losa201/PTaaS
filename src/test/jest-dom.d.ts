
/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeChecked(): R;
      toHaveValue(value: string | number): R;
      toHaveFocus(): R;
      toBeValid(): R;
      toBeInvalid(): R;
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R;
    }
  }
}
