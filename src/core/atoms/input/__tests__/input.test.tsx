/**
 * Input Component Tests  
 * Tests for the core Input atom component with healthcare-specific features
 * Using proven test helper pattern from Button component
 */

import { describe, it, expect } from 'vitest';
import { renderComponent } from '../../../../../__tests__/setup/test-helpers';
import { Input } from '../input';

describe('Input Component', () => {
  
  describe('Basic Rendering', () => {
    it('should render input with default props', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { placeholder: 'Enter text' },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.tagName.toLowerCase()).toBe('input');
        expect(input?.getAttribute('type')).toBe('text');
        expect(input?.getAttribute('placeholder')).toBe('Enter text');
      } finally {
        cleanup();
      }
    });

    it('should render input with label', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { label: 'Patient Name', placeholder: 'John Doe' },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('placeholder')).toBe('John Doe');
      } finally {
        cleanup();
      }
    });

    it('should render input with custom class', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { class: 'custom-input', placeholder: 'Custom styled' },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.className).toContain('custom-input');
      } finally {
        cleanup();
      }
    });
  });

  describe('Input Types', () => {
    it('should render email input', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { type: 'email', placeholder: 'patient@hospital.com' },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('type')).toBe('email');
        expect(input?.getAttribute('placeholder')).toBe('patient@hospital.com');
      } finally {
        cleanup();
      }
    });

    it('should render password input', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { type: 'password', placeholder: 'Enter password' },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('type')).toBe('password');
      } finally {
        cleanup();
      }
    });

    it('should render number input', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { type: 'number', placeholder: '120', min: '80', max: '200' },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('type')).toBe('number');
        expect(input?.getAttribute('min')).toBe('80');
        expect(input?.getAttribute('max')).toBe('200');
      } finally {
        cleanup();
      }
    });
  });

  describe('Input States', () => {
    it('should render disabled input', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { disabled: true, placeholder: 'Disabled input', value: 'Cannot edit' },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.hasAttribute('disabled')).toBe(true);
        expect(input?.getAttribute('value')).toBe('Cannot edit');
      } finally {
        cleanup();
      }
    });

    it('should render required input', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { required: true, placeholder: 'Required field' },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.hasAttribute('required')).toBe(true);
      } finally {
        cleanup();
      }
    });

    it('should render input with value', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { value: 'Patient Data', placeholder: 'Enter patient info' },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('value')).toBe('Patient Data');
      } finally {
        cleanup();
      }
    });
  });

  describe('Healthcare-Specific Features', () => {
    it('should render medical input with healthcare classes', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { 
          medical: true,
          inputContext: 'patient-data',
          placeholder: 'Patient ID' 
        },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.className).toMatch(/medical|patient-data|healthcare/);
      } finally {
        cleanup();
      }
    });

    it('should render vital signs input', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { 
          inputContext: 'vital-signs',
          type: 'number',
          placeholder: '120',
          min: '60',
          max: '200'
        },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('type')).toBe('number');
        expect(input?.getAttribute('min')).toBe('60');
        expect(input?.getAttribute('max')).toBe('200');
      } finally {
        cleanup();
      }
    });

    it('should render medication dosage input', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { 
          inputContext: 'medication-dosage',
          type: 'number',
          step: '0.1',
          placeholder: '5.0 mg'
        },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('step')).toBe('0.1');
      } finally {
        cleanup();
      }
    });
  });

  describe('Accessibility Compliance', () => {
    it('should render with aria-label', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { 
          'aria-label': 'Patient medical record number',
          placeholder: 'MRN12345'
        },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('aria-label')).toBe('Patient medical record number');
      } finally {
        cleanup();
      }
    });

    it('should render with aria-describedby', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { 
          'aria-describedby': 'helper-text',
          placeholder: 'Enter value'
        },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('aria-describedby')).toBe('helper-text');
      } finally {
        cleanup();
      }
    });

    it('should support keyboard navigation', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { 
          tabIndex: 0,
          placeholder: 'Keyboard accessible'
        },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('tabindex')).toBe('0');
      } finally {
        cleanup();
      }
    });
  });

  describe('Form Integration', () => {
    it('should render with autocomplete', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { 
          autoComplete: 'email',
          type: 'email',
          placeholder: 'patient@example.com'
        },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('autocomplete')).toBe('email');
      } finally {
        cleanup();
      }
    });

    it('should render with name attribute', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { 
          name: 'patientName',
          placeholder: 'Patient full name'
        },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('name')).toBe('patientName');
      } finally {
        cleanup();
      }
    });

    it('should render with form validation attributes', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { 
          required: true,
          minLength: 2,
          maxLength: 50,
          pattern: '[A-Za-z\\s]+',
          placeholder: 'Patient name'
        },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.hasAttribute('required')).toBe(true);
        expect(input?.getAttribute('minlength')).toBe('2');
        expect(input?.getAttribute('maxlength')).toBe('50');
        expect(input?.getAttribute('pattern')).toBe('[A-Za-z\\s]+');
      } finally {
        cleanup();
      }
    });
  });

  describe('Performance and Integration', () => {
    it('should render efficiently', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { placeholder: 'Performance test' },
        'input'
      );
      
      try {
        const startTime = performance.now();
        const input = getByTestId('input-test');
        const endTime = performance.now();
        
        expect(input).toBeTruthy();
        expect(endTime - startTime).toBeLessThan(50); // Should be very fast
      } finally {
        cleanup();
      }
    });

    it('should handle complex healthcare props', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Input, 
        { 
          medical: true,
          medicalDeviceMode: true,
          inputContext: 'patient-data',
          type: 'email',
          required: true,
          'aria-label': 'Patient primary email',
          placeholder: 'patient@hospital.com',
          autoComplete: 'email'
        },
        'input'
      );
      
      try {
        const input = getByTestId('input-test');
        expect(input).toBeTruthy();
        expect(input?.getAttribute('type')).toBe('email');
        expect(input?.hasAttribute('required')).toBe(true);
        expect(input?.getAttribute('aria-label')).toBe('Patient primary email');
      } finally {
        cleanup();
      }
    });
  });
});
