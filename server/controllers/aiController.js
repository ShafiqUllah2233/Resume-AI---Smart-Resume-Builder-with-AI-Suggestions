const AILog = require('../models/AILog');
const Resume = require('../models/Resume');

// Mock AI suggestions for when OpenAI API is not available
const mockAISuggestions = {
  experience: {
    'software engineer': [
      'Developed and maintained scalable RESTful APIs using Node.js and Express, serving 10,000+ daily users',
      'Implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 40%',
      'Collaborated with cross-functional teams to design and implement new features',
      'Optimized database queries resulting in 30% improvement in application performance',
      'Wrote comprehensive unit and integration tests achieving 85% code coverage',
    ],
    'frontend developer': [
      'Built responsive web applications using React.js and modern JavaScript ES6+',
      'Implemented state management solutions using Redux and Context API',
      'Created reusable component library that reduced development time by 25%',
      'Optimized application performance achieving 90+ Lighthouse scores',
      'Collaborated with UX designers to implement pixel-perfect designs',
    ],
    'data analyst': [
      'Analyzed large datasets using Python and SQL to derive actionable insights',
      'Created interactive dashboards using Tableau and Power BI for stakeholders',
      'Developed automated reporting systems saving 10+ hours weekly',
      'Performed statistical analysis to identify trends and patterns',
      'Collaborated with business teams to translate requirements into data solutions',
    ],
    'project manager': [
      'Led cross-functional teams of 10+ members to deliver projects on time and within budget',
      'Implemented Agile methodologies improving team velocity by 35%',
      'Managed project budgets exceeding $500K with consistent cost optimization',
      'Facilitated stakeholder communication and requirement gathering sessions',
      'Developed risk mitigation strategies reducing project delays by 40%',
    ],
    default: [
      'Collaborated with team members to achieve project objectives and deadlines',
      'Implemented process improvements resulting in increased efficiency',
      'Maintained documentation and ensured compliance with standards',
      'Communicated effectively with stakeholders at all levels',
      'Demonstrated problem-solving skills in challenging situations',
    ],
  },
  skills: {
    'software engineer': [
      'JavaScript', 'TypeScript', 'Python', 'Node.js', 'React.js',
      'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git',
      'REST APIs', 'GraphQL', 'CI/CD', 'Agile/Scrum', 'Testing',
    ],
    'frontend developer': [
      'HTML5', 'CSS3', 'JavaScript', 'React.js', 'Vue.js',
      'Tailwind CSS', 'SASS', 'Webpack', 'Redux', 'TypeScript',
      'Responsive Design', 'Accessibility', 'Git', 'Figma', 'Jest',
    ],
    'data analyst': [
      'Python', 'SQL', 'Excel', 'Tableau', 'Power BI',
      'Pandas', 'NumPy', 'Statistics', 'Data Visualization', 'ETL',
      'Machine Learning', 'R', 'Jupyter', 'Google Analytics', 'A/B Testing',
    ],
    default: [
      'Communication', 'Problem Solving', 'Team Collaboration', 'Time Management',
      'Critical Thinking', 'Adaptability', 'Leadership', 'Attention to Detail',
    ],
  },
  summary: {
    'software engineer': 'Results-driven Software Engineer with expertise in full-stack development and cloud technologies. Passionate about building scalable applications and writing clean, maintainable code.',
    'frontend developer': 'Creative Frontend Developer with a keen eye for design and user experience. Skilled in modern JavaScript frameworks and committed to building performant, accessible web applications.',
    'data analyst': 'Detail-oriented Data Analyst with strong analytical skills and experience in transforming complex data into actionable insights. Proficient in statistical analysis and data visualization.',
    default: 'Dedicated professional with strong problem-solving abilities and excellent communication skills. Committed to continuous learning and delivering high-quality results.',
  },
};

// Helper function to find best matching category
const findBestMatch = (input, categories) => {
  const inputLower = input.toLowerCase();
  for (const category of Object.keys(categories)) {
    if (inputLower.includes(category) || category.includes(inputLower)) {
      return category;
    }
  }
  return 'default';
};

// @desc    Get AI suggestions for experience bullet points
// @route   POST /api/ai/experience-suggestions
// @access  Private
const getExperienceSuggestions = async (req, res) => {
  try {
    const { jobTitle, company, responsibilities } = req.body;

    if (!jobTitle) {
      return res.status(400).json({
        success: false,
        message: 'Job title is required',
      });
    }

    // Find matching suggestions
    const matchedCategory = findBestMatch(jobTitle, mockAISuggestions.experience);
    let suggestions = mockAISuggestions.experience[matchedCategory];

    // Customize suggestions based on company if provided
    if (company) {
      suggestions = suggestions.map((suggestion) =>
        suggestion.replace(/company/gi, company)
      );
    }

    // Log AI usage
    await AILog.create({
      userId: req.user._id,
      promptType: 'experience',
      inputData: JSON.stringify({ jobTitle, company, responsibilities }),
      outputData: JSON.stringify(suggestions),
      tokensUsed: 0, // Mock doesn't use tokens
    });

    res.json({
      success: true,
      data: {
        suggestions,
        jobTitle,
      },
    });
  } catch (error) {
    console.error('Experience suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate suggestions',
    });
  }
};

