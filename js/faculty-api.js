// Faculty API Integration
const API_URL = 'http://localhost:5000/api';

// Department ID mapping
const deptIdMap = {
  'Computer Science': 'computer',
  'Physics': 'physics',
  'Mathematics': 'mathematics',
  'Chemistry': 'chemistry',
  'English': 'english',
  'Urdu': 'urdu',
  'Pakistan Studies': 'pakistan',
  'Biology': 'biology',
  'Islamiyat': 'islamiat',
  'Psychology': 'psychology',
  'Statistics': 'statistics',
  'Library Science': 'library',
  'Physical Education': 'physical-education'
};

// Load faculty from API
async function loadFacultyFromAPI() {
  try {
    const response = await fetch(`${API_URL}/faculty`);
    const data = await response.json();

    if (data.success) {
      renderFacultyByDepartment(data.data);
      updateSearchData(data.data);
    }
  } catch (error) {
    console.error('Error loading faculty from API, using hardcoded data:', error);
  }
}

// Render faculty by department
function renderFacultyByDepartment(facultyList) {
  // Group by department — skip principals and inactive
  const byDepartment = {};

  facultyList.forEach(member => {
    if (member.isPrincipal) return;
    if (!member.isActive) return;
    if (member.designation && member.designation.toLowerCase().trim() === 'principal') return;

    if (!byDepartment[member.department]) {
      byDepartment[member.department] = [];
    }
    byDepartment[member.department].push(member);
  });

  // Render each department grid
  Object.keys(byDepartment).forEach(deptName => {
    const deptId = deptIdMap[deptName];
    if (!deptId) return;

    const deptSection = document.getElementById(deptId);
    if (!deptSection) return;

    const grid = deptSection.querySelector('.faculty-grid');
    if (!grid) return;

    // Sort by order then name
    const sorted = byDepartment[deptName].sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.name.localeCompare(b.name);
    });

    // Replace grid content
    grid.innerHTML = sorted.map(member => createFacultyCardHTML(member)).join('');
  });
}

// Title-case helper for display
function toTitleCase(str) {
  if (!str) return str;
  return str.trim().replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

// Create faculty card HTML string
function createFacultyCardHTML(member) {
  const photoUrl = member.photo && member.photo.startsWith('/')
    ? `http://localhost:5000${member.photo}`
    : (member.photo || '../assets/images/faculty_photo/Women_Teacher.jpg');

  // Handle education whether it's an array or a JSON string
  let educationArray = [];
  if (Array.isArray(member.education)) {
    educationArray = member.education;
  } else if (typeof member.education === 'string') {
    try {
      const parsed = JSON.parse(member.education);
      educationArray = Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      educationArray = member.education ? [member.education] : [];
    }
  }

  const educationHTML = educationArray
    .filter(e => e && e.trim())
    .map(edu => `<p>${toTitleCase(edu)}</p>`).join('');

  return `
    <div class="faculty-card">
      <img src="${photoUrl}" alt="${member.name}" class="faculty-photo"
           onerror="this.src='../assets/images/faculty_photo/Women_Teacher.jpg'">
      <h4 class="faculty-name">${member.name}</h4>
      <p class="faculty-designation">${member.designation}</p>
      <div class="faculty-education">
        <strong>Education</strong>
        ${educationHTML}
        ${member.university ? `<p>${member.university}</p>` : ''}
        ${member.specialization ? `<p>Specialization: ${member.specialization}</p>` : ''}
      </div>
    </div>`;
}

// Update search data array
function updateSearchData(facultyList) {
  if (typeof facultyData === 'undefined') return;

  facultyData.length = 0;

  facultyList.forEach(member => {
    if (member.isPrincipal) return;
    if (!member.isActive) return;
    if (member.designation && member.designation.toLowerCase().trim() === 'principal') return;

    const deptId = deptIdMap[member.department];
    if (deptId) {
      facultyData.push({
        name: member.name,
        dept: member.department,
        deptId: deptId,
        designation: member.designation
      });
    }
  });
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadFacultyFromAPI);
} else {
  loadFacultyFromAPI();
}

// Refresh every 60 seconds
setInterval(loadFacultyFromAPI, 60000);
