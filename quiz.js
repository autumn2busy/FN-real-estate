/* ========================================
   FlyNerd Tech - AI Readiness Quiz Logic
   Scoring & Intel Generation for Sales Team
   ======================================== */

// Quiz Questions - Designed to extract actionable sales intel
const quizQuestions = [
    {
        id: 'data_maturity',
        category: 'Data Infrastructure',
        question: 'How would you describe your current data situation?',
        options: [
            {
                label: 'Scattered across spreadsheets and emails',
                description: 'We rely on manual tracking, exports, and tribal knowledge.',
                score: 1,
                intel: 'Major opportunity for data consolidation and automation. Start with quick wins in workflow automation.'
            },
            {
                label: 'Centralized but siloed',
                description: 'Data lives in systems, but they don\'t talk to each other well.',
                score: 2,
                intel: 'Integration and ETL opportunity. They have data but need unified pipelines.'
            },
            {
                label: 'Integrated and accessible',
                description: 'Most systems are connected and we can pull reports when needed.',
                score: 3,
                intel: 'Ready for analytics layer and AI. Focus on predictive capabilities.'
            },
            {
                label: 'Real-time and analytics-ready',
                description: 'We have dashboards, data warehouse, and make data-driven decisions daily.',
                score: 4,
                intel: 'Advanced prospect. Ready for ML/AI models and predictive automation.'
            }
        ]
    },
    {
        id: 'manual_processes',
        category: 'Workflow Automation',
        question: 'How much time does your team spend on repetitive, manual tasks?',
        options: [
            {
                label: 'Most of the day',
                description: 'We\'re constantly doing manual data entry, copy-pasting, reconciling.',
                score: 1,
                intel: 'Massive automation opportunity. Calculate time savings ($) to build urgency.'
            },
            {
                label: 'Several hours daily',
                description: 'Manual work is a significant part of our workflow but not all of it.',
                score: 2,
                intel: 'Good automation potential. Identify top 3 time-consuming processes.'
            },
            {
                label: 'An hour or two',
                description: 'We\'ve automated some things, but there\'s still friction.',
                score: 3,
                intel: 'Focus on optimization and AI enhancement of existing workflows.'
            },
            {
                label: 'Minimal',
                description: 'Most routine work is already automated.',
                score: 4,
                intel: 'Move conversation to AI-powered decision support and predictive capabilities.'
            }
        ]
    },
    {
        id: 'tech_stack',
        category: 'Technology Stack',
        question: 'What best describes your current technology ecosystem?',
        options: [
            {
                label: 'Basic tools only',
                description: 'Mostly email, spreadsheets, maybe basic accounting software.',
                score: 1,
                intel: 'Greenfield opportunity. Full stack build potential. Focus on quick wins first to build trust.'
            },
            {
                label: 'Mix of point solutions',
                description: 'We have various SaaS tools but they\'re not well integrated.',
                score: 2,
                intel: 'Integration and orchestration opportunity. Audit their current stack for consolidation.'
            },
            {
                label: 'Integrated cloud stack',
                description: 'We use modern tools that integrate fairly well together.',
                score: 3,
                intel: 'Enhancement opportunity. Look for AI augmentation and custom development.'
            },
            {
                label: 'Custom enterprise systems',
                description: 'We have custom-built systems or heavily customized enterprise software.',
                score: 4,
                intel: 'Enterprise-level engagement. Focus on AI/ML integration and modernization.'
            }
        ]
    },
    {
        id: 'ai_experience',
        category: 'AI Adoption',
        question: 'What\'s your team\'s current experience with AI/automation tools?',
        options: [
            {
                label: 'Curious but haven\'t started',
                description: 'We\'re interested but don\'t know where to begin.',
                score: 1,
                intel: 'Education-first approach. Provide roadmap and quick wins to build confidence.'
            },
            {
                label: 'Experimenting individually',
                description: 'Some people use ChatGPT or AI tools, but nothing systematic.',
                score: 2,
                intel: 'Opportunity to formalize and scale. They have early adopters internally.'
            },
            {
                label: 'Using AI in some workflows',
                description: 'We\'ve integrated AI tools into specific processes.',
                score: 3,
                intel: 'Expansion opportunity. Identify what\'s working and scale it.'
            },
            {
                label: 'AI is central to operations',
                description: 'AI powers multiple critical business functions.',
                score: 4,
                intel: 'Advanced engagement. Focus on optimization, custom models, and new use cases.'
            }
        ]
    },
    {
        id: 'pain_points',
        category: 'Business Challenges',
        question: 'What\'s your biggest operational challenge right now?',
        options: [
            {
                label: 'Can\'t find information fast enough',
                description: 'Knowledge is scattered and hard to access when needed.',
                score: 2,
                intel: 'Knowledge base / RAG opportunity. AI-powered search and documentation.',
                opportunity: 'AI Knowledge Base'
            },
            {
                label: 'Customer response times are too slow',
                description: 'We struggle to respond to customers quickly.',
                score: 2,
                intel: 'AI chatbot / customer service automation opportunity.',
                opportunity: 'AI Customer Service'
            },
            {
                label: 'Manual work is eating up time',
                description: 'Too much repetitive work, not enough time for strategic tasks.',
                score: 2,
                intel: 'Workflow automation opportunity. Calculate ROI on time saved.',
                opportunity: 'Workflow Automation'
            },
            {
                label: 'Data-driven decisions are hard',
                description: 'We have data but can\'t turn it into actionable insights.',
                score: 2,
                intel: 'Analytics and BI opportunity. Dashboards and predictive insights.',
                opportunity: 'Analytics & BI'
            }
        ]
    },
    {
        id: 'decision_speed',
        category: 'Decision Making',
        question: 'How quickly can your organization make technology investment decisions?',
        options: [
            {
                label: 'Very slow (6+ months)',
                description: 'Multiple stakeholders, long approval chains.',
                score: 1,
                intel: 'Long sales cycle expected. Focus on champion-building and executive buy-in.'
            },
            {
                label: 'Moderate (2-6 months)',
                description: 'Needs some approvals but not overly bureaucratic.',
                score: 2,
                intel: 'Standard B2B cycle. Build clear ROI case for decision makers.'
            },
            {
                label: 'Quick (1-2 months)',
                description: 'We can move fast if the case is compelling.',
                score: 3,
                intel: 'Quick close potential. Focus on compelling demo and proof of value.'
            },
            {
                label: 'Very fast (weeks)',
                description: 'Decision makers are empowered and can move immediately.',
                score: 4,
                intel: 'Hot prospect. Move quickly to proposal. Direct line to decision maker.'
            }
        ]
    },
    {
        id: 'budget',
        category: 'Investment Readiness',
        question: 'What\'s your expected investment range for technology improvements this year?',
        options: [
            {
                label: 'Just exploring (no budget yet)',
                description: 'We\'re researching options but haven\'t allocated funds.',
                score: 1,
                intel: 'Early stage. Nurture with content, build case for budget allocation.',
                budget_tier: 'Discovery'
            },
            {
                label: '$10K - $50K',
                description: 'We can invest in targeted improvements.',
                score: 2,
                intel: 'SMB tier. Focus on specific high-impact automations or integrations.',
                budget_tier: 'SMB'
            },
            {
                label: '$50K - $200K',
                description: 'Significant investment capacity for the right solution.',
                score: 3,
                intel: 'Mid-market tier. Full project scope possible. Multi-phase engagement.',
                budget_tier: 'Mid-Market'
            },
            {
                label: '$200K+',
                description: 'Enterprise budget for transformational initiatives.',
                score: 4,
                intel: 'Enterprise tier. Full digital transformation scope. Long-term partnership.',
                budget_tier: 'Enterprise'
            }
        ]
    },
    {
        id: 'timeline',
        category: 'Timeline',
        question: 'When do you need to see results?',
        options: [
            {
                label: 'No rush',
                description: 'We\'re planning for the future, not urgent.',
                score: 1,
                intel: 'Long nurture. Add to educational drip campaign.'
            },
            {
                label: 'Within 6 months',
                description: 'We want to make progress this year.',
                score: 2,
                intel: 'Medium urgency. Standard project timeline works.'
            },
            {
                label: 'Within 3 months',
                description: 'We have some urgency to improve.',
                score: 3,
                intel: 'Good urgency. Propose quick-start engagement.'
            },
            {
                label: 'ASAP',
                description: 'We have an immediate need or pain point.',
                score: 4,
                intel: 'Hot lead. Prioritize for immediate follow-up. Fast-track proposal.'
            }
        ]
    }
];

