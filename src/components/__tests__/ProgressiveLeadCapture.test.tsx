/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import ProgressiveLeadCapture from '../ProgressiveLeadCapture';

describe('ProgressiveLeadCapture', () => {
  it('renders without crashing', () => {
    render(<ProgressiveLeadCapture />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeTruthy();
  });
});
