import { useState, useCallback } from 'react';
import aiService from '../services/aiService';
import toast from 'react-hot-toast';

const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const getExperienceSuggestions = useCallback(async (jobTitle, company, responsibilities) => {
    setIsLoading(true);
    try {
      const response = await aiService.getExperienceSuggestions({
        jobTitle,
        company,
        responsibilities,
      });
      setSuggestions(response.data.suggestions);
      return response.data.suggestions;
    } catch (error) {
      toast.error('Failed to get AI suggestions');
      console.error(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSkillsSuggestions = useCallback(async (jobTitle, currentSkills) => {
    setIsLoading(true);
    try {
      const response = await aiService.getSkillsSuggestions({
        jobTitle,
        currentSkills,
      });
      setSuggestions(response.data.suggestions);
      return response.data.suggestions;
    } catch (error) {
      toast.error('Failed to get skill suggestions');
      console.error(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSummarySuggestions = useCallback(async (jobTitle, experience, skills) => {
    setIsLoading(true);
    try {
      const response = await aiService.getSummarySuggestions({
        jobTitle,
        experience,
        skills,
      });
      setSuggestions(response.data.suggestions);
      return response.data.suggestions;
    } catch (error) {
      toast.error('Failed to get summary suggestions');
      console.error(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const improveText = useCallback(async (text, type) => {
    setIsLoading(true);
    try {
      const response = await aiService.improveText({ text, type });
      return response.data.improved;
    } catch (error) {
      toast.error('Failed to improve text');
      console.error(error);
      return text;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getATSKeywords = useCallback(async (jobTitle, industry) => {
    setIsLoading(true);
    try {
      const response = await aiService.getATSKeywords({ jobTitle, industry });
      return response.data.keywords;
    } catch (error) {
      toast.error('Failed to get ATS keywords');
      console.error(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    isLoading,
    suggestions,
    getExperienceSuggestions,
    getSkillsSuggestions,
    getSummarySuggestions,
    improveText,
    getATSKeywords,
    clearSuggestions,
  };
};

export default useAI;