// Readiness Tiers with insights
const readinessTiers = {
    early: {
        minScore: 0,
        maxScore: 12,
        title: 'Early Explorer',
        color: '#f59e0b',
        insights: [
            'Your biggest opportunity is not AI itself — it\'s building the foundation first.',
            'Data and processes need structure before AI can deliver safe ROI.',
            'Starting small with targeted automation will create momentum and internal buy-in.'
        ],
        recommendation: 'We recommend starting with a Technology Assessment to identify quick wins and build the roadmap for your AI journey.'
    },
    emerging: {
        minScore: 13,
        maxScore: 20,
        title: 'Emerging Adopter',
        color: '#06b6d4',
        insights: [
            'You already feel the pain of manual work and disconnected systems.',
            'Your data foundation is forming, but prioritization is the missing piece.',
            'With the right guidance, AI can start removing real bottlenecks — fast.'
        ],
        recommendation: 'A focused Integration & Automation project could deliver 20-40 hours of time savings weekly within 90 days.'
    },
    ready: {
        minScore: 21,
        maxScore: 28,
        title: 'AI Ready',
        color: '#10b981',
        insights: [
            'Your systems and data are ready for practical AI adoption.',
            'The biggest risk now is choosing the wrong processes to automate first.',
            'Focused AI initiatives can immediately impact revenue or reduce costs.'
        ],
        recommendation: 'You\'re positioned for an AI-First Transformation. Let\'s identify your highest-ROI automation opportunities.'
    },
    advanced: {
        minScore: 29,
        maxScore: 32,
        title: 'AI Leader',
        color: '#8b5cf6',
        insights: [
            'You\'re fully ready for custom, scalable AI solutions.',
            'Delay now means competitors will operationalize AI faster than you.',
            'Custom AI deployment can start delivering value within 30 days.'
        ],
        recommendation: 'Enterprise AI Deployment is your next step. Let\'s discuss custom AI solutions tailored to your competitive advantage.'
    }
};

