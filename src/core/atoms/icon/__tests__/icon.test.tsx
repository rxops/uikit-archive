/**
 * Icon Component Tests
 * Tests for the core Icon atom component with healthcare-specific features
 * Using proven test helper pattern from Button, Input, and Text components
 */

import { describe, it, expect } from 'vitest';
import { renderComponent } from '../../../../../__tests__/setup/test-helpers';
import { Icon } from '../index';

describe('Icon Component', () => {
  
  describe('Basic Rendering', () => {
    it('should render icon with default props', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { name: 'heart' },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.tagName.toLowerCase()).toBe('svg');
        expect(icon?.getAttribute('role')).toBe('img');
        expect(icon?.className).toContain('icon');
      } finally {
        cleanup();
      }
    });

    it('should render icon with custom size', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { name: 'user', size: 'lg' },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.className).toMatch(/lg|large|icon-lg/);
      } finally {
        cleanup();
      }
    });

    it('should render icon with custom class', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { name: 'alert', class: 'custom-icon' },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.className).toContain('custom-icon');
      } finally {
        cleanup();
      }
    });
  });

  describe('Icon Sizes', () => {
    it('should render small icon', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { name: 'check', size: 'sm' },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.className).toMatch(/sm|small|icon-sm/);
        expect(icon?.getAttribute('width')).toBe('16');
        expect(icon?.getAttribute('height')).toBe('16');
      } finally {
        cleanup();
      }
    });

    it('should render medium icon (default)', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { name: 'settings', size: 'md' },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.className).toMatch(/md|medium|icon-md/);
        expect(icon?.getAttribute('width')).toBe('24');
        expect(icon?.getAttribute('height')).toBe('24');
      } finally {
        cleanup();
      }
    });

    it('should render large icon', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { name: 'warning', size: 'lg' },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.className).toMatch(/lg|large|icon-lg/);
        expect(icon?.getAttribute('width')).toBe('32');
        expect(icon?.getAttribute('height')).toBe('32');
      } finally {
        cleanup();
      }
    });
  });

  describe('Healthcare-Specific Icons', () => {
    it('should render medical icon with healthcare classes', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { 
          name: 'heart-rate',
          medical: true,
          iconContext: 'vital-signs'
        },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.className).toMatch(/medical|vital-signs|healthcare/);
      } finally {
        cleanup();
      }
    });

    it('should render emergency icon', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { 
          name: 'alert-triangle',
          emergency: true,
          size: 'lg',
          color: 'error'
        },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.className).toMatch(/emergency|error|lg/);
      } finally {
        cleanup();
      }
    });

    it('should render medication icon', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { 
          name: 'pill',
          iconContext: 'medication',
          size: 'md'
        },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.className).toMatch(/medication|pill/);
      } finally {
        cleanup();
      }
    });
  });

  describe('Icon Colors', () => {
    it('should render primary color icon', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { name: 'info', color: 'primary' },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.className).toMatch(/primary|text-primary/);
      } finally {
        cleanup();
      }
    });

    it('should render success color icon', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { name: 'check-circle', color: 'success' },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.className).toMatch(/success|text-success|text-green/);
      } finally {
        cleanup();
      }
    });

    it('should render error color icon', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { name: 'x-circle', color: 'error' },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.className).toMatch(/error|text-error|text-red/);
      } finally {
        cleanup();
      }
    });
  });

  describe('Accessibility Compliance', () => {
    it('should render with aria-label', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { 
          name: 'user',
          'aria-label': 'Patient profile icon'
        },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.getAttribute('aria-label')).toBe('Patient profile icon');
        expect(icon?.getAttribute('role')).toBe('img');
      } finally {
        cleanup();
      }
    });

    it('should render with title for tooltips', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { 
          name: 'help',
          title: 'Help information'
        },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.getAttribute('title')).toBe('Help information');
      } finally {
        cleanup();
      }
    });

    it('should support decorative icons', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { 
          name: 'star',
          decorative: true
        },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.getAttribute('aria-hidden')).toBe('true');
      } finally {
        cleanup();
      }
    });
  });

  describe('Custom Dimensions', () => {
    it('should render with custom width and height', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { 
          name: 'custom',
          width: 48,
          height: 48
        },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.getAttribute('width')).toBe('48');
        expect(icon?.getAttribute('height')).toBe('48');
      } finally {
        cleanup();
      }
    });

    it('should handle square dimensions', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { 
          name: 'square',
          size: 'custom',
          width: 64,
          height: 64
        },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.getAttribute('width')).toBe('64');
        expect(icon?.getAttribute('height')).toBe('64');
      } finally {
        cleanup();
      }
    });
  });

  describe('Performance and Integration', () => {
    it('should render efficiently', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { name: 'performance-test' },
        'icon'
      );
      
      try {
        const startTime = performance.now();
        const icon = getByTestId('icon-test');
        const endTime = performance.now();
        
        expect(icon).toBeTruthy();
        expect(endTime - startTime).toBeLessThan(50); // Should be very fast
      } finally {
        cleanup();
      }
    });

    it('should handle complex healthcare props', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Icon, 
        { 
          name: 'heart-monitor',
          medical: true,
          emergency: true,
          iconContext: 'vital-signs',
          color: 'error',
          size: 'lg',
          'aria-label': 'Critical heart rate monitor alert',
          role: 'img'
        },
        'icon'
      );
      
      try {
        const icon = getByTestId('icon-test');
        expect(icon).toBeTruthy();
        expect(icon?.getAttribute('aria-label')).toBe('Critical heart rate monitor alert');
        expect(icon?.getAttribute('role')).toBe('img');
        expect(icon?.className).toMatch(/medical|emergency|vital-signs|error|lg/);
      } finally {
        cleanup();
      }
    });
  });
});
