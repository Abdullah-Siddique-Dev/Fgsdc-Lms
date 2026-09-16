# F.G Science Degree College Website

A modern, well-organized website for F.G Science Degree College, Wah Cantt, Pakistan.

## Project Structure

This website has been restructured following modern web development best practices with organized folders, proper asset management, and maintainable code organization.

```
website-root/
├── index.html                 # Main entry point
├── README.md                  # Project documentation
├── validate-links.js          # Link validation script
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
│   ├── main.css             # Main stylesheet
│   ├── pages/               # Page-specific styles
│   │   ├── university.css
│   │   ├── facilities.css
│   │   ├── faculty.css
│   │   └── gallery.css
│   └── components/          # Component-specific styles
├── js/                      # JavaScript files
│   ├── main.js              # Main JavaScript
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
└── .kiro/                   # Kiro configuration
```

## Features

- **Responsive Design**: Mobile-first approach with responsive layouts
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Organized Structure**: Logical file organization for easy maintenance
- **Performance Optimized**: Efficient loading of assets and resources
- **Cross-Browser Compatible**: Works across all modern browsers

## Pages

1. **Home (index.html)**: Main landing page with college overview
2. **University (pages/university.html)**: Information about affiliated National University of Pakistan
3. **Facilities (pages/facilities.html)**: Campus facilities and infrastructure
4. **Faculty (pages/faculty.html)**: Faculty members and their profiles
5. **Gallery (pages/gallery.html)**: Sports events, army visits, and college activities

## Technologies Used

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Advanced styling with flexbox, grid, and animations
- **JavaScript**: Interactive functionality and dynamic content
- **Font Awesome**: Icon library for consistent iconography
- **Google Fonts**: Poppins font family for typography

## Asset Organization

### Images
- **Gallery**: Event photos, sports activities, student achievements
- **Faculty**: Faculty member photographs and profiles
- **Facilities**: Campus buildings, laboratories, classrooms
- **Logos**: College logo, university logo, branding elements
- **Backgrounds**: Hero section backgrounds and decorative images

### Videos
- **Promotional**: College promotional and marketing videos
- **Events**: Sports events, competitions, and activities
- **University**: University-related content and tributes

### Documents
- College prospectus and downloadable resources

## Development Guidelines

### File Naming Conventions
- Use kebab-case for file names (e.g., `faculty-profile.jpg`)
- Use descriptive names that indicate content
- Maintain consistency across similar file types

### Code Organization
- Keep HTML semantic and accessible
- Use CSS custom properties for consistent theming
- Organize JavaScript into logical modules
- Comment complex functionality

### Asset Management
- Optimize images for web (compress without quality loss)
- Use appropriate image formats (WebP for modern browsers, fallback to JPG/PNG)
- Minimize CSS and JavaScript for production
- Use CDN for external libraries when possible

## Maintenance

### Adding New Content
1. **Images**: Place in appropriate subfolder under `assets/images/`
2. **Videos**: Place in appropriate subfolder under `assets/videos/`
3. **Pages**: Create in `pages/` folder with corresponding CSS/JS files
4. **Styles**: Add page-specific styles in `css/pages/`
5. **Scripts**: Add page-specific scripts in `js/pages/`

### Updating Navigation
- Update navigation links in all HTML files when adding new pages
- Ensure mobile menu functionality is maintained
- Test all internal links after changes

### Performance Optimization
- Regularly optimize images and videos
- Minify CSS and JavaScript for production
- Use browser caching for static assets
- Monitor page load times

## Validation

Run the validation script to check all links and assets:

```bash
node validate-links.js
```

This script will:
- Verify all internal links work correctly
- Check that all referenced assets exist
- Validate the folder structure
- Report any missing files or broken references

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contact

For technical support or questions about this website:
- Email: fgsdcwahcantt@gmail.com
- Phone: +051-4511032

## License

© 2025 F.G Science Degree College. All Rights Reserved.