// State
let currentQuestion = 0;
let answers = {};
let contactData = {};

// DOM Elements
const screens = {
    intro: document.getElementById('quiz-intro'),
    questions: document.getElementById('quiz-questions'),
    contact: document.getElementById('quiz-contact'),
    results: document.getElementById('quiz-results')
};

const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const questionsContainer = document.getElementById('questions-container');
const prevBtn = document.getElementById('quiz-prev');
const nextBtn = document.getElementById('quiz-next');
const startBtn = document.getElementById('start-quiz');
const contactForm = document.getElementById('quiz-contact-form');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderQuestions();
    setupEventListeners();
});

function renderQuestions() {
    questionsContainer.innerHTML = quizQuestions.map((q, index) => `
        <div class="question ${index === 0 ? 'active' : ''}" data-question="${q.id}">
            <div class="question-header">
                <span class="question-category">${q.category}</span>
                <h2 class="question-text">${q.question}</h2>
            </div>
            <div class="question-options">
                ${q.options.map((opt, optIndex) => `
                    <label class="option" data-value="${optIndex}">
                        <input type="radio" name="${q.id}" value="${optIndex}" class="option-radio">
                        <div class="option-indicator"></div>
                        <div class="option-content">
                            <div class="option-label">${opt.label}</div>
                            ${opt.description ? `<div class="option-description">${opt.description}</div>` : ''}
                        </div>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Start quiz
    startBtn.addEventListener('click', () => {
        showScreen('questions');
    });

    // Option selection
    questionsContainer.addEventListener('click', (e) => {
        const option = e.target.closest('.option');
        if (!option) return;

        const question = option.closest('.question');
        const questionId = question.dataset.question;
        const value = parseInt(option.dataset.value);

        // Clear other selections
        question.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        option.querySelector('.option-radio').checked = true;

        // Store answer
        const questionData = quizQuestions.find(q => q.id === questionId);
        answers[questionId] = {
            optionIndex: value,
            option: questionData.options[value],
            score: questionData.options[value].score
        };

        // Enable next button
        nextBtn.disabled = false;
    });

    // Navigation
    prevBtn.addEventListener('click', goToPrevQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);

    // Contact form
    contactForm.addEventListener('submit', handleContactSubmit);
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenName].classList.add('active');
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
}

function goToPrevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function goToNextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        // Last question - go to contact form
        showScreen('contact');
    }
}

function showQuestion(index) {
    const questions = questionsContainer.querySelectorAll('.question');
    questions.forEach((q, i) => {
        q.classList.toggle('active', i === index);
    });

    updateProgress();

    // Update navigation
    prevBtn.disabled = index === 0;

    // Check if current question is answered
    const currentQ = quizQuestions[index];
    nextBtn.disabled = !answers[currentQ.id];

    // Update next button text for last question
    if (index === quizQuestions.length - 1) {
        nextBtn.innerHTML = '<span>See Results</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2"/></svg>';
    } else {
        nextBtn.innerHTML = '<span>Next</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2"/></svg>';
    }
}

function handleContactSubmit(e) {
    e.preventDefault();

    contactData = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        company: document.getElementById('contact-company').value,
        role: document.getElementById('contact-role').value
    };

    showScreen('results');
    calculateAndShowResults();
}

function calculateAndShowResults() {
    // Calculate total score
    const totalScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
    const maxScore = quizQuestions.length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);

    // Determine tier
    let tier;
    if (totalScore <= 12) tier = readinessTiers.early;
    else if (totalScore <= 20) tier = readinessTiers.emerging;
    else if (totalScore <= 28) tier = readinessTiers.ready;
    else tier = readinessTiers.advanced;

    // Animate score
    animateScore(percentage, tier.color);

    // Update title
    document.getElementById('results-badge').textContent = 'Your AI Readiness Score';
    document.getElementById('results-title').textContent = tier.title;
    document.getElementById('results-title').style.color = tier.color;

    // Build insights
    const insightsHTML = tier.insights.map((insight, i) => `
        <div class="insight-item">
            <div class="insight-icon">${['💡', '📊', '🚀'][i]}</div>
            <div class="insight-text">${insight}</div>
        </div>
    `).join('');

    // Add recommendation
    const recommendationHTML = `
        <div class="insight-item" style="border-color: ${tier.color}40; background: ${tier.color}10;">
            <div class="insight-icon">✨</div>
            <div class="insight-text"><strong>Our Recommendation:</strong> ${tier.recommendation}</div>
        </div>
    `;

    document.getElementById('results-insights').innerHTML = insightsHTML + recommendationHTML;

    // Build opportunities based on answers
    buildOpportunities();

    // Generate sales intel (hidden)
    generateSalesIntel(totalScore, tier);
}

