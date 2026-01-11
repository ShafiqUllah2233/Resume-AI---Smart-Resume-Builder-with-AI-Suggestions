import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import userService from '../services/userService';
import { ButtonLoader } from '../components/LoadingSpinner';
import {
  UserCircleIcon,
  KeyIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const ProfileSettings = () => {
  const { user, updateUser, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const profileForm = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const passwordForm = useForm();

  const handleProfileUpdate = async (data) => {
    setIsUpdating(true);
    try {
      const response = await userService.updateProfile(data);
      updateUser(response.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsUpdating(true);
    try {
      await userService.updatePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password updated successfully');
      passwordForm.reset();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await userService.deleteAccount();
      toast.success('Account deleted successfully');
      logout();
    } catch (error) {
      toast.error('Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserCircleIcon },
    { id: 'password', label: 'Password', icon: KeyIcon },
    { id: 'danger', label: 'Danger Zone', icon: TrashIcon },
  ];

  return (
    <div className="fade-in max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-48">
          <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
              <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-6">
                <div>
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    {...profileForm.register('name', { required: 'Name is required' })}
                    className="input"
                  />
                  {profileForm.formState.errors.name && (
                    <p className="error-message">{profileForm.formState.errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="label">Email Address</label>
                  <input
                    type="email"
                    {...profileForm.register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Please enter a valid email',
                      },
                    })}
                    className="input"
                  />
                  {profileForm.formState.errors.email && (
                    <p className="error-message">{profileForm.formState.errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="btn btn-primary"
                >
                  {isUpdating ? <ButtonLoader /> : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h2>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="space-y-6">
                <div>
                  <label className="label">Current Password</label>
                  <input
                    type="password"
                    {...passwordForm.register('currentPassword', {
                      required: 'Current password is required',
                    })}
                    className="input"
                  />
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="error-message">
                      {passwordForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">New Password</label>
                  <input
                    type="password"
                    {...passwordForm.register('newPassword', {
                      required: 'New password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    className="input"
                  />
                  {passwordForm.formState.errors.newPassword && (
                    <p className="error-message">
                      {passwordForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">Confirm New Password</label>
                  <input
                    type="password"
                    {...passwordForm.register('confirmPassword', {
                      required: 'Please confirm your password',
                    })}
                    className="input"
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="error-message">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="btn btn-primary"
                >
                  {isUpdating ? <ButtonLoader /> : 'Update Password'}
                </button>
              </form>
            </div>
          )}

          {/* Danger Zone Tab */}
          {activeTab === 'danger' && (
            <div className="card border-red-200">
              <h2 className="text-lg font-semibold text-red-600 mb-6">Danger Zone</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-red-900">Delete Account</h3>
                    <p className="text-sm text-red-700 mt-1">
                      Once you delete your account, all of your data including resumes will be permanently removed. 
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>

              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="btn btn-danger"
                >
                  Delete Account
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">
                    Are you absolutely sure? Type <strong>DELETE</strong> to confirm.
                  </p>
                  <input
                    type="text"
                    placeholder="Type DELETE to confirm"
                    className="input"
                    id="delete-confirm"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        const input = document.getElementById('delete-confirm');
                        if (input.value === 'DELETE') {
                          handleDeleteAccount();
                        } else {
                          toast.error('Please type DELETE to confirm');
                        }
                      }}
                      disabled={isDeleting}
                      className="btn btn-danger"
                    >
                      {isDeleting ? <ButtonLoader /> : 'Yes, Delete My Account'}
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
