import { useState, useEffect, useRef } from "react";

const DocumentReader = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [annotations, setAnnotations] = useState({});
  const [filterStatus, setFilterStatus] = useState("all");
  const [isUploading, setIsUploading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [currentUser] = useState({
    id: "user_001",
    name: "Current User",
    role: "user"
  });
  
  const fileInputRef = useRef(null);

  // Load saved data
  useEffect(() => {
    const savedDocs = localStorage.getItem('uploadedDocuments');
    const savedAnnotations = localStorage.getItem('documentAnnotations');
    
    if (savedDocs) {
      const docs = JSON.parse(savedDocs);
      setDocuments(docs.map(doc => ({
        ...doc,
        ...getMockDocumentData(doc.name, doc.type || 'PDF')
      })));
    }
    if (savedAnnotations) setAnnotations(JSON.parse(savedAnnotations));
  }, []);

  // Mock AI Document Analysis Engine
  const DocumentAI = {
    analyzeDocument: function(document) {
      // Simulate AI analysis based on document type and name
      const analysis = this.generateAnalysis(document);
      return {
        summary: analysis.summary,
        keyMetrics: analysis.keyMetrics,
        redFlags: analysis.redFlags,
        strategyOpportunities: analysis.strategyOpportunities,
        glossaryLinks: analysis.glossaryLinks,
        courseRecommendations: analysis.courseRecommendations,
        confidence: analysis.confidence
      };
    },

    generateAnalysis: function(document) {
      const docType = this.detectDocumentType(document.name);
      
      switch (docType) {
        case 'tax_return':
          return this.analyzeTaxReturn(document);
        case 'k1':
          return this.analyzeK1(document);
        case 'w2':
          return this.analyzeW2(document);
        case 'brokerage':
          return this.analyzeBrokerageStatement(document);
        case 'rental':
          return this.analyzeRentalProperty(document);
        default:
          return this.generateGenericAnalysis(document);
      }
    },

    detectDocumentType: function(fileName) {
      const name = fileName.toLowerCase();
      if (name.includes('1040') || name.includes('tax_return')) return 'tax_return';
      if (name.includes('k1') || name.includes('k-1')) return 'k1';
      if (name.includes('w2') || name.includes('w-2')) return 'w2';
      if (name.includes('brokerage') || name.includes('investment')) return 'brokerage';
      if (name.includes('rental') || name.includes('schedule_e')) return 'rental';
      return 'general';
    },

    analyzeTaxReturn: function(document) {
      return {
        summary: "Comprehensive tax return analysis revealing significant optimization opportunities. High AGI indicates need for advanced tax strategies.",
        keyMetrics: {
          "Adjusted Gross Income": "$485,000",
          "Total Tax Liability": "$127,400",
          "Effective Tax Rate": "26.2%",
          "Marginal Tax Rate": "35%",
          "Federal Withholding": "$89,200",
          "Estimated Tax Payments": "$45,000",
          "Refund/Amount Owed": "$6,800 owed"
        },
        redFlags: [
          {
            severity: "high",
            issue: "No retirement plan contributions detected",
            impact: "Missing potential $66,000 annual deferral",
            recommendation: "Implement Solo 401k or SEP-IRA strategy"
          },
          {
            severity: "medium", 
            issue: "High W-2 income without optimization",
            impact: "Paying maximum marginal rates",
            recommendation: "Consider entity restructuring and deferred compensation"
          },
          {
            severity: "medium",
            issue: "No tax-loss harvesting evidence",
            impact: "Missed opportunity to offset capital gains",
            recommendation: "Implement systematic tax-loss harvesting strategy"
          }
        ],
        strategyOpportunities: [
          {
            strategy: "Solo 401k Setup",
            applicability: "high",
            potentialSavings: "$23,100",
            complexity: "low",
            timeframe: "Current tax year",
            requirements: "Self-employment income verification"
          },
          {
            strategy: "Roth Conversion Ladder",
            applicability: "high", 
            potentialSavings: "$15,000-25,000 annually",
            complexity: "medium",
            timeframe: "Multi-year strategy",
            requirements: "Traditional IRA/401k balances"
          },
          {
            strategy: "Oil & Gas Investments",
            applicability: "medium",
            potentialSavings: "$50,000+",
            complexity: "high", 
            timeframe: "Current tax year",
            requirements: "Accredited investor status, risk tolerance"
          }
        ],
        glossaryLinks: [
          "Solo 401k",
          "Roth Conversion",
          "Oil & Gas IDCs",
          "Tax-Loss Harvesting",
          "Entity Structuring"
        ],
        courseRecommendations: [
          "Retirement Conversion Strategies",
          "Advanced Business Structures", 
          "Investment Tax Optimization"
        ],
        confidence: 0.92
      };
    },

    analyzeK1: function(document) {
      return {
        summary: "Partnership K-1 shows passive real estate activity with significant loss potential for REPS qualification.",
        keyMetrics: {
          "Ordinary Business Income": "($45,000)",
          "Rental Real Estate Income": "($28,500)",
          "Section 199A Deduction": "$0",
          "At-Risk Amount": "$125,000",
          "Passive Activity Limitations": "Yes"
        },
        redFlags: [
          {
            severity: "high",
            issue: "Passive activity loss limitations",
            impact: "Cannot use $28,500 in rental losses",
            recommendation: "Qualify for Real Estate Professional Status"
          },
          {
            severity: "medium",
            issue: "Missing material participation documentation",
            impact: "IRS may challenge active participation",
            recommendation: "Implement time tracking and activity logs"
          }
        ],
        strategyOpportunities: [
          {
            strategy: "REPS (Real Estate Professional Status)",
            applicability: "high",
            potentialSavings: "$10,000-15,000",
            complexity: "medium",
            timeframe: "Current tax year",
            requirements: "750+ hours, material participation"
          },
          {
            strategy: "Short-Term Rental Conversion",
            applicability: "medium",
            potentialSavings: "$8,000-12,000",
            complexity: "medium",
            timeframe: "Next tax year",
            requirements: "Property conversion, active management"
          }
        ],
        glossaryLinks: [
          "REPS (Real Estate Professional Status)",
          "STR (Short-Term Rental)",
          "Material Participation",
          "Passive Activity Rules"
        ],
        courseRecommendations: [
          "Real Estate Tax Optimization",
          "Passive Income Shields"
        ],
        confidence: 0.88
      };
    },

    analyzeW2: function(document) {
      return {
        summary: "High-income W-2 employee with excellent foundation for tax optimization strategies.",
        keyMetrics: {
          "Gross Wages": "$285,000",
          "Federal Withholding": "$67,200",
          "Social Security Wages": "$160,200",
          "Medicare Wages": "$285,000",
          "401k Contributions": "$23,000",
          "Health Insurance": "$8,400"
        },
        redFlags: [
          {
            severity: "medium",
            issue: "No HSA contributions detected",
            impact: "Missing $4,300 triple tax advantage",
            recommendation: "Maximize HSA contributions if eligible"
          },
          {
            severity: "low",
            issue: "Standard 401k contributions only",
            impact: "Missing potential Roth optimization",
            recommendation: "Consider Roth 401k split strategy"
          }
        ],
        strategyOpportunities: [
          {
            strategy: "Backdoor Roth IRA",
            applicability: "high",
            potentialSavings: "$2,000-3,000",
            complexity: "low",
            timeframe: "Current tax year",
            requirements: "No traditional IRA balances"
          },
          {
            strategy: "HSA Maximization",
            applicability: "high",
            potentialSavings: "$1,500",
            complexity: "low",
            timeframe: "Current tax year",
            requirements: "High-deductible health plan"
          }
        ],
        glossaryLinks: [
          "Backdoor Roth IRA",
          "HSA Strategy",
          "Roth 401k",
          "Tax-Loss Harvesting"
        ],
        courseRecommendations: [
          "W-2 Tax Optimization",
          "Retirement Planning Strategies"
        ],
        confidence: 0.85
      };
    },

    analyzeBrokerageStatement: function(document) {
      return {
        summary: "Investment portfolio with significant unrealized gains presents multiple tax optimization opportunities.",
        keyMetrics: {
          "Total Portfolio Value": "$1,250,000",
          "Unrealized Gains": "$420,000",
          "Dividend Income": "$28,500",
          "Realized Gains (YTD)": "$75,000",
          "Tax-Loss Harvesting": "$0"
        },
        redFlags: [
          {
            severity: "high",
            issue: "Large unrealized gains exposure",
            impact: "Potential $100,000+ tax liability on sale",
            recommendation: "Implement tax-loss harvesting and gain management"
          },
          {
            severity: "medium",
            issue: "No qualified opportunity zone investments",
            impact: "Missing capital gains deferral opportunity",
            recommendation: "Consider QOF investment for gains optimization"
          }
        ],
        strategyOpportunities: [
          {
            strategy: "Qualified Opportunity Fund (QOF)",
            applicability: "high",
            potentialSavings: "$26,250",
            complexity: "medium",
            timeframe: "180 days from gain realization",
            requirements: "Recent capital gains, accredited investor status"
          },
          {
            strategy: "Tax-Loss Harvesting",
            applicability: "high",
            potentialSavings: "$15,000+",
            complexity: "low",
            timeframe: "Ongoing",
            requirements: "Taxable investment accounts"
          }
        ],
        glossaryLinks: [
          "Qualified Opportunity Fund (QOF)",
          "Tax-Loss Harvesting",
          "Capital Gains Deferral",
          "Wash Sale Rules"
        ],
        courseRecommendations: [
          "Investment Tax Strategies",
          "Capital Gains Management"
        ],
        confidence: 0.90
      };
    },

    generateGenericAnalysis: function(document) {
      return {
        summary: "Document uploaded successfully. Basic analysis completed with general tax planning recommendations.",
        keyMetrics: {
          "Document Type": "General Financial Document",
          "Pages Analyzed": "Multiple",
          "Analysis Confidence": "Medium"
        },
        redFlags: [
          {
            severity: "low",
            issue: "Limited tax optimization information",
            impact: "Cannot provide specific recommendations",
            recommendation: "Upload more detailed tax documents for better analysis"
          }
        ],
        strategyOpportunities: [
          {
            strategy: "Comprehensive Tax Review",
            applicability: "medium",
            potentialSavings: "TBD",
            complexity: "low",
            timeframe: "Next planning session",
            requirements: "Complete financial documentation"
          }
        ],
        glossaryLinks: [
          "Tax Planning Fundamentals",
          "Document Organization"
        ],
        courseRecommendations: [
          "Tax Fundamentals",
          "Personal Tax Strategy"
        ],
        confidence: 0.60
      };
    }
  };

  // Mock document data generator
  const getMockDocumentData = (fileName, fileType) => {
    const analysis = DocumentAI.analyzeDocument({ name: fileName, type: fileType });
    
    return {
      status: 'analyzed',
      analysis: analysis,
      flagCount: analysis.redFlags.length,
      strategyCount: analysis.strategyOpportunities.length,
      lastReviewed: new Date().toISOString(),
      reviewedBy: null
    };
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);

    for (const file of files) {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        const newDocument = {
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type.startsWith('image/') ? 'Image' : 'PDF',
          size: file.size,
          uploadDate: new Date().toISOString(),
          uploadedBy: currentUser.name,
          ...getMockDocumentData(file.name, file.type)
        };

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        setDocuments(prev => {
          const updated = [...prev, newDocument];
          localStorage.setItem('uploadedDocuments', JSON.stringify(updated));
          return updated;
        });
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    switch (filterStatus) {
      case 'analyzed':
        return doc.status === 'analyzed';
      case 'flagged':
        return doc.flagCount > 0;
      case 'pending':
        return !doc.reviewedBy;
      case 'reviewed':
        return doc.reviewedBy;
      default:
        return true;
    }
  });

  // Add annotation
  const addAnnotation = (documentId, annotation) => {
    const newAnnotations = {
      ...annotations,
      [documentId]: [...(annotations[documentId] || []), {
        id: Date.now(),
        ...annotation,
        author: currentUser.name,
        authorRole: currentUser.role,
        timestamp: new Date().toISOString()
      }]
    };
    setAnnotations(newAnnotations);
    localStorage.setItem('documentAnnotations', JSON.stringify(newAnnotations));
  };

  // Strategy suggestion component
  const StrategyCard = ({ strategy, onImplement }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900">{strategy.strategy}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          strategy.applicability === 'high' ? 'bg-green-100 text-green-800' :
          strategy.applicability === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {strategy.applicability} match
        </span>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Potential Savings:</span>
          <span className="font-medium text-green-600">{strategy.potentialSavings}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Complexity:</span>
          <span className={`font-medium ${
            strategy.complexity === 'high' ? 'text-red-600' :
            strategy.complexity === 'medium' ? 'text-yellow-600' :
            'text-green-600'
          }`}>
            {strategy.complexity}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Timeframe:</span>
          <span className="font-medium">{strategy.timeframe}</span>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-600">
        <strong>Requirements:</strong> {strategy.requirements}
      </div>
      
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => onImplement(strategy)}
          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
        >
          Add to My Strategies
        </button>
        <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200">
          Learn More
        </button>
      </div>
    </div>
  );

  // Red flag component
  const RedFlagCard = ({ flag, onResolve }) => (
    <div className={`border-l-4 p-4 rounded ${
      flag.severity === 'high' ? 'border-red-500 bg-red-50' :
      flag.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
      'border-blue-500 bg-blue-50'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className={`font-semibold ${
          flag.severity === 'high' ? 'text-red-800' :
          flag.severity === 'medium' ? 'text-yellow-800' :
          'text-blue-800'
        }`}>
          {flag.issue}
        </h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          flag.severity === 'high' ? 'bg-red-100 text-red-800' :
          flag.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {flag.severity}
        </span>
      </div>
      
      <p className="text-sm text-gray-700 mb-2">
        <strong>Impact:</strong> {flag.impact}
      </p>
      
      <p className="text-sm text-gray-700 mb-3">
        <strong>Recommendation:</strong> {flag.recommendation}
      </p>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onResolve(flag)}
          className="bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700"
        >
          Schedule Review
        </button>
        <button className="bg-gray-200 text-gray-700 py-1 px-3 rounded text-sm hover:bg-gray-300">
          Dismiss
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Document Reader & Analysis</h1>
          <p className="mt-2 text-gray-600">Upload tax documents for AI-powered analysis and strategy recommendations</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Documents</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              
              {isUploading ? (
                <div className="space-y-4">
                  <div className="text-4xl">⏳</div>
                  <p className="text-lg font-medium text-gray-700">Analyzing Document...</p>
                  <p className="text-sm text-gray-600">AI is extracting key metrics and identifying opportunities</p>
                  <div className="w-64 mx-auto bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-4xl">📄</div>
                  <div>
                    <p className="text-lg font-medium text-gray-700">Upload Tax Documents</p>
                    <p className="text-sm text-gray-600">Supports PDF and image files • OCR enabled</p>
                  </div>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
                      Choose Files
                    </span>
                  </label>
                  <div className="text-xs text-gray-500 max-w-md mx-auto">
                    Supported: Tax returns, K-1s, W-2s, 1099s, brokerage statements, strategy memos
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Document Vault */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Document Vault</h2>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Documents</option>
                <option value="analyzed">Analyzed</option>
                <option value="flagged">Flagged Issues</option>
                <option value="pending">Pending Review</option>
                <option value="reviewed">Reviewed</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📂</div>
                <p className="text-gray-600">No documents uploaded yet</p>
                <p className="text-sm text-gray-500">Upload your first document to get started with AI analysis</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">📄</span>
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">{doc.name}</h3>
                          <p className="text-xs text-gray-600">{doc.type} • {Math.round(doc.size / 1024)} KB</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        doc.status === 'analyzed' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status}
                      </span>
                    </div>

                    {doc.analysis && (
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Red Flags:</span>
                          <span className={`font-medium ${
                            doc.flagCount > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {doc.flagCount}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Strategies:</span>
                          <span className="font-medium text-blue-600">{doc.strategyCount}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Confidence:</span>
                          <span className="font-medium text-gray-700">
                            {Math.round(doc.analysis.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedDocument(doc);
                          setShowAnalysis(true);
                        }}
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700"
                      >
                        View Analysis
                      </button>
                      <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200">
                        Annotate
                      </button>
                    </div>

                    <div className="mt-3 text-xs text-gray-500">
                      Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Analysis Modal */}
        {showAnalysis && selectedDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-5/6 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDocument.name}</h2>
                  <p className="text-gray-600">AI-Powered Document Analysis</p>
                </div>
                <button
                  onClick={() => setShowAnalysis(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <span className="text-gray-500 text-xl">✕</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                  {/* Left Column - Summary & Metrics */}
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">AI Summary</h3>
                      <p className="text-sm text-gray-700">{selectedDocument.analysis.summary}</p>
                      <div className="mt-2 text-xs text-gray-600">
                        Confidence: {Math.round(selectedDocument.analysis.confidence * 100)}%
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Key Financial Metrics</h3>
                      <div className="space-y-2">
                        {Object.entries(selectedDocument.analysis.keyMetrics).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-medium text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Glossary Links */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-3">Related Learning</h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Glossary Terms:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedDocument.analysis.glossaryLinks.map((term) => (
                              <button
                                key={term}
                                className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs hover:bg-green-200"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Recommended Modules:</p>
                          <div className="space-y-1">
                            {selectedDocument.analysis.courseRecommendations.map((course) => (
                              <button
                                key={course}
                                className="block w-full text-left bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs hover:bg-blue-200"
                              >
                                📚 {course}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Flags & Strategies */}
                  <div className="space-y-6">
                    {/* Red Flags */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">⚠️ Issues & Opportunities</h3>
                      <div className="space-y-3">
                        {selectedDocument.analysis.redFlags.map((flag, index) => (
                          <RedFlagCard
                            key={index}
                            flag={flag}
                            onResolve={(flag) => console.log('Resolving flag:', flag)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Strategy Opportunities */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">💡 Strategy Recommendations</h3>
                      <div className="space-y-3">
                        {selectedDocument.analysis.strategyOpportunities.map((strategy, index) => (
                          <StrategyCard
                            key={index}
                            strategy={strategy}
                            onImplement={(strategy) => {
                              console.log('Adding strategy to implementation list:', strategy);
                              // Add to user's ready-to-implement list
                              const existing = JSON.parse(localStorage.getItem('readyToImplement') || '[]');
                              const newStrategy = {
                                strategy: strategy.strategy,
                                category: "Document Analysis",
                                dateMarked: new Date().toISOString(),
                                complexity: strategy.complexity,
                                estimatedSavings: strategy.potentialSavings,
                                source: selectedDocument.name
                              };
                              localStorage.setItem('readyToImplement', JSON.stringify([...existing, newStrategy]));
                              alert(`${strategy.strategy} added to your implementation list!`);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    const analysisData = {
                      document: selectedDocument.name,
                      analysis: selectedDocument.analysis,
                      exportedAt: new Date().toISOString(),
                      exportedBy: currentUser.name
                    };
                    console.log('Exporting analysis:', analysisData);
                    alert('Analysis exported successfully! (Check console for data)');
                  }}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Export Analysis
                </button>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Schedule Advisor Review
                </button>
                <button
                  onClick={() => setShowAnalysis(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentReader;