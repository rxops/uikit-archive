// Simple test file to debug Qwik component rendering
import { describe, it, expect } from 'vitest';
import { createDOM } from '@builder.io/qwik/testing';
import { PrescriptionManagement, type Prescription } from '../prescription-management-simple';

describe('Debug Test', () => {
  it('should render something', async () => {
    const { screen, render } = await createDOM();
    
    console.log('=== Before render ===');
    
    try {
      await render(
        <PrescriptionManagement 
          patientId="test-123"
          prescriptions={[]}
        />
      );
      
      console.log('=== After render ===');
      console.log('Screen innerHTML:', screen.innerHTML);
      console.log('Screen outerHTML:', screen.outerHTML);
      console.log('Screen textContent:', screen.textContent);
      console.log('Screen children:', Array.from(screen.children).map(c => c.tagName));
      
      // Try to find any elements
      const allElements = screen.querySelectorAll('*');
      console.log('All elements:', Array.from(allElements).map(e => e.tagName));
      
    } catch (error) {
      console.error('Render error:', error);
      throw error;
    }
  });
});
