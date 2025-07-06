/**
 * Text Component Tests
 * Tests for the core Text atom component with healthcare-specific features
 * Using proven test helper pattern from Button and Input components
 */

import { describe, it, expect } from 'vitest';
import { renderComponent } from '../../../../../__tests__/setup/test-helpers';
import { Text } from '../text';

describe('Text Component', () => {
  
  describe('Basic Rendering', () => {
    it('should render text with default props', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { children: 'Default text content' },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.tagName.toLowerCase()).toBe('p'); // default tag
        expect(text?.textContent).toContain('Default text content');
        expect(text?.className).toContain('text');
      } finally {
        cleanup();
      }
    });

    it('should render with custom tag', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { as: 'h1', children: 'Heading Text' },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.tagName.toLowerCase()).toBe('h1');
        expect(text?.textContent).toContain('Heading Text');
      } finally {
        cleanup();
      }
    });

    it('should render with custom class', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { class: 'custom-text', children: 'Custom styled text' },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.className).toContain('custom-text');
        expect(text?.textContent).toContain('Custom styled text');
      } finally {
        cleanup();
      }
    });
  });

  describe('Text Sizes', () => {
    it('should render small text', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { size: 'sm', children: 'Small text' },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.className).toMatch(/sm|small|text-sm/);
        expect(text?.textContent).toContain('Small text');
      } finally {
        cleanup();
      }
    });

    it('should render medium text (default)', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { size: 'md', children: 'Medium text' },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.className).toMatch(/md|medium|text-base/);
        expect(text?.textContent).toContain('Medium text');
      } finally {
        cleanup();
      }
    });

    it('should render large text', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { size: 'lg', children: 'Large text' },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.className).toMatch(/lg|large|text-lg/);
        expect(text?.textContent).toContain('Large text');
      } finally {
        cleanup();
      }
    });
  });

  describe('Text Colors', () => {
    it('should render primary color text', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { color: 'primary', children: 'Primary colored text' },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.className).toMatch(/primary|text-primary/);
        expect(text?.textContent).toContain('Primary colored text');
      } finally {
        cleanup();
      }
    });

    it('should render success color text', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { color: 'success', children: 'Success message' },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.className).toMatch(/success|text-success|text-green/);
        expect(text?.textContent).toContain('Success message');
      } finally {
        cleanup();
      }
    });

    it('should render error color text', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { color: 'error', children: 'Error message' },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.className).toMatch(/error|text-error|text-red/);
        expect(text?.textContent).toContain('Error message');
      } finally {
        cleanup();
      }
    });
  });

  describe('Healthcare-Specific Features', () => {
    it('should render medical text with healthcare classes', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { 
          medical: true,
          textContext: 'patient-info',
          children: 'Patient medical information'
        },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.className).toMatch(/medical|patient-info|healthcare/);
        expect(text?.textContent).toContain('Patient medical information');
      } finally {
        cleanup();
      }
    });

    it('should render vital signs text', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { 
          textContext: 'vital-signs',
          size: 'lg',
          children: 'Blood Pressure: 120/80'
        },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.className).toMatch(/vital-signs|lg|large/);
        expect(text?.textContent).toContain('Blood Pressure: 120/80');
      } finally {
        cleanup();
      }
    });

    it('should render emergency alert text', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { 
          emergency: true,
          color: 'error',
          size: 'lg',
          children: 'EMERGENCY: Critical vital signs detected'
        },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.className).toMatch(/emergency|error|lg/);
        expect(text?.textContent).toContain('EMERGENCY: Critical vital signs detected');
      } finally {
        cleanup();
      }
    });
  });

  describe('Semantic HTML Elements', () => {
    it('should render as heading elements', async () => {
      const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      
      for (const heading of headings) {
        const { getByTestId, cleanup } = await renderComponent(
          Text, 
          { as: heading, children: `${heading.toUpperCase()} Heading` },
          'text'
        );
        
        try {
          const text = getByTestId('text-test');
          expect(text).toBeTruthy();
          expect(text?.tagName.toLowerCase()).toBe(heading);
          expect(text?.textContent).toContain(`${heading.toUpperCase()} Heading`);
        } finally {
          cleanup();
        }
      }
    });

    it('should render as span element', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { as: 'span', children: 'Inline text' },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.tagName.toLowerCase()).toBe('span');
        expect(text?.textContent).toContain('Inline text');
      } finally {
        cleanup();
      }
    });

    it('should render as label element', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { as: 'label', htmlFor: 'input-field', children: 'Form Label' },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.tagName.toLowerCase()).toBe('label');
        expect(text?.getAttribute('for')).toBe('input-field');
        expect(text?.textContent).toContain('Form Label');
      } finally {
        cleanup();
      }
    });
  });

  describe('Accessibility Compliance', () => {
    it('should render with aria-label', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { 
          'aria-label': 'Patient status indicator',
          children: 'Status: Active'
        },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.getAttribute('aria-label')).toBe('Patient status indicator');
        expect(text?.textContent).toContain('Status: Active');
      } finally {
        cleanup();
      }
    });

    it('should render with role attribute', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { 
          role: 'status',
          children: 'Operation completed successfully'
        },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.getAttribute('role')).toBe('status');
        expect(text?.textContent).toContain('Operation completed successfully');
      } finally {
        cleanup();
      }
    });

    it('should support screen reader announcements', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { 
          'aria-live': 'polite',
          role: 'status',
          children: 'Data saved successfully'
        },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.getAttribute('aria-live')).toBe('polite');
        expect(text?.getAttribute('role')).toBe('status');
      } finally {
        cleanup();
      }
    });
  });

  describe('Performance and Integration', () => {
    it('should render efficiently', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { children: 'Performance test text' },
        'text'
      );
      
      try {
        const startTime = performance.now();
        const text = getByTestId('text-test');
        const endTime = performance.now();
        
        expect(text).toBeTruthy();
        expect(endTime - startTime).toBeLessThan(50); // Should be very fast
        expect(text?.textContent).toContain('Performance test text');
      } finally {
        cleanup();
      }
    });

    it('should handle complex healthcare props', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Text, 
        { 
          medical: true,
          emergency: true,
          textContext: 'vital-signs',
          color: 'error',
          size: 'lg',
          as: 'div',
          role: 'alert',
          'aria-live': 'assertive',
          children: 'CRITICAL: Heart rate exceeds safe limits'
        },
        'text'
      );
      
      try {
        const text = getByTestId('text-test');
        expect(text).toBeTruthy();
        expect(text?.tagName.toLowerCase()).toBe('div');
        expect(text?.getAttribute('role')).toBe('alert');
        expect(text?.getAttribute('aria-live')).toBe('assertive');
        expect(text?.className).toMatch(/medical|emergency|vital-signs|error|lg/);
        expect(text?.textContent).toContain('CRITICAL: Heart rate exceeds safe limits');
      } finally {
        cleanup();
      }
    });
  });
});
