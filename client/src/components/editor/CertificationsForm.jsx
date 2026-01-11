import React from 'react';
import useResumeStore from '../../store/resumeStore';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const CertificationsForm = () => {
  const { resume, addCertification, updateCertification, removeCertification } = useResumeStore();
  const { certifications } = resume;

  const handleChange = (id, field, value) => {
    updateCertification(id, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Certifications</h2>
          <p className="text-gray-600">Add your professional certifications (Optional)</p>
        </div>
        <button
          onClick={addCertification}
          className="btn btn-outline inline-flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Certification</span>
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500 mb-4">No certifications added yet</p>
          <button
            onClick={addCertification}
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Your First Certification</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Certification #{index + 1}</h3>
                <button
                  onClick={() => removeCertification(cert.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Certification Name */}
                <div className="md:col-span-2">
                  <label className="label">Certification Name *</label>
                  <input
                    type="text"
                    value={cert.name || ''}
                    onChange={(e) => handleChange(cert.id, 'name', e.target.value)}
                    className="input"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>

                {/* Issuer */}
                <div>
                  <label className="label">Issuing Organization *</label>
                  <input
                    type="text"
                    value={cert.issuer || ''}
                    onChange={(e) => handleChange(cert.id, 'issuer', e.target.value)}
                    className="input"
                    placeholder="Amazon Web Services"
                  />
                </div>

                {/* Credential ID */}
                <div>
                  <label className="label">Credential ID</label>
                  <input
                    type="text"
                    value={cert.credentialId || ''}
                    onChange={(e) => handleChange(cert.id, 'credentialId', e.target.value)}
                    className="input"
                    placeholder="ABC123XYZ"
                  />
                </div>

                {/* Issue Date */}
                <div>
                  <label className="label">Issue Date</label>
                  <input
                    type="month"
                    value={cert.issueDate || ''}
                    onChange={(e) => handleChange(cert.id, 'issueDate', e.target.value)}
                    className="input"
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="label">Expiry Date (if applicable)</label>
                  <input
                    type="month"
                    value={cert.expiryDate || ''}
                    onChange={(e) => handleChange(cert.id, 'expiryDate', e.target.value)}
                    className="input"
                  />
                </div>

                {/* Credential URL */}
                <div className="md:col-span-2">
                  <label className="label">Credential URL</label>
                  <input
                    type="url"
                    value={cert.credentialUrl || ''}
                    onChange={(e) => handleChange(cert.id, 'credentialUrl', e.target.value)}
                    className="input"
                    placeholder="https://www.credential.net/..."
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

export default CertificationsForm;
