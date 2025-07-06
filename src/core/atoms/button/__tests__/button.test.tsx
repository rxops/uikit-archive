/**
 * Button Component Tests
 * Tests for the core Button atom component with healthcare-specific features
 */

import { describe, it, expect } from 'vitest';
import { renderComponent } from '../../../../../__tests__/setup/test-helpers';
import { Button } from '../button';

describe('Button Component', () => {
  
  describe('Basic Rendering', () => {
    it('should render button with default props', async () => {
      const { getByTestId, getByRole, cleanup } = await renderComponent(
        Button, 
        { children: 'Click me' },
        'button'
      );
      
      try {
        const button = getByRole('button') || getByTestId('button-test');
        expect(button).toBeTruthy();
        expect(button?.textContent).toContain('Click me');
        expect(button?.tagName.toLowerCase()).toBe('button');
        expect(button?.className).toContain('btn');
        expect(button?.className).toContain('btn-primary'); // default variant
      } finally {
        cleanup();
      }
    });

    it('should render button with custom class', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Button, 
        { class: 'custom-button', children: 'Custom Button' },
        'button'
      );
      
      try {
        const button = getByTestId('button-test');
        expect(button).toBeTruthy();
        expect(button?.className).toContain('custom-button');
        expect(button?.textContent).toContain('Custom Button');
      } finally {
        cleanup();
      }
    });

    it('should render button with aria label', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Button, 
        { 'aria-label': 'Save patient data', children: 'Save' },
        'button'
      );
      
      try {
        const button = getByTestId('button-test');
        expect(button).toBeTruthy();
        expect(button?.getAttribute('aria-label')).toBe('Save patient data');
        expect(button?.textContent).toContain('Save');
      } finally {
        cleanup();
      }
    });
  });

  describe('Button Intent (Semantic Styling)', () => {
    it('should render primary intent button', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Button, 
        { intent: 'primary', children: 'Primary Action' },
        'button'
      );
      
      try {
        const button = getByTestId('button-test');
        expect(button).toBeTruthy();
        expect(button?.textContent).toContain('Primary Action');
        expect(button?.className).toMatch(/primary|bg-blue|bg-primary/);
      } finally {
        cleanup();
      }
    });

    it('should render secondary intent button', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Button, 
        { intent: 'secondary', children: 'Secondary Action' },
        'button'
      );
      
      try {
        const button = getByTestId('button-test');
        expect(button).toBeTruthy();
        expect(button?.textContent).toContain('Secondary Action');
        expect(button?.className).toMatch(/secondary|outline|border/);
      } finally {
        cleanup();
      }
    });

    it('should render error intent button', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Button, 
        { intent: 'error', children: 'Delete Record' },
        'button'
      );
      
      try {
        const button = getByTestId('button-test');
        expect(button).toBeTruthy();
        expect(button?.textContent).toContain('Delete Record');
        expect(button?.className).toMatch(/error|destructive|bg-red/);
      } finally {
        cleanup();
      }
    });

    it('should render success intent button', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Button, 
        { intent: 'success', children: 'Confirm Treatment' },
        'button'
      );
      
      try {
        const button = getByTestId('button-test');
        expect(button).toBeTruthy();
        expect(button?.textContent).toContain('Confirm Treatment');
        expect(button?.className).toMatch(/success|bg-green/);
      } finally {
        cleanup();
      }
    });

    it('should render warning intent button', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Button, 
        { intent: 'warning', children: 'Caution Action' },
        'button'
      );
      
      try {
        const button = getByTestId('button-test');
        expect(button).toBeTruthy();
        expect(button?.textContent).toContain('Caution Action');
        expect(button?.className).toMatch(/warning|bg-yellow|bg-orange/);
      } finally {
        cleanup();
      }
    });
  });

  describe('Button States', () => {
    it('should render disabled button', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Button, 
        { disabled: true, children: 'Disabled Button' },
        'button'
      );
      
      try {
        const button = getByTestId('button-test');
        expect(button).toBeTruthy();
        expect(button?.textContent).toContain('Disabled Button');
        expect(button?.hasAttribute('disabled')).toBe(true);
      } finally {
        cleanup();
      }
    });

    it('should support different button types', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Button, 
        { type: 'submit', children: 'Submit Form' },
        'button'
      );
      
      try {
        const button = getByTestId('button-test');
        expect(button).toBeTruthy();
        expect(button?.getAttribute('type')).toBe('submit');
        expect(button?.textContent).toContain('Submit Form');
      } finally {
        cleanup();
      }
    });
  });

  describe('Accessibility Compliance', () => {
    it('should work with screen readers', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Button, 
        { 
          'aria-label': 'Primary action button for patient care',
          role: 'button',
          children: 'Patient Care Action'
        },
        'button'
      );
      
      try {
        const button = getByTestId('button-test');
        expect(button).toBeTruthy();
        expect(button?.getAttribute('aria-label')).toBe('Primary action button for patient care');
        expect(button?.getAttribute('role')).toBe('button');
        expect(button?.textContent).toContain('Patient Care Action');
      } finally {
        cleanup();
      }
    });
  });
});
