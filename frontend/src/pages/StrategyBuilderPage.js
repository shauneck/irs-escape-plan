import React, { useState, useEffect, useContext } from 'react';
import { APIContext } from '../App';
import StrategyBuilderIntro from '../components/StrategyBuilderIntro';
import StrategyBuilderWizard from '../components/StrategyBuilderWizard';
import StrategyBuilderResults from '../components/StrategyBuilderResults';

function StrategyBuilderPage({ user }) {
  const api = useContext(APIContext);
  const [hasAccess, setHasAccess] = useState(false);
  const [currentStep, setCurrentStep] = useState('intro'); // intro, wizard, results
  const [userInputs, setUserInputs] = useState({});
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAccess();
  }, [user]);

  const checkAccess = async () => {
    if (!user) {
      setHasAccess(false);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/api/strategy-builder/access/${user.email}`);
      setHasAccess(response.has_access || false);
      
      // If user has completed before, show option to view results
      if (response.has_completed) {
        // Could auto-load previous results here
      }
    } catch (err) {
      console.error('Error checking access:', err);
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleStartWizard = () => {
    setCurrentStep('wizard');
  };

  const handleWizardComplete = async (inputs) => {
    try {
      setUserInputs(inputs);
      
      // Get strategy recommendations
      const response = await api.post('/api/strategy-builder', {
        ...inputs,
        user_email: user.email
      });
      
      setStrategies(response.strategies || []);
      setCurrentStep('results');
    } catch (err) {
      console.error('Error getting strategies:', err);
      // Handle error appropriately
    }
  };

  const handleBackToIntro = () => {
    setCurrentStep('intro');
    setUserInputs({});
    setStrategies([]);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span style={{ marginLeft: '1rem' }}>Loading Strategy Builder...</span>
      </div>
    );
  }

  return (
    <div className="strategy-builder-page">
      {currentStep === 'intro' && (
        <StrategyBuilderIntro 
          hasAccess={hasAccess}
          user={user}
          onStartWizard={handleStartWizard}
        />
      )}
      
      {currentStep === 'wizard' && (
        <StrategyBuilderWizard 
          onComplete={handleWizardComplete}
          onBack={handleBackToIntro}
        />
      )}
      
      {currentStep === 'results' && (
        <StrategyBuilderResults 
          strategies={strategies}
          userInputs={userInputs}
          user={user}
          onStartOver={handleBackToIntro}
        />
      )}
    </div>
  );
}

export default StrategyBuilderPage;
