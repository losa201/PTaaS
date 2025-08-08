import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProgressiveLeadCapture } from '../ProgressiveLeadCapture';

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    input: ({ ...props }: any) => <input {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ProgressiveLeadCapture', () => {
  beforeEach(() => {
    // Mock console.log to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the initial step correctly', () => {
    render(<ProgressiveLeadCapture />);
    
    expect(screen.getByText('Get Your Free Security Assessment')).toBeInTheDocument();
    expect(screen.getByText('What type of organization are you?')).toBeInTheDocument();
    expect(screen.getByText('Financial Services')).toBeInTheDocument();
    expect(screen.getByText('Healthcare')).toBeInTheDocument();
    expect(screen.getByText('Manufacturing')).toBeInTheDocument();
  });

  it('progresses to step 2 when industry is selected', async () => {
    render(<ProgressiveLeadCapture />);
    const user = userEvent.setup();
    
    const financialButton = screen.getByText('Financial Services');
    await user.click(financialButton);
    
    await waitFor(() => {
      expect(screen.getByText('Company Size')).toBeInTheDocument();
    });
  });

  it('validates email format in contact step', async () => {
    render(<ProgressiveLeadCapture />);
    const user = userEvent.setup();
    
    // Progress through steps
    await user.click(screen.getByText('Financial Services'));
    
    await waitFor(() => {
      expect(screen.getByText('Company Size')).toBeInTheDocument();
    });
    
    await user.click(screen.getByText('500-2,000 employees'));
    
    await waitFor(() => {
      expect(screen.getByText('Current Security Challenges')).toBeInTheDocument();
    });
    
    await user.click(screen.getByText('Compliance Requirements'));
    
    await waitFor(() => {
      expect(screen.getByText('Contact Information')).toBeInTheDocument();
    });
    
    // Try to submit with invalid email
    const emailInput = screen.getByPlaceholderText('john.doe@company.com');
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByText('Get My Assessment');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('completes the full flow successfully', async () => {
    render(<ProgressiveLeadCapture />);
    const user = userEvent.setup();
    
    // Step 1: Select industry
    await user.click(screen.getByText('Financial Services'));
    
    // Step 2: Select company size
    await waitFor(() => {
      expect(screen.getByText('Company Size')).toBeInTheDocument();
    });
    await user.click(screen.getByText('500-2,000 employees'));
    
    // Step 3: Select security challenges
    await waitFor(() => {
      expect(screen.getByText('Current Security Challenges')).toBeInTheDocument();
    });
    await user.click(screen.getByText('Compliance Requirements'));
    
    // Step 4: Fill contact information
    await waitFor(() => {
      expect(screen.getByText('Contact Information')).toBeInTheDocument();
    });
    
    const nameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('john.doe@company.com');
    const companyInput = screen.getByPlaceholderText('Acme Corp');
    
    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(companyInput, 'Test Company');
    
    const submitButton = screen.getByText('Get My Assessment');
    await user.click(submitButton);
    
    // Should show success message
    await waitFor(() => {
      expect(screen.getByText('Thank You!')).toBeInTheDocument();
      expect(screen.getByText('We\'ll send your personalized security assessment report within 24 hours.')).toBeInTheDocument();
    });
  });

  it('calculates and displays risk score correctly', async () => {
    render(<ProgressiveLeadCapture />);
    const user = userEvent.setup();
    
    // Progress through to get risk calculation
    await user.click(screen.getByText('Healthcare')); // Higher risk industry
    
    await waitFor(() => {
      expect(screen.getByText('Company Size')).toBeInTheDocument();
    });
    await user.click(screen.getByText('2,000-10,000 employees')); // Larger company = higher risk
    
    await waitFor(() => {
      expect(screen.getByText('Current Security Challenges')).toBeInTheDocument();
    });
    await user.click(screen.getByText('Advanced Persistent Threats')); // High risk challenge
    
    await waitFor(() => {
      expect(screen.getByText('Contact Information')).toBeInTheDocument();
    });
    
    // Complete the form to see risk score
    const nameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('john.doe@company.com');
    const companyInput = screen.getByPlaceholderText('Acme Corp');
    
    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(companyInput, 'Test Company');
    
    const submitButton = screen.getByText('Get My Assessment');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Your estimated security risk score:/)).toBeInTheDocument();
    });
  });
});