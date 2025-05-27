import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EscapeBlueprint = () => {
  const [currentModule, setCurrentModule] = useState(0); // 0 = VSL, 1-3 = Modules
  const [completedModules, setCompletedModules] = useState([]);
  const [watchedVSL, setWatchedVSL] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [videoProgress, setVideoProgress] = useState({});
  const navigate = useNavigate();

  // Initialize state and load progress
  useEffect(() => {
    console.log('EscapeBlueprint component mounting - loading progress...');
    
    // Load VSL completion status
    const savedVSL = localStorage.getItem('watchedVSL');
    console.log('Saved VSL status:', savedVSL);
    if (savedVSL === 'true') {
      setWatchedVSL(true);
    }

    // Load course progress
    const savedProgress = localStorage.getItem('escapeBlueprintProgress');
    console.log('Saved progress:', savedProgress);
    if (savedProgress) {
      try {
        const { completed, current } = JSON.parse(savedProgress);
        console.log('Parsed progress - completed:', completed, 'current:', current);
        setCompletedModules(completed || []);
        setCurrentModule(current || (savedVSL === 'true' ? 1 : 0));
      } catch (error) {
        console.error('Error parsing saved progress:', error);
        // Reset to default if corrupted
        setCompletedModules([]);
        setCurrentModule(savedVSL === 'true' ? 1 : 0);
      }
    } else {
      // Initialize progress if none exists
      console.log('No saved progress found - initializing');
      setCompletedModules([]);
      setCurrentModule(savedVSL === 'true' ? 1 : 0);
    }

    // Load track selection
    const savedTrack = localStorage.getItem('selectedTrack');
    if (savedTrack) {
      setSelectedTrack(savedTrack);
      setShowUpgrade(true);
    }

    console.log('Progress loading complete');
  }, []);

  // Save progress
  const saveProgress = (completed, current) => {
    const progress = {
      completed,
      currentModule: current,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('escapeBlueprintProgress', JSON.stringify(progress));
    setCompletedModules(completed);
    setCurrentModule(current);
  };

  // Handle video completion
  const handleVideoComplete = (moduleId) => {
    console.log('Video completion triggered for:', moduleId);
    
    if (moduleId === 'vsl') {
      console.log('VSL completed - updating state');
      setWatchedVSL(true);
      localStorage.setItem('watchedVSL', 'true');
      
      // Award XP for watching VSL
      const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
      userStats.totalXP = (userStats.totalXP || 0) + 10;
      userStats.xpHistory = userStats.xpHistory || [];
      userStats.xpHistory.push({
        amount: 10,
        reason: 'Watched The Escape Blueprint VSL',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('userStats', JSON.stringify(userStats));
      
      // Auto-advance to Module 1 after VSL
      setTimeout(() => {
        console.log('Auto-advancing to Module 1');
        setCurrentModule(1);
      }, 1500);
      return;
    }

    console.log('Module completed:', moduleId);
    const newCompleted = [...completedModules];
    if (!newCompleted.includes(moduleId)) {
      newCompleted.push(moduleId);
    }

    // Award XP for module completion
    const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
    userStats.totalXP = (userStats.totalXP || 0) + 25;
    userStats.xpHistory = userStats.xpHistory || [];
    userStats.xpHistory.push({
      amount: 25,
      reason: `Completed Escape Blueprint Module ${moduleId}`,
      timestamp: new Date().toISOString()
    });

    // Auto-advance to next module
    const nextModule = moduleId < 3 ? moduleId + 1 : 3;
    saveProgress(newCompleted, nextModule);

    // Show upgrade prompt and award badge after completing all modules
    if (newCompleted.length === 3) {
      console.log('All modules completed - awarding badge');
      setTimeout(() => {
        setShowUpgrade(true);
        
        // Award Escape Artist badge
        const finalStats = JSON.parse(localStorage.getItem('userStats') || '{}');
        const newBadges = [...(finalStats.badges || []), 'Escape Artist'];
        finalStats.badges = [...new Set(newBadges)]; // Remove duplicates
        finalStats.totalXP = (finalStats.totalXP || 0) + 50; // Bonus XP for completion
        finalStats.xpHistory = finalStats.xpHistory || [];
        finalStats.xpHistory.push({
          amount: 50,
          reason: 'Earned Escape Artist Badge - Course Complete!',
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('userStats', JSON.stringify(finalStats));
        
        // Show completion notification
        alert('🎉 Congratulations! You\'ve earned the "Escape Artist" badge and 85 total XP!');
      }, 1500);
    } else {
      localStorage.setItem('userStats', JSON.stringify(userStats));
    }
  };

  // Handle track selection
  const handleTrackSelection = (track) => {
    setSelectedTrack(track);
    localStorage.setItem('selectedTrack', track);
    
    // Show upgrade flow
    setTimeout(() => {
      alert(`Great choice! The ${track} Course is available for $497. This comprehensive program includes advanced strategies, live sessions, and 1-on-1 support.`);
    }, 500);
  };

  // Video component with progress tracking
  const VideoPlayer = ({ title, duration, onComplete, moduleId }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(false);

    useEffect(() => {
      let interval;
      if (isPlaying && progress < 100 && !hasCompleted) {
        interval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + (100 / (duration * 10)); // Complete in 1 second per minute for demo
            console.log(`Video progress for ${moduleId}:`, Math.round(newProgress));
            
            if (newProgress >= 95 && !hasCompleted) { // Trigger slightly before 100% for better UX
              console.log(`Video ${moduleId} completing...`);
              setHasCompleted(true);
              setTimeout(() => {
                console.log(`Calling onComplete for ${moduleId}`);
                onComplete(moduleId);
              }, 500);
            }
            return Math.min(newProgress, 100);
          });
        }, 100);
      }
      return () => clearInterval(interval);
    }, [isPlaying, progress, duration, hasCompleted, onComplete, moduleId]);

    const handlePlayClick = () => {
      console.log('Play button clicked for:', moduleId);
      setIsPlaying(true);
    };

    return (
      <div className="bg-black rounded-lg overflow-hidden relative">
        <div className="aspect-video flex items-center justify-center relative">
          {!isPlaying ? (
            <button
              onClick={handlePlayClick}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 transition-all transform hover:scale-110 z-10"
            >
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <div className="text-center text-white">
                <div className="text-xl font-semibold mb-2">{title}</div>
                <div className="text-sm opacity-75">Playing...</div>
                {hasCompleted && (
                  <div className="text-green-400 mt-2 animate-pulse">✓ Complete!</div>
                )}
              </div>
            </div>
          )}
          
          {/* Progress bar */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
              <div 
                className="h-full bg-red-600 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
        
        {progress > 0 && (
          <div className="p-3 bg-gray-800 text-white text-sm">
            Progress: {Math.round(progress)}% • {Math.round((duration * progress) / 100)} / {duration} minutes
            {hasCompleted && <span className="text-green-400 ml-2 animate-pulse">✓ Completed</span>}
          </div>
        )}
      </div>
    );
  };

  // VSL Content
  const VSLContent = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          If Taxes Feel Like Theft... You're Not Alone
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the tax strategies that high-income earners use to keep more of what they earn
        </p>
      </div>

      <VideoPlayer
        title="The Escape Blueprint - Introduction"
        duration={2}
        onComplete={handleVideoComplete}
        moduleId="vsl"
      />

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn:</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Why high-income earners lose 40-50% of lifetime income to taxes
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            The difference between compliance mindset vs. strategic tax planning
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Real case studies showing 6-figure tax reductions
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Your personalized escape plan based on your profile
          </li>
        </ul>
      </div>

      {watchedVSL && (
        <div className="text-center">
          <button
            onClick={() => setCurrentModule(1)}
            className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Start Module 1: "The IRS Is Your Biggest Bill"
          </button>
        </div>
      )}
    </div>
  );

  // Module 1 Content
  const Module1Content = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
          Module 1 of 3
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          The IRS Is Your Biggest Bill
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover how most high earners unknowingly overpay and the compound effect over decades
        </p>
      </div>

      <VideoPlayer
        title="Module 1: The IRS Is Your Biggest Bill"
        duration={6}
        onComplete={handleVideoComplete}
        moduleId={1}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="font-semibold text-gray-900 mb-3">💼 W-2 Employee</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Income:</span>
              <span className="font-medium">$300,000</span>
            </div>
            <div className="flex justify-between">
              <span>Federal Tax:</span>
              <span className="font-medium text-red-600">$75,000</span>
            </div>
            <div className="flex justify-between">
              <span>State Tax:</span>
              <span className="font-medium text-red-600">$24,000</span>
            </div>
            <div className="flex justify-between">
              <span>FICA:</span>
              <span className="font-medium text-red-600">$15,300</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total Tax Rate:</span>
              <span className="text-red-600">38.1%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="font-semibold text-gray-900 mb-3">🏢 Business Owner</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Income:</span>
              <span className="font-medium">$300,000</span>
            </div>
            <div className="flex justify-between">
              <span>Federal Tax:</span>
              <span className="font-medium text-orange-600">$45,000</span>
            </div>
            <div className="flex justify-between">
              <span>State Tax:</span>
              <span className="font-medium text-orange-600">$12,000</span>
            </div>
            <div className="flex justify-between">
              <span>Self-Employment:</span>
              <span className="font-medium text-orange-600">$8,500</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total Tax Rate:</span>
              <span className="text-orange-600">21.8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="font-semibold text-gray-900 mb-3">🏠 Real Estate Investor</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Income:</span>
              <span className="font-medium">$300,000</span>
            </div>
            <div className="flex justify-between">
              <span>Federal Tax:</span>
              <span className="font-medium text-green-600">$25,000</span>
            </div>
            <div className="flex justify-between">
              <span>State Tax:</span>
              <span className="font-medium text-green-600">$8,000</span>
            </div>
            <div className="flex justify-between">
              <span>Self-Employment:</span>
              <span className="font-medium text-green-600">$0</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total Tax Rate:</span>
              <span className="text-green-600">11.0%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-3">💰 The Compound Tax Leakage</h3>
        <p className="text-red-800 mb-4">
          Over 20 years, a W-2 employee earning $300k annually will pay <strong>$2.3 million more in taxes</strong> 
          than a properly structured real estate investor with the same income.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-red-600">$2.3M</div>
            <div className="text-sm text-red-700">W-2 Employee</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">$1.3M</div>
            <div className="text-sm text-orange-700">Business Owner</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">$660K</div>
            <div className="text-sm text-green-700">RE Investor</div>
          </div>
        </div>
      </div>

      {completedModules.includes(1) && (
        <div className="text-center">
          <button
            onClick={() => setCurrentModule(2)}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue to Module 2: "Why Your CPA Can't Save You"
          </button>
        </div>
      )}
    </div>
  );

  // Module 2 Content
  const Module2Content = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
          Module 2 of 3
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Why Your CPA Can't Save You
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Understanding the difference between compliance mindset and strategic tax planning
        </p>
      </div>

      <VideoPlayer
        title="Module 2: Why Your CPA Can't Save You"
        duration={7}
        onComplete={handleVideoComplete}
        moduleId={2}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4">😟 Compliance Mindset (Traditional CPA)</h3>
          <ul className="space-y-3 text-red-800">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">❌</span>
              <span>Focuses on documenting what already happened</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">❌</span>
              <span>Risk-averse, follows basic deductions only</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">❌</span>
              <span>Reactive approach to tax situations</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">❌</span>
              <span>Limited knowledge of advanced strategies</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">❌</span>
              <span>Paid to minimize liability and audit risk</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">🚀 Strategic Tax Planning</h3>
          <ul className="space-y-3 text-green-800">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✅</span>
              <span>Proactive planning for future tax situations</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✅</span>
              <span>Aggressive (but legal) optimization strategies</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✅</span>
              <span>Entity structuring and business design</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✅</span>
              <span>Advanced deductions and investment vehicles</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">✅</span>
              <span>Paid to maximize wealth retention</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Case Study: Sarah M. - Software Engineer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-red-700 mb-2">Before Strategic Planning:</h4>
            <ul className="text-sm space-y-1">
              <li>• W-2 Income: $350,000</li>
              <li>• Standard deductions only</li>
              <li>• Federal + State Tax: <strong className="text-red-600">$119,000</strong></li>
              <li>• Take-home: $231,000</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">After Strategic Implementation:</h4>
            <ul className="text-sm space-y-1">
              <li>• Consulting Entity + REPS</li>
              <li>• Real Estate Professional Status</li>
              <li>• Federal + State Tax: <strong className="text-green-600">$32,000</strong></li>
              <li>• Take-home: $318,000</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-green-100 rounded text-center">
          <span className="text-green-800 font-bold text-lg">Annual Tax Savings: $87,000</span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Glossary Preview - Key Terms:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold text-blue-700 mb-2">REPS</h4>
            <p className="text-sm text-gray-700">Real Estate Professional Status - allows real estate losses to offset active income</p>
          </div>
          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold text-blue-700 mb-2">Oil & Gas IDCs</h4>
            <p className="text-sm text-gray-700">Intangible Drilling Costs - immediate deductions for oil/gas investments</p>
          </div>
          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold text-blue-700 mb-2">QOF</h4>
            <p className="text-sm text-gray-700">Qualified Opportunity Fund - defer and eliminate capital gains taxes</p>
          </div>
        </div>
      </div>

      {completedModules.includes(2) && (
        <div className="text-center">
          <button
            onClick={() => setCurrentModule(3)}
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Continue to Module 3: "What It Looks Like to Escape"
          </button>
        </div>
      )}
    </div>
  );

  // Module 3 Content
  const Module3Content = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium inline-block mb-4">
          Module 3 of 3
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          What It Looks Like to Escape
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Real strategies and case studies showing 6-figure tax reductions in action
        </p>
      </div>

      <VideoPlayer
        title="Module 3: What It Looks Like to Escape"
        duration={8}
        onComplete={handleVideoComplete}
        moduleId={3}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="font-semibold text-blue-700 mb-3">🏢 Entity Planning</h3>
          <ul className="text-sm space-y-2 text-gray-700">
            <li>• S-Corp Election savings</li>
            <li>• Solo 401k maximization</li>
            <li>• Business expense optimization</li>
            <li>• Multi-entity structures</li>
          </ul>
          <div className="mt-4 text-center">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              $15k-45k annual savings
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="font-semibold text-green-700 mb-3">🏠 Real Estate Tax Arbitrage</h3>
          <ul className="text-sm space-y-2 text-gray-700">
            <li>• Real Estate Professional Status</li>
            <li>• Cost segregation studies</li>
            <li>• Short-term rental strategies</li>
            <li>• 1031 exchanges</li>
          </ul>
          <div className="mt-4 text-center">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              $25k-100k annual savings
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <h3 className="font-semibold text-purple-700 mb-3">🛡️ Passive Income Tax Shields</h3>
          <ul className="text-sm space-y-2 text-gray-700">
            <li>• Oil & Gas investments</li>
            <li>• Opportunity Zone funds</li>
            <li>• Conservation easements</li>
            <li>• Captive insurance companies</li>
          </ul>
          <div className="mt-4 text-center">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              $50k-250k annual savings
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">🎯 Complete Case Study: Michael R. - Tech Executive</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Situation:</h4>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• W-2 Income: $450,000</li>
              <li>• Stock options: $200,000</li>
              <li>• Investment income: $75,000</li>
              <li>• Total tax burden: $247,000</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Implementation Strategy:</h4>
            <ul className="space-y-1 text-sm opacity-90">
              <li>• S-Corp consulting entity</li>
              <li>• Real estate professional election</li>
              <li>• QOF for stock option gains</li>
              <li>• Oil & Gas IDC investments</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-white bg-opacity-20 rounded text-center">
          <div className="text-3xl font-bold">$168,000</div>
          <div className="text-lg opacity-90">Annual Tax Savings</div>
          <div className="text-sm opacity-75">From $247k to $79k total tax burden</div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 Your "My Plan" Dashboard Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">What You'll Get:</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Personalized strategy recommendations</li>
              <li>• Progress tracking through modules</li>
              <li>• Quiz system with XP and badges</li>
              <li>• Document analysis with AI insights</li>
              <li>• Implementation roadmap</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded border">
            <div className="text-center">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-semibold text-gray-900">Your Progress</div>
              <div className="text-sm text-gray-600 mt-1">
                Complete this course to earn your first badge!
              </div>
            </div>
          </div>
        </div>
      </div>

      {completedModules.includes(3) && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="bg-green-100 border border-green-200 rounded-lg p-6 mb-6">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-green-900 mb-2">Congratulations!</h3>
              <p className="text-green-800">You've completed The Escape Blueprint and earned the "Escape Artist" badge!</p>
            </div>
          </div>

          <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">🚀 Ready to Build Your Escape Plan?</h3>
            <p className="text-lg mb-6 opacity-90">
              Choose your track to access the complete tax strategy system:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white text-gray-900 p-6 rounded-lg">
                <h4 className="text-xl font-bold mb-3">💼 W-2 Employee Track</h4>
                <ul className="text-sm space-y-2 mb-4 text-left">
                  <li>• Entity structuring for employees</li>
                  <li>• Real estate professional strategies</li>
                  <li>• Retirement optimization</li>
                  <li>• Investment tax planning</li>
                </ul>
                <div className="text-2xl font-bold text-green-600 mb-2">$497</div>
                <button
                  onClick={() => handleTrackSelection('W-2 Employee')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Choose W-2 Track
                </button>
              </div>

              <div className="bg-white text-gray-900 p-6 rounded-lg border-2 border-yellow-400">
                <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold mb-2">
                  MOST POPULAR
                </div>
                <h4 className="text-xl font-bold mb-3">🏢 Business Owner Track</h4>
                <ul className="text-sm space-y-2 mb-4 text-left">
                  <li>• Advanced entity structures</li>
                  <li>• Captive insurance strategies</li>
                  <li>• Oil & Gas investments</li>
                  <li>• Exit planning optimization</li>
                </ul>
                <div className="text-2xl font-bold text-green-600 mb-2">$497</div>
                <button
                  onClick={() => handleTrackSelection('Business Owner')}
                  className="w-full bg-yellow-500 text-yellow-900 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Choose Business Track
                </button>
              </div>
            </div>

            <div className="mt-6 text-sm opacity-75">
              ✅ 30-day money-back guarantee • ✅ Live Q&A sessions • ✅ Private community access
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Progress indicator
  const ProgressIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {['VSL', 'Module 1', 'Module 2', 'Module 3'].map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
            index === 0 ? (watchedVSL ? 'bg-green-500 text-white' : currentModule === 0 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600') :
            completedModules.includes(index) ? 'bg-green-500 text-white' :
            currentModule === index ? 'bg-blue-500 text-white' :
            'bg-gray-300 text-gray-600'
          }`}>
            {index === 0 ? '📺' : index}
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700">{step}</span>
          {index < 3 && <div className="w-8 h-0.5 bg-gray-300 mx-4"></div>}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">The Escape Blueprint</h1>
          <p className="text-lg text-gray-600">Your free introduction to advanced tax strategy</p>
        </div>

        <ProgressIndicator />

        {currentModule === 0 && <VSLContent />}
        {currentModule === 1 && <Module1Content />}
        {currentModule === 2 && <Module2Content />}
        {currentModule === 3 && <Module3Content />}

        {/* Upgrade Banner */}
        {showUpgrade && !selectedTrack && (
          <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-4 z-50">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div>
                <div className="font-semibold">🎉 Course Complete! Ready for the next level?</div>
                <div className="text-sm opacity-90">Join thousands saving 6-figures annually</div>
              </div>
              <button
                onClick={() => setCurrentModule(3)}
                className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Choose Your Track
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EscapeBlueprint;