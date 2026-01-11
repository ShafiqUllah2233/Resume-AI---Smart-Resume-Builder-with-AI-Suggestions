import React from 'react';
import useResumeStore from '../../store/resumeStore';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const ProjectsForm = () => {
  const { resume, addProject, updateProject, removeProject } = useResumeStore();
  const { projects } = resume;

  const handleChange = (id, field, value) => {
    updateProject(id, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Projects</h2>
          <p className="text-gray-600">Showcase your notable projects (Optional)</p>
        </div>
        <button
          onClick={addProject}
          className="btn btn-outline inline-flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 mb-4">No projects added yet</p>
          <button
            onClick={addProject}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Your First Project</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Project #{index + 1}</h3>
                <button
                  onClick={() => removeProject(project.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Project Name */}
                <div className="md:col-span-2">
                  <label className="label">Project Name *</label>
                  <input
                    type="text"
                    value={project.name || ''}
                    onChange={(e) => handleChange(project.id, 'name', e.target.value)}
                    className="input"
                    placeholder="E-commerce Platform"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="label">Description</label>
                  <textarea
                    value={project.description || ''}
                    onChange={(e) => handleChange(project.id, 'description', e.target.value)}
                    className="input min-h-[100px]"
                    placeholder="Brief description of the project, its purpose, and your role..."
                    rows={3}
                  />
                </div>

                {/* Technologies */}
                <div className="md:col-span-2">
                  <label className="label">Technologies Used</label>
                  <input
                    type="text"
                    value={project.technologies || ''}
                    onChange={(e) => handleChange(project.id, 'technologies', e.target.value)}
                    className="input"
                    placeholder="React, Node.js, MongoDB, AWS"
                  />
                </div>

                {/* Project Link */}
                <div>
                  <label className="label">Live Demo URL</label>
                  <input
                    type="url"
                    value={project.link || ''}
                    onChange={(e) => handleChange(project.id, 'link', e.target.value)}
                    className="input"
                    placeholder="https://myproject.com"
                  />
                </div>

                {/* GitHub Link */}
                <div>
                  <label className="label">GitHub URL</label>
                  <input
                    type="url"
                    value={project.github || ''}
                    onChange={(e) => handleChange(project.id, 'github', e.target.value)}
                    className="input"
                    placeholder="https://github.com/username/project"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="label">Start Date</label>
                  <input
                    type="month"
                    value={project.startDate || ''}
                    onChange={(e) => handleChange(project.id, 'startDate', e.target.value)}
                    className="input"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="label">End Date</label>
                  <input
                    type="month"
                    value={project.endDate || ''}
                    onChange={(e) => handleChange(project.id, 'endDate', e.target.value)}
                    className="input"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
