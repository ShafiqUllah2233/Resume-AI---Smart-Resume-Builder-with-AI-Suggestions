import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import resumeService from '../services/resumeService';
import pdfService from '../services/pdfService';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  PencilSquareIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';

const ResumePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await resumeService.getResumeById(id);
        setResume(response.data);
      } catch (error) {
        toast.error('Failed to load resume');
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, [id, navigate]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const blob = await pdfService.generatePDF(id);
      const filename = `${resume?.personalInfo?.firstName || 'Resume'}_${resume?.personalInfo?.lastName || ''}_Resume.pdf`;
      pdfService.downloadPDF(blob, filename);
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download resume');
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Resume not found</p>
        <Link to="/dashboard" className="btn btn-primary mt-4">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const { personalInfo, education, experience, skills, projects, certifications } = resume;

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 print:hidden">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{resume.title}</h1>
            <p className="text-gray-600">Preview your resume</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Link
            to={`/resume/edit/${id}`}
            className="btn btn-outline inline-flex items-center space-x-2"
          >
            <PencilSquareIcon className="w-5 h-5" />
            <span>Edit</span>
          </Link>
          <button
            onClick={handlePrint}
            className="btn btn-outline inline-flex items-center space-x-2"
          >
            <PrinterIcon className="w-5 h-5" />
            <span>Print</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            {isDownloading ? (
              <LoadingSpinner size="sm" color="white" />
            ) : (
              <ArrowDownTrayIcon className="w-5 h-5" />
            )}
            <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl mx-auto print:shadow-none print:rounded-none">
        <div className="p-8 sm:p-12 print:p-0">
          {/* Header Section */}
          <div className="text-center border-b-2 border-primary-600 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personalInfo?.firstName} {personalInfo?.lastName}
            </h1>
            <div className="text-gray-600 space-x-2 text-sm">
              {personalInfo?.email && <span>{personalInfo.email}</span>}
              {personalInfo?.phone && (
                <>
                  <span>•</span>
                  <span>{personalInfo.phone}</span>
                </>
              )}
              {(personalInfo?.city || personalInfo?.state) && (
                <>
                  <span>•</span>
                  <span>
                    {personalInfo.city}
                    {personalInfo.city && personalInfo.state && ', '}
                    {personalInfo.state}
                  </span>
                </>
              )}
            </div>
            <div className="mt-2 text-sm text-primary-600 space-x-4">
              {personalInfo?.linkedin && (
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {personalInfo?.github && (
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {personalInfo?.portfolio && (
                <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer">
                  Portfolio
                </a>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {personalInfo?.summary && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-primary-600 border-b border-gray-200 pb-1 mb-3">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-primary-600 border-b border-gray-200 pb-1 mb-3">
                WORK EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.jobTitle}</h3>
                        <p className="text-gray-600 text-sm">
                          {exp.company}
                          {exp.location && ` • ${exp.location}`}
                        </p>
                      </div>
                      <span className="text-gray-500 text-sm whitespace-nowrap">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.responsibilities && (
                      <div className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                        {exp.responsibilities}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-primary-600 border-b border-gray-200 pb-1 mb-3">
                EDUCATION
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {edu.degree}
                          {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                        </h3>
                        <p className="text-gray-600 text-sm">{edu.institution}</p>
                      </div>
                      <span className="text-gray-500 text-sm whitespace-nowrap">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </span>
                    </div>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-primary-600 border-b border-gray-200 pb-1 mb-3">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-primary-600 border-b border-gray-200 pb-1 mb-3">
                PROJECTS
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {project.technologies && (
                      <p className="text-sm text-gray-600">{project.technologies}</p>
                    )}
                    {project.description && (
                      <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                    )}
                    <div className="flex space-x-4 mt-1">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:underline"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-primary-600 border-b border-gray-200 pb-1 mb-3">
                CERTIFICATIONS
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                    </div>
                    {cert.issueDate && (
                      <span className="text-gray-500 text-sm">
                        {formatDate(cert.issueDate)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