function animateScore(targetScore, color) {
    const scoreValue = document.getElementById('score-value');
    const scoreCircle = document.getElementById('score-circle');

    // Add gradient definition
    const svg = scoreCircle.closest('svg');
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
        <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366f1"/>
            <stop offset="100%" stop-color="#a855f7"/>
        </linearGradient>
    `;
    svg.insertBefore(defs, svg.firstChild);

    // Animate number
    let current = 0;
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        current = Math.round(targetScore * easeProgress);
        scoreValue.textContent = current;

        // Animate circle
        const circumference = 339.292;
        const offset = circumference - (targetScore / 100) * circumference * easeProgress;
        scoreCircle.style.strokeDashoffset = offset;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function buildOpportunities() {
    const opportunities = [];

    // Extract opportunities from answers
    Object.entries(answers).forEach(([questionId, answer]) => {
        if (answer.option.opportunity) {
            opportunities.push({
                category: quizQuestions.find(q => q.id === questionId).category,
                title: answer.option.opportunity,
                description: answer.option.intel
            });
        }
    });

    // Add general opportunities based on low scores
    if (answers.data_maturity?.score <= 2) {
        opportunities.push({
            category: 'Foundation',
            title: 'Data Infrastructure',
            description: 'Consolidate and structure data for AI readiness.'
        });
    }

    if (answers.manual_processes?.score <= 2) {
        opportunities.push({
            category: 'Quick Win',
            title: 'Process Automation',
            description: 'Automate top 3 time-consuming manual workflows.'
        });
    }

    // Take top 4
    const topOpportunities = opportunities.slice(0, 4);

    document.getElementById('opportunities-list').innerHTML = topOpportunities.map(opp => `
        <div class="opportunity-card">
            <div class="opportunity-label">${opp.category}</div>
            <div class="opportunity-title">${opp.title}</div>
            <div class="opportunity-desc">${opp.description}</div>
        </div>
    `).join('');
}

function generateSalesIntel(totalScore, tier) {
    const intel = {
        timestamp: new Date().toISOString(),
        contact: contactData,
        score: {
            total: totalScore,
            percentage: Math.round((totalScore / 32) * 100),
            tier: tier.title
        },
        answers: {},
        insights: [],
        recommended_approach: '',
        urgency: 'Medium',
        estimated_budget: 'Unknown',
        decision_speed: 'Unknown'
    };

    // Process each answer for intel
    Object.entries(answers).forEach(([questionId, answer]) => {
        intel.answers[questionId] = {
            selected: answer.option.label,
            score: answer.score,
            sales_intel: answer.option.intel
        };
        intel.insights.push(answer.option.intel);

        // Extract specific intel
        if (questionId === 'budget' && answer.option.budget_tier) {
            intel.estimated_budget = answer.option.budget_tier;
        }

        if (questionId === 'decision_speed') {
            if (answer.score >= 3) intel.urgency = 'High';
            else if (answer.score <= 1) intel.urgency = 'Low';
        }

        if (questionId === 'timeline') {
            if (answer.score >= 3) intel.urgency = 'High';
        }
    });

    // Build recommended sales approach
    if (intel.urgency === 'High' && intel.estimated_budget !== 'Discovery') {
        intel.recommended_approach = 'HOT LEAD - Schedule call within 24 hours. Focus on quick-start engagement and fast time-to-value.';
    } else if (intel.estimated_budget === 'Enterprise') {
        intel.recommended_approach = 'Enterprise engagement - Long-term partnership positioning. Multi-stakeholder discovery needed.';
    } else if (intel.estimated_budget === 'Discovery') {
        intel.recommended_approach = 'Nurture phase - Educational content, build case for budget. Focus on ROI calculator.';
    } else {
        intel.recommended_approach = 'Standard engagement - Build compelling demo, focus on specific pain points identified.';
    }

    // Store as JSON for internal use / CRM push
    document.getElementById('results-intel').textContent = JSON.stringify(intel, null, 2);

    // Log to console for demo
    console.log('%c📊 SALES INTELLIGENCE REPORT', 'font-size: 16px; font-weight: bold; color: #6366f1;');
    console.log('%c' + intel.recommended_approach, 'font-size: 12px; color: #10b981; background: #10b98120; padding: 8px; border-radius: 4px;');
    console.table({
        'Contact': `${intel.contact.name} (${intel.contact.email})`,
        'Company': intel.contact.company,
        'Score': `${intel.score.percentage}% - ${intel.score.tier}`,
        'Budget Tier': intel.estimated_budget,
        'Urgency': intel.urgency
    });
    console.log('%cFull Response Data:', 'font-weight: bold;', intel);

    // In production, you would send this to your CRM/webhook
    // sendToCRM(intel);
}

// Helper to send to CRM (placeholder)
function sendToCRM(intel) {
    // Example: POST to n8n webhook, HubSpot, etc.
    // fetch('https://your-webhook-url.com/quiz-submission', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(intel)
    // });
}
