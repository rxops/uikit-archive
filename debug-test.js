// Quick debug test to understand Qwik rendering
import { createDOM } from '@builder.io/qwik/testing';

async function testRendering() {
  console.log('=== Starting debug test ===');
  
  const { screen, render } = await createDOM();
  
  // Use string-based HTML instead of JSX
  const testHTML = '<div class="test-container"><h1>Hello World</h1><p>Prescription Management</p></div>';
  
  console.log('Setting innerHTML directly...');
  screen.innerHTML = testHTML;
  
  console.log('After direct innerHTML:');
  console.log('Screen innerHTML:', screen.innerHTML);
  console.log('Screen outerHTML:', screen.outerHTML);
  console.log('Screen textContent:', screen.textContent);
  console.log('Contains "Hello World":', screen.innerHTML.includes('Hello World'));
  console.log('Contains "Prescription Management":', screen.innerHTML.includes('Prescription Management'));
}

testRendering().catch(console.error);
