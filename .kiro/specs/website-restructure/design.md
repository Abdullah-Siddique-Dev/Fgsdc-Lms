# Design Document

## Overview

This design document outlines the restructuring approach for the F.G Science Degree College website. The current website has all files scattered in the root directory, making it difficult to maintain and scale. The new structure will follow modern web development best practices with organized folders, proper asset management, and maintainable code organization.

## Architecture

### Current State Analysis
- **Root Directory Chaos**: 80+ files including HTML, CSS, JS, images, videos, and PDFs all in root
- **Mixed File Types**: No separation between different asset types
- **Inconsistent Naming**: Mix of naming conventions across files
- **Hard to Maintain**: Difficult to locate and update specific files

### Target Architecture
```
website-root/
├── index.html                 # Main entry point
├── README.md                  # Project documentation
├── assets/                    # All static assets
│   ├── images/               # Image files organized by category
│   │   ├── gallery/          # Gallery and event images
│   │   ├── faculty/          # Faculty member photos
│   │   ├── facilities/       # Campus and facility images
│   │   ├── logos/            # Logo and branding images
│   │   └── backgrounds/      # Background images
│   ├── videos/               # Video files
│   │   ├── promotional/      # College promotional videos
│   │   ├── events/           # Event and sports videos
│   │   └── university/       # University-related videos
│   ├── documents/            # PDF and document files
│   └── icons/                # Icon files and favicons
├── css/                      # Stylesheets
│   ├── main.css             # Main stylesheet (renamed from index.css)
│   ├── pages/               # Page-specific styles
│   │   ├── university.css
│   │   ├── facilities.css
│   │   ├── faculty.css
│   │   └── gallery.css
│   └── components/          # Component-specific styles
├── js/                      # JavaScript files
│   ├── main.js              # Main JavaScript (renamed from index.js)
│   ├── pages/               # Page-specific scripts
│   │   ├── university.js
│   │   ├── facilities.js
│   │   ├── faculty.js
│   │   └── gallery.js
│   └── components/          # Reusable component scripts
├── pages/                   # HTML pages (except index.html)
│   ├── university.html
│   ├── facilities.html
│   ├── faculty.html
│   └── gallery.html
└── .kiro/                   # Kiro configuration (existing)
```

## Components and Interfaces

### File Organization Strategy

#### 1. Asset Management
- **Images**: Categorized by purpose (gallery, faculty, facilities, logos, backgrounds)
- **Videos**: Organized by type (promotional, events, university)
- **Documents**: Centralized location for PDFs and downloadable content
- **Icons**: Separate folder for favicon and icon assets

#### 2. Code Organization
- **CSS Structure**: 
  - Main stylesheet for global styles
  - Page-specific stylesheets in dedicated folder
  - Component-based styles for reusable elements
- **JavaScript Structure**:
  - Main script for global functionality
  - Page-specific scripts for individual page features
  - Component scripts for reusable functionality

#### 3. Page Structure
- **Root Level**: Only index.html remains in root for standard web convention
- **Pages Folder**: All other HTML pages organized in dedicated folder
- **Consistent Naming**: Standardized file naming convention throughout

### Path Update Strategy

#### 1. HTML File Updates
- Update all `<link>` tags for CSS files to reflect new paths
- Update all `<script>` tags for JavaScript files to reflect new paths
- Update all `<img>` src attributes to point to new image locations
- Update all `<video>` src attributes to point to new video locations
- Update all navigation links to reflect new page locations

#### 2. CSS File Updates
- Update all `background-image` properties to reflect new image paths
- Update any `@import` statements if present
- Update font file references if any local fonts are used

#### 3. JavaScript File Updates
- Update any hardcoded file paths in JavaScript
- Update dynamic image/video loading paths
- Ensure all DOM selectors and functionality remain intact

## Data Models

