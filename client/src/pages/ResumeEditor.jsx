import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import resumeService from '../services/resumeService';
import useResumeStore from '../store/resumeStore';
import useAutoSave from '../hooks/useAutoSave';
import LoadingSpinner from '../components/LoadingSpinner';
import PersonalInfoForm from '../components/editor/PersonalInfoForm';
import EducationForm from '../components/editor/EducationForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import SkillsForm from '../components/editor/SkillsForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import CertificationsForm from '../components/editor/CertificationsForm';
import TemplateSelector from '../components/editor/TemplateSelector';
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const STEPS = [
  { id: 'personal', title: 'Personal Info', component: PersonalInfoForm },
  { id: 'education', title: 'Education', component: EducationForm },
  { id: 'experience', title: 'Experience', component: ExperienceForm },
  { id: 'skills', title: 'Skills', component: SkillsForm },
  { id: 'projects', title: 'Projects', component: ProjectsForm },
  { id: 'certifications', title: 'Certifications', component: CertificationsForm },
  { id: 'template', title: 'Template', component: TemplateSelector },
];

const ResumeEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(!!id);
  const [resumeId, setResumeId] = useState(id || null);
  const lastInitKeyRef = useRef(null);

  const {
    resume,
    setResume,
    resetResume,
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    setTitle,
  } = useResumeStore();

  const { isSaving, lastSaved, save } = useAutoSave(resumeId);

  // Fetch existing resume or create new one
  useEffect(() => {
    // React 18 StrictMode runs effects twice in development.
    // Guard against creating 2 resumes for the same route.
    const initKey = id || 'new';
    if (lastInitKeyRef.current === initKey) return;
    lastInitKeyRef.current = initKey;

    const initResume = async () => {
      if (id) {
        try {
          const response = await resumeService.getResumeById(id);
          setResume(response.data);
          setResumeId(id);
        } catch (error) {
          toast.error('Failed to load resume');
          navigate('/dashboard');
        }
      } else {
        resetResume();
        try {
          const response = await resumeService.createResume({
            title: 'Untitled Resume',
          });
          setResumeId(response.data._id);
          setResume(response.data);
        } catch (error) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            'Failed to create resume';
          toast.error(message);
          navigate('/dashboard');
        }
      }
      setIsLoading(false);
    };

    initResume();

    return () => {
      resetResume();
    };
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePreview = () => {
    if (resumeId) {
      navigate(`/resume/preview/${resumeId}`);
    }
  };

  const handleSave = async () => {
    await save();
    toast.success('Resume saved successfully');
  };

  const CurrentStepComponent = STEPS[currentStep].component;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            value={resume.title}
            onChange={handleTitleChange}
            className="text-2xl font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 w-full max-w-md"
            placeholder="Resume Title"
          />
          <p className="text-sm text-gray-500 mt-1">
            {isSaving ? (
              <span className="flex items-center space-x-2">
                <CloudArrowUpIcon className="w-4 h-4 animate-pulse" />
                <span>Saving...</span>
              </span>
            ) : lastSaved ? (
              `Last saved: ${lastSaved.toLocaleTimeString()}`
            ) : (
              'Auto-save enabled'
            )}
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button
            onClick={handleSave}
            className="btn btn-outline"
            disabled={isSaving}
          >
            Save
          </button>
          <button
            onClick={handlePreview}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <EyeIcon className="w-5 h-5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="hidden lg:flex items-center justify-between">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => setCurrentStep(index)}
                className="flex flex-col items-center group"
              >
                <div
                  className={`step-indicator ${
                    index === currentStep
                      ? 'active'
                      : index < currentStep
                      ? 'completed'
                      : 'inactive'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    index === currentStep
                      ? 'text-primary-600'
                      : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </button>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 rounded ${
                    index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile step indicator */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <span className="text-sm font-medium text-primary-600">
              {STEPS[currentStep].title}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full transition-all"
              style={{
                width: `${((currentStep + 1) / STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="card min-h-[400px]">
        <CurrentStepComponent />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="btn btn-outline inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Previous</span>
        </button>

        {currentStep === STEPS.length - 1 ? (
          <button
            onClick={handlePreview}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <EyeIcon className="w-5 h-5" />
            <span>Preview Resume</span>
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ResumeEditor;
