import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CinematicIntro from './CinematicIntro';
import ElementSelection from './ElementSelection';
import AuthForm from './AuthForm';             // ✅ fix path
import supabase from './supabase';              // ✅ if default export; otherwise: import { supabase } from './supabase'
import { useAuthContext } from './AuthContext'; // ✅ fix path
import type { Element } from './types';         // ✅ fix path
type OnboardingStep = 'intro' | 'auth' | 'element' | 'complete';

export const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState<OnboardingStep>('intro');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleIntroComplete = () => {
    setStep(user ? 'element' : 'auth');
  };

  const handleIntroSkip = () => {
    setStep(user ? 'element' : 'auth');
  };

  const handleAuthSuccess = () => {
    setStep('element');
  };

  const handleElementSelect = async (element: Element) => {
    setSelectedElement(element);
    
    if (user) {
      try {
        // Create profile with selected element
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email!,
            username: user.user_metadata?.username || user.email?.split('@')[0] || '',
            display_name: user.user_metadata?.display_name || user.user_metadata?.full_name || '',
            element: element,
          });

        if (error) throw error;

        navigate('/feed');
      } catch (error) {
        console.error('Error creating profile:', error);
      }
    }
  };

  if (step === 'intro') {
    return (
      <CinematicIntro
        onComplete={handleIntroComplete}
        onSkip={handleIntroSkip}
      />
    );
  }

  if (step === 'auth') {
    return <AuthForm onSuccess={handleAuthSuccess} />;
  }

  if (step === 'element') {
    return <ElementSelection onSelect={handleElementSelect} />;
  }

  return null;
};

export default OnboardingPage;