// @desc    Get AI suggestions for skills
// @route   POST /api/ai/skills-suggestions
// @access  Private
const getSkillsSuggestions = async (req, res) => {
  try {
    const { jobTitle, currentSkills } = req.body;

    if (!jobTitle) {
      return res.status(400).json({
        success: false,
        message: 'Job title is required',
      });
    }

    const matchedCategory = findBestMatch(jobTitle, mockAISuggestions.skills);
    let suggestions = mockAISuggestions.skills[matchedCategory];

    // Filter out skills user already has
    if (currentSkills && Array.isArray(currentSkills)) {
      const currentSkillsLower = currentSkills.map((s) => s.toLowerCase());
      suggestions = suggestions.filter(
        (skill) => !currentSkillsLower.includes(skill.toLowerCase())
      );
    }

    // Log AI usage
    await AILog.create({
      userId: req.user._id,
      promptType: 'skills',
      inputData: JSON.stringify({ jobTitle, currentSkills }),
      outputData: JSON.stringify(suggestions),
      tokensUsed: 0,
    });

    res.json({
      success: true,
      data: {
        suggestions,
        jobTitle,
      },
    });
  } catch (error) {
    console.error('Skills suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate suggestions',
    });
  }
};

// @desc    Get AI-generated professional summary
// @route   POST /api/ai/summary-suggestions
// @access  Private
const getSummarySuggestions = async (req, res) => {
  try {
    const { jobTitle, experience, skills } = req.body;

    if (!jobTitle) {
      return res.status(400).json({
        success: false,
        message: 'Job title is required',
      });
    }

    const matchedCategory = findBestMatch(jobTitle, mockAISuggestions.summary);
    let summary = mockAISuggestions.summary[matchedCategory];

    // Generate variations
    const variations = [
      summary,
      `Experienced ${jobTitle} with a proven track record of delivering results. ${summary.split('. ')[1] || ''}`,
      `Dynamic ${jobTitle} professional seeking to leverage expertise in driving business success. Committed to excellence and continuous improvement.`,
    ];

    // Log AI usage
    await AILog.create({
      userId: req.user._id,
      promptType: 'summary',
      inputData: JSON.stringify({ jobTitle, experience, skills }),
      outputData: JSON.stringify(variations),
      tokensUsed: 0,
    });

    res.json({
      success: true,
      data: {
        suggestions: variations,
        jobTitle,
      },
    });
  } catch (error) {
    console.error('Summary suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate suggestions',
    });
  }
};

// @desc    Improve text with AI
// @route   POST /api/ai/improve-text
// @access  Private
const improveText = async (req, res) => {
  try {
    const { text, type } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required',
      });
    }

    // Simple improvements
    let improvedText = text
      .replace(/\bi\b/g, 'I')
      .replace(/\s+/g, ' ')
      .trim();

    // Add action verbs if missing
    const actionVerbs = ['Developed', 'Implemented', 'Managed', 'Created', 'Led', 'Designed'];
    const startsWithActionVerb = actionVerbs.some((verb) =>
      improvedText.toLowerCase().startsWith(verb.toLowerCase())
    );

    if (!startsWithActionVerb && type === 'experience') {
      const randomVerb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
      improvedText = `${randomVerb} ${improvedText.charAt(0).toLowerCase()}${improvedText.slice(1)}`;
    }

    // Log AI usage
    await AILog.create({
      userId: req.user._id,
      promptType: 'general',
      inputData: text,
      outputData: improvedText,
      tokensUsed: 0,
    });

    res.json({
      success: true,
      data: {
        original: text,
        improved: improvedText,
      },
    });
  } catch (error) {
    console.error('Improve text error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to improve text',
    });
  }
};

// @desc    Get ATS keywords for job title
// @route   POST /api/ai/ats-keywords
// @access  Private
const getATSKeywords = async (req, res) => {
  try {
    const { jobTitle, industry } = req.body;

    if (!jobTitle) {
      return res.status(400).json({
        success: false,
        message: 'Job title is required',
      });
    }

    const matchedCategory = findBestMatch(jobTitle, mockAISuggestions.skills);
    const keywords = mockAISuggestions.skills[matchedCategory];

    // Add some general ATS-friendly keywords
    const atsKeywords = [
      ...keywords,
      'Results-driven',
      'Team player',
      'Self-motivated',
      'Detail-oriented',
      'Strong communication',
    ];

    res.json({
      success: true,
      data: {
        keywords: [...new Set(atsKeywords)], // Remove duplicates
        jobTitle,
      },
    });
  } catch (error) {
    console.error('ATS keywords error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate keywords',
    });
  }
};

// @desc    Get AI usage stats (Admin only)
// @route   GET /api/ai/stats
// @access  Private/Admin
const getAIStats = async (req, res) => {
  try {
    const totalRequests = await AILog.countDocuments();
    const requestsByType = await AILog.aggregate([
      {
        $group: {
          _id: '$promptType',
          count: { $sum: 1 },
        },
      },
    ]);

    const recentRequests = await AILog.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('userId', 'name email');

    res.json({
      success: true,
      data: {
        totalRequests,
        requestsByType,
        recentRequests,
      },
    });
  } catch (error) {
    console.error('AI stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get AI stats',
    });
  }
};

module.exports = {
  getExperienceSuggestions,
  getSkillsSuggestions,
  getSummarySuggestions,
  improveText,
  getATSKeywords,
  getAIStats,
};
