const puppeteer = require('puppeteer');
const Resume = require('../models/Resume');

// Resume HTML Templates
const generateResumeHTML = (resume, template = 'modern') => {
  const { personalInfo, education, experience, skills, projects, certifications } = resume;

  const styles = {
    modern: `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; background: #fff; }
        .container { max-width: 800px; margin: 0 auto; padding: 40px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
        .name { font-size: 32px; font-weight: 700; color: #1e3a5f; margin-bottom: 10px; }
        .contact { font-size: 14px; color: #666; }
        .contact a { color: #2563eb; text-decoration: none; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: 600; color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase; }
        .summary { font-size: 14px; color: #555; text-align: justify; }
        .item { margin-bottom: 15px; }
        .item-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px; }
        .item-title { font-weight: 600; color: #1e3a5f; }
        .item-subtitle { color: #666; font-size: 14px; }
        .item-date { color: #888; font-size: 13px; white-space: nowrap; }
        .item-description { font-size: 14px; color: #555; margin-top: 5px; }
        .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag { background: #e0e7ff; color: #3730a3; padding: 4px 12px; border-radius: 15px; font-size: 13px; }
        ul { padding-left: 20px; margin-top: 5px; }
        li { font-size: 14px; color: #555; margin-bottom: 3px; }
      </style>
    `,
    classic: `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Times New Roman', serif; line-height: 1.5; color: #000; background: #fff; }
        .container { max-width: 800px; margin: 0 auto; padding: 40px; }
        .header { text-align: center; margin-bottom: 25px; }
        .name { font-size: 28px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
        .contact { font-size: 12px; }
        .contact a { color: #000; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 10px; }
        .summary { font-size: 12px; text-align: justify; }
        .item { margin-bottom: 12px; }
        .item-header { display: flex; justify-content: space-between; }
        .item-title { font-weight: bold; }
        .item-subtitle { font-style: italic; font-size: 12px; }
        .item-date { font-size: 12px; }
        .item-description { font-size: 12px; margin-top: 3px; }
        .skills-list { font-size: 12px; }
        ul { padding-left: 18px; margin-top: 3px; }
        li { font-size: 12px; margin-bottom: 2px; }
      </style>
    `,
    minimal: `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #222; background: #fff; }
        .container { max-width: 800px; margin: 0 auto; padding: 40px; }
        .header { margin-bottom: 30px; }
        .name { font-size: 28px; font-weight: 300; margin-bottom: 5px; }
        .contact { font-size: 13px; color: #666; }
        .contact a { color: #666; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 12px; }
        .summary { font-size: 14px; color: #444; }
        .item { margin-bottom: 15px; }
        .item-title { font-weight: 500; }
        .item-subtitle { color: #666; font-size: 13px; }
        .item-date { color: #999; font-size: 12px; }
        .item-description { font-size: 13px; color: #555; margin-top: 5px; }
        .skills-list { display: flex; flex-wrap: wrap; gap: 15px; }
        .skill-tag { font-size: 13px; color: #444; }
        ul { padding-left: 18px; }
        li { font-size: 13px; color: #555; }
      </style>
    `,
  };

  const selectedStyle = styles[template] || styles.modern;

  const formatDate = (date) => {
    if (!date) return '';
    return date;
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''} - Resume</title>
      ${selectedStyle}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="name">${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}</div>
          <div class="contact">
            ${personalInfo?.email ? `<span>${personalInfo.email}</span>` : ''}
            ${personalInfo?.phone ? ` | <span>${personalInfo.phone}</span>` : ''}
            ${personalInfo?.city || personalInfo?.state ? ` | <span>${personalInfo.city || ''}${personalInfo.city && personalInfo.state ? ', ' : ''}${personalInfo.state || ''}</span>` : ''}
            <br>
            ${personalInfo?.linkedin ? `<a href="${personalInfo.linkedin}">LinkedIn</a>` : ''}
            ${personalInfo?.github ? ` | <a href="${personalInfo.github}">GitHub</a>` : ''}
            ${personalInfo?.portfolio ? ` | <a href="${personalInfo.portfolio}">Portfolio</a>` : ''}
          </div>
        </div>

        ${personalInfo?.summary ? `
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <p class="summary">${personalInfo.summary}</p>
          </div>
        ` : ''}

        ${experience?.length ? `
          <div class="section">
            <div class="section-title">Experience</div>
            ${experience.map(exp => `
              <div class="item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${exp.jobTitle || ''}</div>
                    <div class="item-subtitle">${exp.company || ''}${exp.location ? ` - ${exp.location}` : ''}</div>
                  </div>
                  <div class="item-date">${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</div>
                </div>
                ${exp.responsibilities ? `<div class="item-description">${exp.responsibilities.replace(/\n/g, '<br>')}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${education?.length ? `
          <div class="section">
            <div class="section-title">Education</div>
            ${education.map(edu => `
              <div class="item">
                <div class="item-header">
                  <div>
                    <div class="item-title">${edu.degree || ''} ${edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</div>
                    <div class="item-subtitle">${edu.institution || ''}</div>
                  </div>
                  <div class="item-date">${formatDate(edu.startDate)} - ${edu.current ? 'Present' : formatDate(edu.endDate)}</div>
                </div>
                ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${skills?.length ? `
          <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-list">
              ${skills.map(skill => `<span class="skill-tag">${skill.name || ''}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        ${projects?.length ? `
          <div class="section">
            <div class="section-title">Projects</div>
            ${projects.map(project => `
              <div class="item">
                <div class="item-title">${project.name || ''}</div>
                ${project.technologies ? `<div class="item-subtitle">${project.technologies}</div>` : ''}
                ${project.description ? `<div class="item-description">${project.description}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${certifications?.length ? `
          <div class="section">
            <div class="section-title">Certifications</div>
            ${certifications.map(cert => `
              <div class="item">
                <div class="item-header">
                  <div class="item-title">${cert.name || ''}</div>
                  <div class="item-date">${formatDate(cert.issueDate)}</div>
                </div>
                <div class="item-subtitle">${cert.issuer || ''}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </body>
    </html>
  `;

  return html;
};

// @desc    Generate PDF from resume
// @route   POST /api/pdf/generate/:id
// @access  Private
const generatePDF = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    const html = generateResumeHTML(resume, resume.template);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
      printBackground: true,
    });

    await browser.close();

    // Set response headers for PDF download
    const fileName = `${resume.personalInfo?.firstName || 'Resume'}_${resume.personalInfo?.lastName || ''}_Resume.pdf`
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_');

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF',
    });
  }
};

// @desc    Get resume HTML preview
// @route   GET /api/pdf/preview/:id
// @access  Private
const getPreview = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    const html = generateResumeHTML(resume, resume.template);

    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Preview generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate preview',
    });
  }
};

// @desc    Generate PDF from provided data (without saving)
// @route   POST /api/pdf/generate-preview
// @access  Private
const generatePreviewPDF = async (req, res) => {
  try {
    const { resumeData, template } = req.body;

    if (!resumeData) {
      return res.status(400).json({
        success: false,
        message: 'Resume data is required',
      });
    }

    const html = generateResumeHTML(resumeData, template || 'modern');

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
      printBackground: true,
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="resume-preview.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Preview PDF generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate preview PDF',
    });
  }
};

module.exports = {
  generatePDF,
  getPreview,
  generatePreviewPDF,
};
