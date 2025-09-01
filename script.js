// Data structures
const educationPaths = [
    {
        id: 'highschool',
        title: 'High School Diploma',
        duration: '4 years',
        cost: 0,
        description: 'Basic secondary education foundation',
        skills: ['Basic literacy', 'Numeracy', 'Communication', 'Time management']
    },
    {
        id: 'community_college',
        title: 'Community College (Associate)',
        duration: '2 years',
        cost: 15000,
        description: 'Two-year associate degree program',
        skills: ['Technical skills', 'Problem solving', 'Specialization basics', 'Teamwork']
    },
    {
        id: 'bachelor',
        title: 'Bachelor\'s Degree',
        duration: '4 years',
        cost: 80000,
        description: 'Four-year undergraduate degree',
        skills: ['Advanced knowledge', 'Research', 'Critical thinking', 'Leadership']
    },
    {
        id: 'trade_school',
        title: 'Trade School/Vocational',
        duration: '1-2 years',
        cost: 25000,
        description: 'Specialized technical training',
        skills: ['Hands-on expertise', 'Technical mastery', 'Safety protocols', 'Equipment operation']
    },
    {
        id: 'masters',
        title: 'Master\'s Degree',
        duration: '2 years',
        cost: 50000,
        description: 'Advanced graduate education',
        skills: ['Expertise', 'Research', 'Management', 'Strategic thinking']
    },
    {
        id: 'phd',
        title: 'PhD/Doctorate',
        duration: '4-7 years',
        cost: 100000,
        description: 'Highest academic qualification',
        skills: ['Research mastery', 'Innovation', 'Teaching', 'Thought leadership']
    }
];

const fields = [
    { id: 'technology', name: 'Technology & Software', growth: 'High', demand: 95 },
    { id: 'healthcare', name: 'Healthcare & Medicine', growth: 'High', demand: 90 },
    { id: 'business', name: 'Business & Finance', growth: 'Medium', demand: 75 },
    { id: 'education', name: 'Education & Training', growth: 'Medium', demand: 70 },
    { id: 'creative', name: 'Creative & Arts', growth: 'Low', demand: 45 },
    { id: 'trades', name: 'Skilled Trades', growth: 'Medium', demand: 85 },
    { id: 'science', name: 'Science & Research', growth: 'Medium', demand: 60 },
    { id: 'law', name: 'Legal & Government', growth: 'Low', demand: 50 }
];

const careerOutcomes = {
    'highschool-technology': {
        title: 'IT Support Specialist',
        salary: { min: 35000, max: 55000, median: 45000 },
        growth: '8%', satisfaction: 65, timeToCareer: '0-1 years',
        advancement: 'Limited without further education or certifications'
    },
    'community_college-technology': {
        title: 'Web Developer / Network Technician',
        salary: { min: 45000, max: 70000, median: 57500 },
        growth: '13%', satisfaction: 75, timeToCareer: '6 months - 1 year',
        advancement: 'Good opportunities with experience and certifications'
    },
    'bachelor-technology': {
        title: 'Software Engineer / Systems Analyst',
        salary: { min: 70000, max: 130000, median: 95000 },
        growth: '25%', satisfaction: 85, timeToCareer: '0-6 months',
        advancement: 'Excellent - management, senior roles, technical leadership'
    },
    'masters-technology': {
        title: 'Senior Software Architect / Tech Lead',
        salary: { min: 110000, max: 180000, median: 140000 },
        growth: '25%', satisfaction: 88, timeToCareer: 'Immediate',
        advancement: 'Executive track, CTO positions possible'
    },
    'phd-technology': {
        title: 'Research Scientist / AI Researcher',
        salary: { min: 120000, max: 200000, median: 160000 },
        growth: '30%', satisfaction: 90, timeToCareer: 'Immediate',
        advancement: 'Leading research teams, founding startups, academic positions'
    },
    'trade_school-trades': {
        title: 'Electrician / Plumber / HVAC Technician',
        salary: { min: 45000, max: 85000, median: 65000 },
        growth: '10%', satisfaction: 80, timeToCareer: '0-6 months',
        advancement: 'Own business opportunities, specialized services'
    },
    'bachelor-healthcare': {
        title: 'Registered Nurse / Medical Technologist',
        salary: { min: 55000, max: 90000, median: 72500 },
        growth: '15%', satisfaction: 82, timeToCareer: '0-1 year',
        advancement: 'Nurse practitioner, management roles possible'
    },
    'masters-healthcare': {
        title: 'Nurse Practitioner / Physician Assistant',
        salary: { min: 95000, max: 140000, median: 115000 },
        growth: '28%', satisfaction: 90, timeToCareer: 'Immediate',
        advancement: 'Private practice, specialization opportunities'
    },
    'phd-healthcare': {
        title: 'Medical Doctor / Research Scientist',
        salary: { min: 200000, max: 400000, median: 300000 },
        growth: '7%', satisfaction: 88, timeToCareer: '3-8 years (residency)',
        advancement: 'Specialization, hospital leadership, research'
    },
    'bachelor-business': {
        title: 'Business Analyst / Marketing Manager',
        salary: { min: 55000, max: 95000, median: 75000 },
        growth: '8%', satisfaction: 72, timeToCareer: '0-1 year',
        advancement: 'Management track, executive opportunities'
    },
    'masters-business': {
        title: 'Senior Manager / Business Consultant',
        salary: { min: 90000, max: 150000, median: 120000 },
        growth: '8%', satisfaction: 78, timeToCareer: 'Immediate',
        advancement: 'C-suite potential, entrepreneurship opportunities'
    },
    'bachelor-education': {
        title: 'Teacher / Training Specialist',
        salary: { min: 40000, max: 70000, median: 55000 },
        growth: '8%', satisfaction: 75, timeToCareer: '0-6 months',
        advancement: 'Principal, curriculum development, district leadership'
    },
    'masters-education': {
        title: 'Principal / Curriculum Director',
        salary: { min: 70000, max: 110000, median: 90000 },
        growth: '8%', satisfaction: 80, timeToCareer: 'Immediate',
        advancement: 'Superintendent, policy development, consulting'
    }
};

