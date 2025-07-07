#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const iconTestFile = '/Volumes/EXT/RxOps/uikit/src/core/atoms/icon/__tests__/icon.test.tsx';

// Icon name mappings from invalid to valid names
const iconMappings = {
  'heart-rate': 'activity',
  'warning': 'alert-triangle',
  'heart-monitor': 'activity',
  'performance-test': 'trending-up',
  'help': 'help-circle',
  'custom': 'settings',
  'square': 'message-square',
  'alert': 'alert-triangle'
};

// Size mappings
const sizeMappings = {
  'sm': '16',
  'md': '24', 
  'lg': '32',
  'xl': '48'
};

console.log('Fixing Icon test file...');

let content = fs.readFileSync(iconTestFile, 'utf8');

// Replace name: with icon:
content = content.replace(/name: '/g, "icon: '");

// Replace invalid icon names
Object.entries(iconMappings).forEach(([invalid, valid]) => {
  const regex = new RegExp(`icon: '${invalid}'`, 'g');
  content = content.replace(regex, `icon: '${valid}'`);
});

// Replace size strings with numbers
Object.entries(sizeMappings).forEach(([sizeStr, sizeNum]) => {
  const regex = new RegExp(`size: '${sizeStr}'`, 'g');
  content = content.replace(regex, `size: ${sizeNum}`);
});

// Remove color props since Icon component doesn't have color prop - use class instead
content = content.replace(/,\s*color: 'primary'/g, ", class: 'text-primary'");
content = content.replace(/,\s*color: 'success'/g, ", class: 'text-success'");
content = content.replace(/,\s*color: 'error'/g, ", class: 'text-error'");

// Fix props that don't exist in Icon component
content = content.replace(/medical: true,?\s*/g, 'medicalDeviceMode: true, ');
content = content.replace(/emergency: true,?\s*/g, 'emergencyMode: true, ');
content = content.replace(/iconContext: '[^']*',?\s*/g, '');
content = content.replace(/decorative: true,?\s*/g, "purpose: 'decorative', ");

fs.writeFileSync(iconTestFile, content);

console.log('Icon test file fixed!');
