import React from 'react';
import { Link } from 'react-router-dom';
import {
  SparklesIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const LandingPage = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Suggestions',
      description:
        'Get intelligent content suggestions for your experience, skills, and professional summary powered by AI.',
    },
    {
      icon: DocumentTextIcon,
      title: 'Professional Templates',
      description:
        'Choose from multiple professionally designed templates that are ATS-friendly and visually appealing.',
    },
    {
      icon: ArrowDownTrayIcon,
      title: 'Easy PDF Download',
      description:
        'Download your resume as a high-quality PDF ready to submit to employers instantly.',
    },
    {
      icon: CheckBadgeIcon,
      title: 'ATS Optimized',
      description:
        'Our resumes are optimized for Applicant Tracking Systems to help you pass the initial screening.',
    },
  ];

  const steps = [
    { number: '1', title: 'Create Account', description: 'Sign up for free in seconds' },
    { number: '2', title: 'Fill Your Details', description: 'Enter your professional information' },
    { number: '3', title: 'Get AI Suggestions', description: 'Enhance content with AI' },
    { number: '4', title: 'Download Resume', description: 'Export as professional PDF' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Resume AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SparklesIcon className="w-4 h-4" />
              <span>AI-Powered Resume Builder</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Create Professional Resumes
              <br />
              <span className="text-primary-600">with AI Assistance</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Build ATS-friendly resumes in minutes with our intelligent resume builder. 
              Get AI-powered suggestions to make your resume stand out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <span>Create Your Resume</span>
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <span>Login to Account</span>
              </Link>
            </div>
          </div>

          {/* Preview Image Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-b from-primary-100 to-primary-50 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full" />
                    <div>
                      <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
                      <div className="h-4 bg-gray-100 rounded w-32" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-4 bg-gray-100 rounded w-40 mb-1" />
                    <div className="h-4 bg-gray-100 rounded w-32" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-5/6" />
                  <div className="h-4 bg-gray-100 rounded w-4/6" />
                </div>
                <div className="grid grid-cols-2 gap-8 mt-8">
                  <div>
                    <div className="h-5 bg-primary-200 rounded w-24 mb-3" />
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-full" />
                      <div className="h-3 bg-gray-100 rounded w-4/5" />
                      <div className="h-3 bg-gray-100 rounded w-3/4" />
                    </div>
                  </div>
                  <div>
                    <div className="h-5 bg-primary-200 rounded w-24 mb-3" />
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 rounded w-full" />
                      <div className="h-3 bg-gray-100 rounded w-5/6" />
                      <div className="h-3 bg-gray-100 rounded w-4/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Create
              <br />
              <span className="text-primary-600">The Perfect Resume</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides all the tools you need to build a 
              professional resume that gets noticed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Create your professional resume in just 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of job seekers who have created winning resumes with our AI-powered builder.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            <span>Get Started for Free</span>
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Resume AI</span>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
