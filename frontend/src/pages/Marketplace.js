import { useState } from "react";

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState("qofs");

  const categories = [
    { id: "qofs", name: "QOFs", icon: "🏢", description: "Qualified Opportunity Funds" },
    { id: "oil-gas", name: "Oil & Gas", icon: "⚡", description: "Energy Investments" },
    { id: "str-partners", name: "STR Partners", icon: "🏠", description: "Short-Term Rentals" },
    { id: "insurance", name: "Insurance", icon: "🛡️", description: "Insurance Carriers" },
    { id: "reviews", name: "Reviews", icon: "⭐", description: "Community Reviews" },
  ];

  const qofInvestments = [
    {
      name: "Urban Development QOF",
      description: "Mixed-use development in opportunity zones across major cities",
      minInvestment: "$50,000",
      expectedReturn: "12-15%",
      term: "7-10 years",
      rating: 4.5,
      reviews: 24
    },
    {
      name: "Tech Hub QOF",
      description: "Commercial real estate in emerging tech corridors",
      minInvestment: "$100,000",
      expectedReturn: "10-14%",
      term: "8-12 years",
      rating: 4.2,
      reviews: 18
    },
    {
      name: "Renewable Energy QOF",
      description: "Solar and wind projects in qualified opportunity zones",
      minInvestment: "$25,000",
      expectedReturn: "8-12%",
      term: "10-15 years",
      rating: 4.7,
      reviews: 31
    }
  ];

  const oilGasInvestments = [
    {
      name: "Permian Basin Drilling Program",
      description: "Direct participation in proven oil reserves",
      minInvestment: "$25,000",
      expectedReturn: "15-25%",
      term: "3-5 years",
      taxBenefits: "100% first-year depletion",
      rating: 4.3,
      reviews: 27
    },
    {
      name: "Natural Gas Pipeline Partnership",
      description: "Infrastructure investment with steady cash flow",
      minInvestment: "$50,000",
      expectedReturn: "10-15%",
      term: "10-20 years",
      taxBenefits: "Depreciation deductions",
      rating: 4.1,
      reviews: 19
    }
  ];

  const strPartners = [
    {
      name: "Vacation Rental Management Co.",
      location: "Nationwide",
      properties: "500+ properties",
      avgOccupancy: "75%",
      managementFee: "12%",
      rating: 4.6,
      reviews: 45
    },
    {
      name: "Coastal STR Partners",
      location: "Florida & California",
      properties: "200+ beachfront",
      avgOccupancy: "82%",
      managementFee: "15%",
      rating: 4.4,
      reviews: 33
    }
  ];

  const insuranceCarriers = [
    {
      name: "Premium Life Solutions",
      product: "High Cash Value Life Insurance",
      description: "Tax-advantaged wealth transfer and retirement income",
      minPremium: "$10,000/year",
      rating: 4.8,
      reviews: 52
    },
    {
      name: "Captive Insurance Group",
      product: "831(b) Captive Insurance",
      description: "Small insurance company tax election",
      minCapital: "$250,000",
      rating: 4.5,
      reviews: 28
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="mt-2 text-gray-600">Curated tax-advantaged investments and partner solutions</p>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } p-4 rounded-lg shadow transition-colors text-center`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium">{category.name}</div>
              <div className="text-xs text-gray-500">{category.description}</div>
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeCategory === "qofs" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Qualified Opportunity Funds</h3>
              <p className="text-gray-600 mb-6">Defer and potentially eliminate capital gains taxes through qualified opportunity zone investments.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {qofInvestments.map((investment, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{investment.name}</h4>
                      <div className="flex items-center">
                        {renderStars(investment.rating)}
                        <span className="ml-1 text-sm text-gray-600">({investment.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{investment.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Min Investment:</span>
                        <span className="font-medium">{investment.minInvestment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Expected Return:</span>
                        <span className="font-medium text-green-600">{investment.expectedReturn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Term:</span>
                        <span className="font-medium">{investment.term}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeCategory === "oil-gas" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Oil & Gas Investments</h3>
              <p className="text-gray-600 mb-6">Direct participation programs with significant tax advantages including depletion allowances and intangible drilling costs.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {oilGasInvestments.map((investment, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{investment.name}</h4>
                      <div className="flex items-center">
                        {renderStars(investment.rating)}
                        <span className="ml-1 text-sm text-gray-600">({investment.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{investment.description}</p>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Min Investment:</span>
                        <span className="font-medium">{investment.minInvestment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Expected Return:</span>
                        <span className="font-medium text-green-600">{investment.expectedReturn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Term:</span>
                        <span className="font-medium">{investment.term}</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <p className="text-sm text-blue-800"><strong>Tax Benefit:</strong> {investment.taxBenefits}</p>
                    </div>
                    <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeCategory === "str-partners" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Short-Term Rental Partners</h3>
              <p className="text-gray-600 mb-6">Professional property management companies specializing in short-term rental optimization and tax benefits.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {strPartners.map((partner, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{partner.name}</h4>
                      <div className="flex items-center">
                        {renderStars(partner.rating)}
                        <span className="ml-1 text-sm text-gray-600">({partner.reviews})</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location:</span>
                        <span className="font-medium">{partner.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Portfolio:</span>
                        <span className="font-medium">{partner.properties}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Avg Occupancy:</span>
                        <span className="font-medium text-green-600">{partner.avgOccupancy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Management Fee:</span>
                        <span className="font-medium">{partner.managementFee}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                      Contact Partner
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeCategory === "insurance" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Insurance Carriers</h3>
              <p className="text-gray-600 mb-6">Specialized insurance products for tax-advantaged wealth building and asset protection strategies.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insuranceCarriers.map((carrier, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{carrier.name}</h4>
                        <p className="text-sm text-blue-600 font-medium">{carrier.product}</p>
                      </div>
                      <div className="flex items-center">
                        {renderStars(carrier.rating)}
                        <span className="ml-1 text-sm text-gray-600">({carrier.reviews})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{carrier.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          {carrier.minPremium ? 'Min Premium:' : 'Min Capital:'}
                        </span>
                        <span className="font-medium">
                          {carrier.minPremium || carrier.minCapital}
                        </span>
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                      Get Quote
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeCategory === "reviews" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Community Reviews</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-yellow-400 pl-4">
                <div className="flex items-center mb-2">
                  <div className="flex">{renderStars(5)}</div>
                  <span className="ml-2 text-sm text-gray-600">by Sarah Chen • QOF Investment</span>
                </div>
                <p className="text-gray-700">"Excellent returns and great tax benefits. The team was professional and transparent throughout the process."</p>
              </div>
              
              <div className="border-l-4 border-green-400 pl-4">
                <div className="flex items-center mb-2">
                  <div className="flex">{renderStars(4)}</div>
                  <span className="ml-2 text-sm text-gray-600">by Michael Rodriguez • Oil & Gas</span>
                </div>
                <p className="text-gray-700">"Great tax write-offs in the first year. Would recommend for high-income earners looking to reduce their tax burden."</p>
              </div>
              
              <div className="border-l-4 border-blue-400 pl-4">
                <div className="flex items-center mb-2">
                  <div className="flex">{renderStars(5)}</div>
                  <span className="ml-2 text-sm text-gray-600">by Jennifer Kim • STR Partnership</span>
                </div>
                <p className="text-gray-700">"Professional management and excellent communication. My properties are performing above market average."</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;