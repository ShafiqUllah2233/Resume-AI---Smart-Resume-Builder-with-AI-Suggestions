import { useState, useCallback, useRef, useEffect } from 'react';
import resumeService from '../services/resumeService';
import useResumeStore from '../store/resumeStore';
import toast from 'react-hot-toast';

const useAutoSave = (resumeId, delay = 2000) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const timeoutRef = useRef(null);
  const resume = useResumeStore((state) => state.resume);
  const isDirty = useResumeStore((state) => state.isDirty);
  const setDirty = useResumeStore((state) => state.setDirty);

  const saveResume = useCallback(async () => {
    if (!resumeId || !isDirty) return;

    setIsSaving(true);
    try {
      await resumeService.updateResume(resumeId, resume);
      setLastSaved(new Date());
      setDirty(false);
    } catch (error) {
      console.error('Auto-save failed:', error);
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  }, [resumeId, resume, isDirty, setDirty]);

  // Debounced auto-save
  useEffect(() => {
    if (isDirty && resumeId) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        saveResume();
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isDirty, resumeId, saveResume, delay]);

  // Manual save
  const save = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    return saveResume();
  }, [saveResume]);

  return {
    isSaving,
    lastSaved,
    save,
  };
};

export default useAutoSave;