### File Mapping Structure
```javascript
const fileMapping = {
  images: {
    gallery: [
      'All_pak_winner.jpg',
      'Attendingsession.jpg',
      'Attendingsession1.jpg',
      'BSCS and phy student.jpg',
      // ... other gallery images
    ],
    faculty: [
      'Ali.jpg',
      'Areeba.jpg',
      'Fatima.jpg',
      'Muhammad Farooq.jpg',
      // ... other faculty images
    ],
    facilities: [
      'Biolab.png',
      'Chemlab.png',
      'Library.png',
      'Smartroom1.png',
      // ... other facility images
    ],
    logos: [
      'logo.jpg',
      'logo-img.jpg',
      'Nup_logo.jpeg',
      'FGSD Chatbot Logo Design.png'
    ],
    backgrounds: [
      'About_bg_pic.png',
      'front_pic.jpeg',
      'NUP.webp'
    ]
  },
  videos: {
    promotional: [
      'FGScienceDegreeLast (2).mp4'
    ],
    events: [
      'Cricketwin.mp4',
      'Javelin.mp4',
      'cricket.mp4'
    ],
    university: [
      'Struggling_for_marketing.mp4'
    ]
  },
  documents: [
    'F.G Science Degree College Prospectus 2025-compressed.pdf'
  ]
};
```

### Path Transformation Rules
```javascript
const pathTransformations = {
  // CSS files
  'index.css' → 'css/main.css',
  'university.css' → 'css/pages/university.css',
  'Facilities.css' → 'css/pages/facilities.css',
  'Faculty.css' → 'css/pages/faculty.css',
  'FGSD_Gallery.css' → 'css/pages/gallery.css',
  
  // JavaScript files
  'index.js' → 'js/main.js',
  'university.js' → 'js/pages/university.js',
  'Facilities.js' → 'js/pages/facilities.js',
  'Faculty.js' → 'js/pages/faculty.js',
  'FGSD_Gallery.js' → 'js/pages/gallery.js',
  
  // HTML pages
  'university.html' → 'pages/university.html',
  'Facilities.html' → 'pages/facilities.html',
  'Faculty.html' → 'pages/faculty.html',
  'FGSD_Gallery.html' → 'pages/gallery.html'
};
```

## Error Handling

### File Reference Validation
- **Missing Files**: Implement checks to ensure all referenced files exist after restructuring
- **Broken Links**: Validate all internal links and references
- **Path Corrections**: Automatic detection and correction of incorrect paths

### Backup Strategy
- **Original Backup**: Create complete backup of original structure before modifications
- **Incremental Backups**: Save state after each major restructuring step
- **Rollback Plan**: Ability to restore original structure if issues arise

### Validation Checks
- **HTML Validation**: Ensure all HTML files remain valid after path updates
- **CSS Validation**: Verify all CSS files load correctly with new paths
- **JavaScript Functionality**: Test all interactive features post-restructuring
- **Media Loading**: Confirm all images and videos load properly

## Testing Strategy

### Automated Testing
- **Link Checker**: Automated script to verify all internal links work
- **Asset Loader**: Script to confirm all assets (images, videos, CSS, JS) load successfully
- **Path Validator**: Automated validation of all file path references

### Manual Testing
- **Navigation Testing**: Manual verification of all navigation elements
- **Responsive Testing**: Ensure mobile and desktop layouts work correctly
- **Cross-Browser Testing**: Verify functionality across different browsers
- **Feature Testing**: Test all interactive elements (videos, carousels, forms)

### Performance Testing
- **Load Time Analysis**: Ensure restructuring doesn't negatively impact load times
- **Asset Optimization**: Verify efficient loading of reorganized assets
- **Caching Strategy**: Implement appropriate caching for new folder structure

## Implementation Phases

### Phase 1: Folder Structure Creation
- Create all necessary folders and subfolders
- Establish naming conventions and documentation

### Phase 2: Asset Organization
- Move and categorize all image files
- Organize video files by type
- Relocate document files

### Phase 3: Code Restructuring
- Move and rename CSS files
- Move and rename JavaScript files
- Move HTML pages to appropriate locations

### Phase 4: Path Updates
- Update all HTML file references
- Update all CSS file references
- Update all JavaScript file references

### Phase 5: Testing and Validation
- Comprehensive testing of all functionality
- Performance validation
- Cross-browser compatibility testing

This design ensures a clean, maintainable, and scalable website structure while preserving all existing functionality and user experience.