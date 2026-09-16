
        document.addEventListener('DOMContentLoaded', function() {
            // Toggle section content
            const sectionHeaders = document.querySelectorAll('.section-header');
            sectionHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const section = header.parentElement;
                    section.classList.toggle('collapsed');
                });
            });
            
            // Collapse all sections by default
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.add('collapsed');
            });
            
            // Show/hide intermediate fields based on program selection
            const programSelect = document.getElementById('program-choice-1');
            const intermediateSection = document.getElementById('intermediate-section');
            const interDocsSection = document.getElementById('inter-docs-section');
            const bsProgramInfo = document.getElementById('bs-program-info');
            
            programSelect.addEventListener('change', function() {
                const isBSProgram = this.value.includes('bs-');
                
                if (isBSProgram) {
                    intermediateSection.classList.remove('hidden');
                    interDocsSection.classList.remove('hidden');
                    bsProgramInfo.classList.remove('hidden');
                    
                    // Make intermediate fields required
                    document.getElementById('inter-board').required = true;
                    document.getElementById('inter-year').required = true;
                    document.getElementById('inter-rollno').required = true;
                    document.getElementById('inter-marks').required = true;
                    document.getElementById('inter-grade').required = true;
                    document.getElementById('inter-cert').required = true;
                    document.getElementById('inter-dmc').required = true;
                } else {
                    intermediateSection.classList.add('hidden');
                    interDocsSection.classList.add('hidden');
                    bsProgramInfo.classList.add('hidden');
                    
                    // Make intermediate fields not required
                    document.getElementById('inter-board').required = false;
                    document.getElementById('inter-year').required = false;
                    document.getElementById('inter-rollno').required = false;
                    document.getElementById('inter-marks').required = false;
                    document.getElementById('inter-grade').required = false;
                    document.getElementById('inter-cert').required = false;
                    document.getElementById('inter-dmc').required = false;
                }
            });
            
            // Show file name when selected
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => {
                input.addEventListener('change', function() {
                    const label = this.previousElementSibling;
                    if (this.files.length > 0) {
                        label.innerHTML = `<i class="fas fa-check-circle"></i> ${this.files[0].name}`;
                        label.style.color = '#2ecc71';
                    } else {
                        const icon = this.id === 'photo' ? 'fa-camera' : 
                                     this.id === 'cnic-doc' ? 'fa-id-card' : 
                                     this.id.includes('cert') ? 'fa-file-certificate' : 'fa-file-alt';
                        label.innerHTML = `<i class="fas ${icon}"></i> Choose File`;
                        label.style.color = '';
                    }
                });
            });
        });
  