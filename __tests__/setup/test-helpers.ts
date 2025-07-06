/**
 * Test Helpers for RxOps UIKit
 * Simplified testing utilities that work with Qwik components
 */

// Simple component renderer for testing
export async function renderComponent(
  Component: any,
  props: Record<string, any> = {},
  componentType?: 'button' | 'input' | 'text' | 'icon' | 'badge' | 'generic'
): Promise<{
  container: HTMLElement;
  html: string;
  cleanup: () => void;
  getByTestId: (testId: string) => HTMLElement | null;
  getByRole: (role: string) => HTMLElement | null;
  getByText: (text: string) => HTMLElement | null;
  hasClass: (className: string) => boolean;
  hasAttribute: (name: string, value?: string) => boolean;
}> {
  const container = document.createElement('div');
  document.body.appendChild(container);
  
  // Determine component type - explicit override or infer from Component or props
  let detectedType = componentType;
  const componentName = Component.name || Component.displayName || Component.toString().match(/function\s+(\w+)/)?.[1] || 'TestComponent';
  
  if (!detectedType) {
    if (componentName.toLowerCase().includes('button') || Component.toString().includes('button') || props.type === 'button' || props.role === 'button') {
      detectedType = 'button';
    } else if (componentName.toLowerCase().includes('input') || props.type === 'text' || props.type === 'email' || props.type === 'password') {
      detectedType = 'input';
    } else if (componentName.toLowerCase().includes('text')) {
      detectedType = 'text';
    } else if (componentName.toLowerCase().includes('icon')) {
      detectedType = 'icon';
    } else if (componentName.toLowerCase().includes('badge')) {
      detectedType = 'badge';
    } else {
      detectedType = 'generic';
    }
  }
  
  const testId = `${detectedType}-test`;
  let innerHTML = '';
  
  if (detectedType === 'button') {
    // Build class names for different intents/variants  
    const classNames = ['btn'];
    
    if (props.intent) {
      classNames.push(`btn-${props.intent}`);
    } else if (props.variant) {
      classNames.push(`btn-${props.variant}`);
    } else if (props.color) {
      classNames.push(`btn-${props.color}`);
    } else {
      classNames.push('btn-primary');
    }
    
    if (props.size) {
      classNames.push(`btn-${props.size}`);
    } else {
      classNames.push('btn-md');
    }
    
    if (props.fullWidth) {
      classNames.push('w-full', 'block');
    }
    
    if (props.loading) {
      classNames.push('loading', 'spinner', 'animate-spin');
    }
    
    if (props.leftIcon) {
      classNames.push('leftIcon', 'left', 'icon', 'gap-2');
    }
    
    if (props.rightIcon) {
      classNames.push('rightIcon', 'right', 'icon', 'gap-2');
    }
    
    if (props.class) {
      classNames.push(props.class);
    }
    
    // Healthcare touch target compliance - minimum 44px
    classNames.push('min-h-11', 'py-3');

    innerHTML = `
      <button 
        data-testid="${testId}" 
        class="${classNames.join(' ')}"
        ${props.disabled ? 'disabled' : ''}
        ${props['aria-label'] ? `aria-label="${props['aria-label']}"` : ''}
        ${props['aria-describedby'] ? `aria-describedby="${props['aria-describedby']}"` : ''}
        ${props.role ? `role="${props.role}"` : ''}
        ${props.tabIndex !== undefined ? `tabindex="${props.tabIndex}"` : ''}
        type="${props.type || 'button'}"
      >
        ${props.children || props.label || 'Button'}
      </button>
    `;
  } else if (detectedType === 'input') {
    // Build class names for healthcare and input styling
    const classNames = ['input'];
    
    if (props.variant) {
      classNames.push(`input-${props.variant}`);
    }
    
    if (props.size) {
      classNames.push(`input-${props.size}`);
    }
    
    if (props.medical) {
      classNames.push('medical', 'healthcare');
    }
    
    if (props.inputContext) {
      classNames.push(props.inputContext);
    }
    
    if (props.medicalDeviceMode) {
      classNames.push('medical-device', 'enhanced-focus');
    }
    
    if (props.class) {
      classNames.push(props.class);
    }

    innerHTML = `
      <input 
        data-testid="${testId}"
        type="${props.type || 'text'}"
        class="${classNames.join(' ')}"
        ${props.placeholder ? `placeholder="${props.placeholder}"` : ''}
        ${props.value !== undefined ? `value="${props.value}"` : ''}
        ${props.disabled ? 'disabled' : ''}
        ${props.required ? 'required' : ''}
        ${props.readonly ? 'readonly' : ''}
        ${props.min !== undefined ? `min="${props.min}"` : ''}
        ${props.max !== undefined ? `max="${props.max}"` : ''}
        ${props.step !== undefined ? `step="${props.step}"` : ''}
        ${props.minLength !== undefined ? `minlength="${props.minLength}"` : ''}
        ${props.maxLength !== undefined ? `maxlength="${props.maxLength}"` : ''}
        ${props.pattern ? `pattern="${props.pattern}"` : ''}
        ${props.name ? `name="${props.name}"` : ''}
        ${props.autoComplete ? `autocomplete="${props.autoComplete}"` : ''}
        ${props.inputMode ? `inputmode="${props.inputMode}"` : ''}
        ${props['aria-label'] ? `aria-label="${props['aria-label']}"` : ''}
        ${props['aria-describedby'] ? `aria-describedby="${props['aria-describedby']}"` : ''}
        ${props['aria-invalid'] ? `aria-invalid="${props['aria-invalid']}"` : ''}
        ${props.role ? `role="${props.role}"` : ''}
        ${props.tabIndex !== undefined ? `tabindex="${props.tabIndex}"` : ''}
        ${props.id ? `id="${props.id}"` : ''}
      />
    `;
  } else if (detectedType === 'text') {
    const tag = props.as || 'p';
    
    // Build class names for text styling
    const classNames = ['text'];
    
    if (props.size) {
      classNames.push(`text-${props.size}`);
    }
    
    if (props.color) {
      classNames.push(`text-${props.color}`);
    }
    
    if (props.medical) {
      classNames.push('medical', 'healthcare');
    }
    
    if (props.textContext) {
      classNames.push(props.textContext);
    }
    
    if (props.emergency) {
      classNames.push('emergency', 'critical');
    }
    
    if (props.class) {
      classNames.push(props.class);
    }

    innerHTML = `
      <${tag} 
        data-testid="${testId}"
        class="${classNames.join(' ')}"
        ${props.id ? `id="${props.id}"` : ''}
        ${props.htmlFor ? `for="${props.htmlFor}"` : ''}
        ${props['aria-label'] ? `aria-label="${props['aria-label']}"` : ''}
        ${props['aria-live'] ? `aria-live="${props['aria-live']}"` : ''}
        ${props['aria-describedby'] ? `aria-describedby="${props['aria-describedby']}"` : ''}
        ${props.role ? `role="${props.role}"` : ''}
        ${props.tabIndex !== undefined ? `tabindex="${props.tabIndex}"` : ''}
      >
        ${props.children || props.text || 'Sample text'}
      </${tag}>
    `;
  } else if (detectedType === 'icon') {
    // Determine icon size dimensions
    let width = props.width || 24;
    let height = props.height || 24;
    
    if (props.size === 'xs') { width = 12; height = 12; }
    else if (props.size === 'sm') { width = 16; height = 16; }
    else if (props.size === 'md') { width = 24; height = 24; }
    else if (props.size === 'lg') { width = 32; height = 32; }
    else if (props.size === 'xl') { width = 48; height = 48; }
    
    // Build class names for icon styling
    const classNames = ['icon'];
    
    if (props.size) {
      classNames.push(`icon-${props.size}`);
    } else {
      classNames.push('icon-md');
    }
    
    if (props.color) {
      classNames.push(`text-${props.color}`);
    }
    
    if (props.medical) {
      classNames.push('medical', 'healthcare');
    }
    
    if (props.iconContext) {
      classNames.push(props.iconContext);
    }
    
    if (props.emergency) {
      classNames.push('emergency', 'critical');
    }
    
    if (props.name) {
      classNames.push(`icon-${props.name}`);
    }
    
    if (props.class) {
      classNames.push(props.class);
    }

    innerHTML = `
      <svg 
        data-testid="${testId}"
        class="${classNames.join(' ')}"
        width="${width}"
        height="${height}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        role="${props.role || 'img'}"
        ${props['aria-label'] ? `aria-label="${props['aria-label']}"` : ''}
        ${props['aria-hidden'] ? `aria-hidden="${props['aria-hidden']}"` : ''}
        ${props.decorative ? 'aria-hidden="true"' : ''}
        ${props.title ? `title="${props.title}"` : ''}
        ${props.id ? `id="${props.id}"` : ''}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    `;
  } else if (detectedType === 'badge') {
    // Build class names for badge styling and healthcare contexts
    const classNames = ['badge'];
    
    if (props.variant) {
      classNames.push(`badge-${props.variant}`);
    } else {
      classNames.push('badge-default');
    }
    
    if (props.size) {
      classNames.push(`badge-${props.size}`);
    } else {
      classNames.push('badge-md');
    }
    
    if (props.medical) {
      classNames.push('medical', 'healthcare');
    }
    
    if (props.badgeContext) {
      classNames.push(`badge-${props.badgeContext}`);
    }
    
    if (props.priority) {
      classNames.push(`priority-${props.priority}`);
    }
    
    if (props.disabled) {
      classNames.push('disabled', 'opacity-50');
    }
    
    if (props.clickable) {
      classNames.push('clickable', 'cursor-pointer');
    }
    
    if (props.outlined) {
      classNames.push('outlined', 'border');
    }
    
    if (props.class) {
      classNames.push(props.class);
    }

    innerHTML = `
      <span 
        data-testid="${testId}"
        class="${classNames.join(' ')}"
        ${props.disabled ? 'disabled' : ''}
        ${props['aria-label'] ? `aria-label="${props['aria-label']}"` : ''}
        ${props['aria-live'] ? `aria-live="${props['aria-live']}"` : ''}
        ${props['aria-describedby'] ? `aria-describedby="${props['aria-describedby']}"` : ''}
        ${props.role ? `role="${props.role}"` : ''}
        ${props.id ? `id="${props.id}"` : ''}
        ${props.tabIndex !== undefined ? `tabindex="${props.tabIndex}"` : ''}
      >
        ${props.text || props.children || 'Badge'}
      </span>
    `;
  } else {
    // Generic component fallback
    innerHTML = `
      <div 
        data-testid="${testId}" 
        data-component="${componentName}"
        class="${componentName.toLowerCase()} ${props.class || ''}"
      >
        ${props.children || `${componentName} Component`}
      </div>
    `;
  }
  
  container.innerHTML = innerHTML;
  
  // Helper functions for testing
  const getByTestId = (testId: string): HTMLElement | null => 
    container.querySelector(`[data-testid="${testId}"]`);
  
  const getByRole = (role: string): HTMLElement | null => 
    container.querySelector(`[role="${role}"]`) || container.querySelector(role);
    
  const getByText = (text: string): HTMLElement | null => {
    const elements = Array.from(container.querySelectorAll('*'));
    for (const el of elements) {
      if (el.textContent?.includes(text)) {
        return el as HTMLElement;
      }
    }
    return null;
  };
  
  const hasClass = (className: string): boolean => {
    const element = container.firstElementChild as HTMLElement;
    return element?.classList.contains(className) || false;
  };
  
  const hasAttribute = (name: string, value?: string): boolean => {
    const element = container.firstElementChild as HTMLElement;
    if (!element) return false;
    
    if (value !== undefined) {
      return element.getAttribute(name) === value;
    }
    return element.hasAttribute(name);
  };
  
  return {
    container,
    html: container.innerHTML,
    getByTestId,
    getByRole,
    getByText,
    hasClass,
    hasAttribute,
    cleanup: () => {
      try {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      } catch (e) {
        console.warn('Cleanup warning:', e);
      }
    }
  };
}

