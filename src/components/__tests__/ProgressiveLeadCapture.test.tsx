
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import ProgressiveLeadCapture from '../ProgressiveLeadCapture';

describe('ProgressiveLeadCapture', () => {
  it('renders without crashing', () => {
    render(<ProgressiveLeadCapture />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
