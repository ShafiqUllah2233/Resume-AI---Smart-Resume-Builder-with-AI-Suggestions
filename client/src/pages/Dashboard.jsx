import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import resumeService from '../services/resumeService';
import {
  PlusIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';
import pdfService from '../services/pdfService';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await resumeService.getResumes();
      setResumes(response.data);
    } catch (error) {
      toast.error('Failed to fetch resumes');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    setDeletingId(id);
    try {
      await resumeService.deleteResume(id);
      setResumes(resumes.filter((resume) => resume._id !== id));
      toast.success('Resume deleted successfully');
    } catch (error) {
      toast.error('Failed to delete resume');
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const response = await resumeService.duplicateResume(id);
      setResumes([response.data, ...resumes]);
      toast.success('Resume duplicated successfully');
    } catch (error) {
      toast.error('Failed to duplicate resume');
      console.error(error);
    }
  };

  const handleDownload = async (id, title) => {
    setDownloadingId(id);
    try {
      const blob = await pdfService.generatePDF(id);
      pdfService.downloadPDF(blob, `${title || 'resume'}.pdf`);
      toast.success('Resume downloaded successfully');
    } catch (error) {
      toast.error('Failed to download resume');
      console.error(error);
    } finally {
      setDownloadingId(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
          <p className="text-gray-600 mt-1">
            Create, edit, and manage your professional resumes
          </p>
        </div>
        <Link
          to="/resume/new"
          className="mt-4 sm:mt-0 inline-flex items-center space-x-2 btn btn-primary"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create New Resume</span>
        </Link>
      </div>

      {/* Resume Grid */}
      {resumes.length === 0 ? (
        <div className="text-center py-16 card">
          <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No resumes yet
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by creating your first professional resume
          </p>
          <Link
            to="/resume/new"
            className="inline-flex items-center space-x-2 btn btn-primary"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Create Your First Resume</span>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="card hover:shadow-md transition-shadow group"
            >
              {/* Resume Preview Placeholder */}
              <div className="aspect-[8.5/11] bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                <div className="p-4">
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-200 rounded w-5/6" />
                    <div className="h-2 bg-gray-200 rounded w-4/6" />
                  </div>
                </div>
                {resume.isDefault && (
                  <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                    Default
                  </div>
                )}
              </div>

              {/* Resume Info */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 truncate max-w-[200px]">
                    {resume.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Updated {formatDate(resume.updatedAt)}
                  </p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                  {resume.template}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/resume/edit/${resume._id}`}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </Link>
                  <Link
                    to={`/resume/preview/${resume._id}`}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Preview"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDuplicate(resume._id)}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Duplicate"
                  >
                    <DocumentDuplicateIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDownload(resume._id, resume.title)}
                    disabled={downloadingId === resume._id}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Download PDF"
                  >
                    {downloadingId === resume._id ? (
                      <LoadingSpinner size="sm" color="gray" />
                    ) : (
                      <ArrowDownTrayIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(resume._id)}
                  disabled={deletingId === resume._id}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  {deletingId === resume._id ? (
                    <LoadingSpinner size="sm" color="gray" />
                  ) : (
                    <TrashIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          ))}

          {/* Add New Resume Card */}
          <Link
            to="/resume/new"
            className="card border-2 border-dashed border-gray-300 hover:border-primary-400 hover:bg-primary-50 transition-colors flex items-center justify-center min-h-[400px] group"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 group-hover:bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <PlusIcon className="w-8 h-8 text-gray-400 group-hover:text-primary-600" />
              </div>
              <p className="font-medium text-gray-600 group-hover:text-primary-600">
                Create New Resume
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
