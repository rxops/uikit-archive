/**
 * Badge Component Tests
 * Tests for the core Badge atom component with healthcare-specific features
 * Using proven test helper pattern from Button, Input, Text, and Icon components
 */

import { describe, it, expect } from 'vitest';
import { renderComponent } from '../../../../../__tests__/setup/test-helpers';
import { Badge } from '../index';

describe('Badge Component', () => {
  
  describe('Basic Rendering', () => {
    it('should render badge with default props', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { children: 'Default Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.tagName.toLowerCase()).toBe('span');
        expect(badge?.textContent).toContain('Default Badge');
        expect(badge?.className).toContain('badge');
      } finally {
        cleanup();
      }
    });

    it('should render badge with text prop', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { text: 'Text Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.textContent).toContain('Text Badge');
      } finally {
        cleanup();
      }
    });

    it('should render badge with custom class', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { class: 'custom-badge', children: 'Custom Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toContain('custom-badge');
      } finally {
        cleanup();
      }
    });
  });

  describe('Badge Variants', () => {
    it('should render primary variant badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { variant: 'primary', children: 'Primary Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/primary|badge-primary/);
        expect(badge?.textContent).toContain('Primary Badge');
      } finally {
        cleanup();
      }
    });

    it('should render secondary variant badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { variant: 'secondary', children: 'Secondary Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/secondary|badge-secondary/);
      } finally {
        cleanup();
      }
    });

    it('should render success variant badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { variant: 'success', children: 'Success Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/success|badge-success/);
      } finally {
        cleanup();
      }
    });

    it('should render error variant badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { variant: 'error', children: 'Error Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/error|badge-error/);
      } finally {
        cleanup();
      }
    });

    it('should render warning variant badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { variant: 'warning', children: 'Warning Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/warning|badge-warning/);
      } finally {
        cleanup();
      }
    });
  });

  describe('Badge Sizes', () => {
    it('should render small badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { size: 'sm', children: 'Small Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/sm|small|badge-sm/);
      } finally {
        cleanup();
      }
    });

    it('should render medium badge (default)', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { size: 'md', children: 'Medium Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/md|medium|badge-md/);
      } finally {
        cleanup();
      }
    });

    it('should render large badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { size: 'lg', children: 'Large Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/lg|large|badge-lg/);
      } finally {
        cleanup();
      }
    });
  });

  describe('Healthcare-Specific Features', () => {
    it('should render medical badge with healthcare classes', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { 
          medical: true,
          badgeContext: 'patient-status',
          children: 'Active Patient'
        },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/medical|patient-status|healthcare/);
      } finally {
        cleanup();
      }
    });

    it('should render priority badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { 
          priority: 'high',
          variant: 'error',
          children: 'High Priority'
        },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/priority|high|error/);
      } finally {
        cleanup();
      }
    });

    it('should render medication status badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { 
          badgeContext: 'medication',
          variant: 'success',
          children: 'Administered'
        },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/medication|success/);
      } finally {
        cleanup();
      }
    });

    it('should render vital signs status badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { 
          badgeContext: 'vital-signs',
          variant: 'warning',
          children: 'Abnormal'
        },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/vital-signs|warning/);
      } finally {
        cleanup();
      }
    });
  });

  describe('Badge States', () => {
    it('should render disabled badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { disabled: true, children: 'Disabled Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/disabled|opacity/);
      } finally {
        cleanup();
      }
    });

    it('should render clickable badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { clickable: true, children: 'Clickable Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/clickable|cursor-pointer/);
      } finally {
        cleanup();
      }
    });

    it('should render outlined badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { outlined: true, children: 'Outlined Badge' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.className).toMatch(/outlined|border/);
      } finally {
        cleanup();
      }
    });
  });

  describe('Badge Counts and Numbers', () => {
    it('should render numeric badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { children: '5' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.textContent?.trim()).toBe('5');
      } finally {
        cleanup();
      }
    });

    it('should render count badge with large numbers', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { children: '99+' },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.textContent?.trim()).toBe('99+');
      } finally {
        cleanup();
      }
    });

    it('should render zero count badge', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { children: '0', showZero: true },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.textContent?.trim()).toBe('0');
      } finally {
        cleanup();
      }
    });
  });

  describe('Accessibility Compliance', () => {
    it('should render with aria-label', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { 
          'aria-label': 'Unread messages count',
          children: '3'
        },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.getAttribute('aria-label')).toBe('Unread messages count');
      } finally {
        cleanup();
      }
    });

    it('should render with role attribute', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { 
          role: 'status',
          children: 'Online'
        },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.getAttribute('role')).toBe('status');
      } finally {
        cleanup();
      }
    });

    it('should support screen reader announcements', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { 
          'aria-live': 'polite',
          children: 'Updated'
        },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.getAttribute('aria-live')).toBe('polite');
      } finally {
        cleanup();
      }
    });
  });

  describe('Performance and Integration', () => {
    it('should render efficiently', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { children: 'Performance test' },
        'badge'
      );
      
      try {
        const startTime = performance.now();
        const badge = getByTestId('badge-test');
        const endTime = performance.now();
        
        expect(badge).toBeTruthy();
        expect(endTime - startTime).toBeLessThan(50); // Should be very fast
      } finally {
        cleanup();
      }
    });

    it('should handle complex healthcare props', async () => {
      const { getByTestId, cleanup } = await renderComponent(
        Badge, 
        { 
          medical: true,
          badgeContext: 'vital-signs',
          variant: 'error',
          priority: 'critical',
          size: 'lg',
          clickable: true,
          'aria-label': 'Critical vital signs alert - click for details',
          role: 'button',
          children: 'CRITICAL'
        },
        'badge'
      );
      
      try {
        const badge = getByTestId('badge-test');
        expect(badge).toBeTruthy();
        expect(badge?.getAttribute('aria-label')).toBe('Critical vital signs alert - click for details');
        expect(badge?.getAttribute('role')).toBe('button');
        expect(badge?.className).toMatch(/medical|vital-signs|error|critical|lg|clickable/);
        expect(badge?.textContent).toContain('CRITICAL');
      } finally {
        cleanup();
      }
    });
  });
});