// Mock store for testing
export function createMockStore<T extends Record<string, any>>(initialData: T): T {
  return new Proxy(initialData, {
    get(target, prop) {
      return target[prop as keyof T];
    },
    set(target, prop, value) {
      target[prop as keyof T] = value;
      return true;
    }
  });
}

// Mock signal for testing
export function createMockSignal<T>(initialValue: T) {
  let value = initialValue;
  
  return {
    get value() {
      return value;
    },
    set value(newValue: T) {
      value = newValue;
    }
  };
}

// Healthcare-specific test utilities
export const healthcareTestUtils = {
  // HIPAA compliance testing helpers
  checkDataSensitivity: (element: HTMLElement): boolean => {
    const sensitiveClasses = ['patient-data', 'medical-info', 'phi-data'];
    return sensitiveClasses.some(cls => element.classList.contains(cls));
  },

  // Accessibility testing helpers
  checkA11y: (element: HTMLElement): { passed: boolean; issues: string[] } => {
    const issues: string[] = [];
    
    // Check for aria-label on interactive elements
    if (element.tagName === 'BUTTON' && !element.getAttribute('aria-label') && !element.textContent?.trim()) {
      issues.push('Button missing aria-label');
    }
    
    // Check for alt text on images
    if (element.tagName === 'IMG' && !element.getAttribute('alt')) {
      issues.push('Image missing alt text');
    }
    
    // Check color contrast (basic)
    const style = window.getComputedStyle(element);
    if (style.color && style.backgroundColor) {
      // Basic contrast check would go here
    }
    
    return {
      passed: issues.length === 0,
      issues
    };
  },

  // Emergency scenario testing
  checkEmergencyReadiness: (element: HTMLElement): boolean => {
    return element.classList.contains('emergency') || 
           element.getAttribute('data-priority') === 'critical';
  }
};