// Application state
let currentStep = 1;
let selectedEducation = null;
let selectedField = null;
let simulationResults = null;
let savedPaths = [];

// Initialize the application
function init() {
    loadSavedPaths();
    renderEducationOptions();
    updateProgressBar();
}

// Load saved paths from localStorage
function loadSavedPaths() {
    try {
        const saved = localStorage.getItem('careerPaths');
        savedPaths = saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.warn('Error loading saved paths:', error);
        savedPaths = [];
    }
}

// Save paths to localStorage
function savePaths() {
    try {
        localStorage.setItem('careerPaths', JSON.stringify(savedPaths));
    } catch (error) {
        console.warn('Error saving paths:', error);
    }
}

// Render education options
function renderEducationOptions() {
    const container = document.getElementById('education-options');
    container.innerHTML = '';

    educationPaths.forEach(education => {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.onclick = () => selectEducation(education.id, card);
        
        card.innerHTML = `
            <div class="option-header">
                <div>
                    <div class="option-title">${education.title}</div>
                    <div class="option-description">${education.description}</div>
                </div>
            </div>
            <div class="option-details">
                <div class="detail-item">
                    <span class="detail-label">Duration:</span>
                    <span class="detail-value">${education.duration}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Est. Cost:</span>
                    <span class="detail-value">$${education.cost.toLocaleString()}</span>
                </div>
            </div>
            <div class="skills-section">
                <div class="skills-title">Key Skills Developed:</div>
                <div class="skills-tags">
                    ${education.skills.slice(0, 4).map(skill => 
                        `<span class="skill-tag">${skill}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Render field options
function renderFieldOptions() {
    const container = document.getElementById('field-options');
    container.innerHTML = '';

    fields.forEach(field => {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.onclick = () => selectField(field.id, card);
        
        const growthColor = field.growth === 'High' ? '#10b981' : 
                          field.growth === 'Medium' ? '#f59e0b' : '#ef4444';
        
        card.innerHTML = `
            <div class="option-header">
                <div>
                    <div class="option-title">${field.name}</div>
                    <div style="margin-top: 15px;">
                        <div class="detail-item">
                            <span class="detail-label">Growth Outlook:</span>
                            <span class="detail-value" style="color: ${growthColor};">${field.growth}</span>
                        </div>
                        <div class="detail-item" style="margin-top: 8px;">
                            <span class="detail-label">Market Demand:</span>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <div class="demand-bar" style="width: 60px;">
                                    <div class="demand-fill" style="width: ${field.demand}%;"></div>
                                </div>
                                <span class="detail-value">${field.demand}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Select education path
function selectEducation(educationId, cardElement) {
    selectedEducation = educationId;
    
    // Highlight selected option
    document.querySelectorAll('#education-options .option-card').forEach(card => {
        card.classList.remove('selected');
    });
    cardElement.classList.add('selected');
    
    // Move to next step after a brief delay
    setTimeout(() => {
        currentStep = 2;
        updateProgressBar();
        showStep('field-step');
        renderFieldOptions();
    }, 500);
}

// Select field
function selectField(fieldId, cardElement) {
    selectedField = fieldId;
    
    // Highlight selected option
    document.querySelectorAll('#field-options .option-card').forEach(card => {
        card.classList.remove('selected');
    });
    cardElement.classList.add('selected');
    
    // Calculate and show results
    setTimeout(() => {
        calculateResults();
        currentStep = 3;
        updateProgressBar();
        showStep('results-step');
        displayResults();
    }, 500);
}

// Calculate career results
function calculateResults() {
    const educationData = educationPaths.find(e => e.id === selectedEducation);
    const fieldData = fields.find(f => f.id === selectedField);
    const outcomeKey = `${selectedEducation}-${selectedField}`;
    let outcome = careerOutcomes[outcomeKey];

    // Generate estimated outcome if not explicitly defined
    if (!outcome) {
        const baseSalary = getBaseSalaryByEducation(selectedEducation);
        const fieldMultiplier = fieldData.demand / 75; // Normalize around business average
        
        outcome = {
            title: `${fieldData.name} Professional`,
            salary: {
                min: Math.round(baseSalary * fieldMultiplier * 0.8),
                max: Math.round(baseSalary * fieldMultiplier * 1.4),
                median: Math.round(baseSalary * fieldMultiplier)
            },
            growth: fieldData.growth === 'High' ? '15%' : fieldData.growth === 'Medium' ? '8%' : '5%',
            satisfaction: Math.round(65 + (fieldData.demand - 50) / 5),
            timeToCareer: getTimeToCareerByEducation(selectedEducation),
            advancement: 'Opportunities vary by field, performance, and continued learning',
            isEstimated: true
        };
    }

    simulationResults = {
        ...outcome,
        educationData,
        fieldData,
        totalCost: educationData.cost,
        totalTime: educationData.duration
    };
}

// Helper function to get base salary by education level
function getBaseSalaryByEducation(educationId) {
    const salaryMap = {
        'phd': 120000,
        'masters': 85000,
        'bachelor': 65000,
        'community_college': 45000,
        'trade_school': 50000,
        'highschool': 35000
    };
    return salaryMap[educationId] || 35000;
}

// Helper function to get time to career by education level
function getTimeToCareerByEducation(educationId) {
    const timeMap = {
        'phd': '1-2 years',
        'masters': '0-6 months',
        'bachelor': '0-1 year',
        'community_college': '0-1 year',
        'trade_school': '0-6 months',
        'highschool': '0-1 years'
    };
    return timeMap[educationId] || '0-1 year';
}

// Display simulation results
function displayResults() {
    const results = simulationResults;
    
    // Update career title
    document.getElementById('career-name').textContent = results.title;
    
    // Show estimation notice if applicable
    const estimateElement = document.getElementById('career-estimate');
    if (results.isEstimated) {
        estimateElement.textContent = '* This is an estimated projection based on industry data';
        estimateElement.style.display = 'block';
    } else {
        estimateElement.style.display = 'none';
    }
    
    // Update result cards
    document.getElementById('salary-value').textContent = `${results.salary.median.toLocaleString()}`;
    document.getElementById('salary-range').textContent = 
        `Range: ${results.salary.min.toLocaleString()} - ${results.salary.max.toLocaleString()}`;
    document.getElementById('growth-value').textContent = results.growth;
    document.getElementById('satisfaction-value').textContent = `${results.satisfaction}%`;
    document.getElementById('time-value').textContent = results.timeToCareer;
    
    // Update investment details
    document.getElementById('total-cost').textContent = `${results.totalCost.toLocaleString()}`;
    document.getElementById('total-time').textContent = results.totalTime;
    
    // Calculate ROI timeline
    const roiMonths = results.totalCost > 0 ? 
        Math.round(results.totalCost / results.salary.median * 12) : 0;
    document.getElementById('roi-timeline').textContent = 
        roiMonths > 0 ? `${roiMonths} months` : 'Immediate';
    
    // Update advancement text
    document.getElementById('advancement-text').textContent = results.advancement;
    
    // Display skills
    const skillsContainer = document.getElementById('skills-display');
    skillsContainer.innerHTML = '';
    results.educationData.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
    
    // Show comparison section if there are saved paths
    if (savedPaths.length > 0) {
        showComparisonSection();
    }
}

// Show specific step
function showStep(stepId) {
    // Hide all steps
    document.querySelectorAll('#content-area > div').forEach(step => {
        step.classList.add('hidden');
    });
    
    // Show target step with animation
    const targetStep = document.getElementById(stepId);
    targetStep.classList.remove('hidden');
    targetStep.classList.add('animate-in');
}

// Update progress bar
function updateProgressBar() {
    // Update step numbers
    for (let i = 1; i <= 3; i++) {
        const stepElement = document.getElementById(`step-${i}`);
        if (i <= currentStep) {
            stepElement.classList.remove('inactive');
            stepElement.classList.add('active');
        } else {
            stepElement.classList.remove('active');
            stepElement.classList.add('inactive');
        }
    }
    
    // Update connectors
    for (let i = 1; i <= 2; i++) {
        const connector = document.getElementById(`connector-${i}`);
        if (i < currentStep) {
            connector.classList.add('active');
        } else {
            connector.classList.remove('active');
        }
    }
}

// Save current path
function savePath() {
    if (!simulationResults) {
        alert('No results to save. Please complete the simulation first.');
        return;
    }
    
    const pathId = `${selectedEducation}-${selectedField}`;
    const newPath = {
        id: pathId,
        education: selectedEducation,
        field: selectedField,
        results: simulationResults,
        savedAt: new Date().toLocaleString()
    };
    
    // Remove existing path with same ID and add new one
    savedPaths = savedPaths.filter(p => p.id !== pathId);
    savedPaths.push(newPath);
    
    // Save to localStorage
    savePaths();
    
    // Show success message
    showNotification('Career path saved successfully!', 'success');
    
    // Update comparison section
    showComparisonSection();
}

// Show comparison section
function showComparisonSection() {
    const section = document.getElementById('comparison-section');
    const container = document.getElementById('saved-paths');
    
    container.innerHTML = '';
    
    savedPaths.forEach(path => {
        const card = document.createElement('div');
        card.className = 'comparison-card';
        
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                <div>
                    <h4 style="font-weight: bold; color: #1e293b; margin-bottom: 5px;">
                        ${path.results.title}
                    </h4>
                    <p style="font-size: 0.9rem; color: #64748b;">
                        ${path.results.educationData.title} → ${path.results.fieldData.name}
                    </p>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: bold; color: #10b981; font-size: 1.1rem;">
                        ${path.results.salary.median.toLocaleString()}
                    </div>
                    <div style="font-size: 0.75rem; color: #64748b;">
                        ${path.savedAt}
                    </div>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; font-size: 0.8rem; margin-bottom: 10px;">
                <div style="text-align: center;">
                    <div style="font-weight: 600;">${path.results.growth}</div>
                    <div style="color: #64748b;">Growth</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-weight: 600;">${path.results.satisfaction}%</div>
                    <div style="color: #64748b;">Satisfaction</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-weight: 600;">${path.results.totalCost.toLocaleString()}</div>
                    <div style="color: #64748b;">Ed. Cost</div>
                </div>
            </div>
            <button onclick="deletePath('${path.id}')" 
                    style="background: #ef4444; color: white; border: none; padding: 8px 12px; border-radius: 6px; font-size: 0.8rem; cursor: pointer; transition: background 0.3s ease;"
                    onmouseover="this.style.background='#dc2626'" 
                    onmouseout="this.style.background='#ef4444'">
                Delete Path
            </button>
        `;
        
        container.appendChild(card);
    });
    
    section.classList.remove('hidden');
}

// Delete saved path
function deletePath(pathId) {
    if (confirm('Are you sure you want to delete this career path?')) {
        savedPaths = savedPaths.filter(p => p.id !== pathId);
        savePaths();
        
        showNotification('Career path deleted', 'info');
        
        if (savedPaths.length === 0) {
            document.getElementById('comparison-section').classList.add('hidden');
        } else {
            showComparisonSection();
        }
    }
}

// Reset simulator
function resetSimulator() {
    if (confirm('Are you sure you want to start over? This will reset your current progress.')) {
        currentStep = 1;
        selectedEducation = null;
        selectedField = null;
        simulationResults = null;
        
        updateProgressBar();
        showStep('education-step');
        renderEducationOptions();
        
        // Hide comparison section
        document.getElementById('comparison-section').classList.add('hidden');
        
        showNotification('Simulator reset', 'info');
    }
}

// Show notification (simple alert replacement)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        info: '#3b82f6',
        warning: '#f59e0b',
        error: '#ef4444'
    };
    notification.style.background = colors[type] || colors.info;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animations to page
function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the application when page loads
document.addEventListener('DOMContentLoaded', function() {
    addNotificationStyles();
    init();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.step) {
        currentStep = event.state.step;
        updateProgressBar();
        
        if (currentStep === 1) {
            showStep('education-step');
        } else if (currentStep === 2) {
            showStep('field-step');
        } else if (currentStep === 3) {
            showStep('results-step');
        }
    }
});

// Add state to history when navigating steps
function addToHistory(step) {
    const state = { step: step };
    const url = `${window.location.pathname}?step=${step}`;
    window.history.pushState(state, `Step ${step}`, url);
}