import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Target, 
  Heart, 
  Brain, 
  Zap,
  Shield,
  Leaf,
  Beaker
} from 'lucide-react';

interface NewQuestionnaireProps {
  onComplete: (profile: any) => void;
  onBack: () => void;
}

export function NewQuestionnaire({ onComplete, onBack }: NewQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    // Basic Info
    age: '',
    gender: '',
    weight: '',
    height: '',
    
    // Health Goals
    healthGoals: [] as string[],
    
    // Dietary Restrictions
    dietaryRestrictions: [] as string[],
    allergies: [] as string[],
    
    // Lifestyle
    activityLevel: '',
    stressLevel: '',
    sleepQuality: '',
    
    // Preferences
    flavorPreferences: [] as string[],
    texturePreferences: [] as string[],
    
    // Current Supplements
    currentSupplements: [] as string[],
    medicationInteractions: false
  });

  const totalSteps = 6;

  const healthGoals = [
    { id: 'energy', label: 'Energy & Vitality', icon: Zap, description: 'Combat fatigue and boost daily energy' },
    { id: 'weight-management', label: 'Weight Management', icon: Target, description: 'Support healthy weight goals' },
    { id: 'muscle-gain', label: 'Muscle Building', icon: Heart, description: 'Support muscle growth and recovery' },
    { id: 'immune-support', label: 'Immune Support', icon: Shield, description: 'Strengthen immune system' },
    { id: 'brain-health', label: 'Brain Health', icon: Brain, description: 'Enhance focus and cognitive function' },
    { id: 'stress-relief', label: 'Stress Relief', icon: Leaf, description: 'Manage stress and improve mood' },
    { id: 'heart-health', label: 'Heart Health', icon: Heart, description: 'Support cardiovascular health' },
    { id: 'digestive-health', label: 'Digestive Health', icon: Leaf, description: 'Improve gut health and digestion' }
  ];

  const dietaryRestrictions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'keto', label: 'Keto' },
    { id: 'paleo', label: 'Paleo' },
    { id: 'low-carb', label: 'Low-Carb' },
    { id: 'low-sugar', label: 'Low-Sugar' }
  ];

  const allergies = [
    { id: 'nuts', label: 'Nuts' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'eggs', label: 'Eggs' },
    { id: 'soy', label: 'Soy' },
    { id: 'gluten', label: 'Gluten' },
    { id: 'shellfish', label: 'Shellfish' },
    { id: 'fish', label: 'Fish' },
    { id: 'sesame', label: 'Sesame' }
  ];

  const flavorPreferences = [
    { id: 'sweet', label: 'Sweet' },
    { id: 'tart', label: 'Tart/Citrus' },
    { id: 'creamy', label: 'Creamy' },
    { id: 'earthy', label: 'Earthy' },
    { id: 'spicy', label: 'Spicy' },
    { id: 'minty', label: 'Minty' }
  ];

  const currentSupplements = [
    { id: 'multivitamin', label: 'Multivitamin' },
    { id: 'vitamin-d', label: 'Vitamin D' },
    { id: 'omega-3', label: 'Omega-3' },
    { id: 'probiotics', label: 'Probiotics' },
    { id: 'protein-powder', label: 'Protein Powder' },
    { id: 'creatine', label: 'Creatine' },
    { id: 'none', label: 'None' }
  ];

  const handleMultiSelect = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSingleSelect = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.age && data.gender && data.weight && data.height;
      case 2:
        return data.healthGoals.length > 0;
      case 3:
        return data.dietaryRestrictions.length >= 0; // Optional
      case 4:
        return data.activityLevel && data.stressLevel && data.sleepQuality;
      case 5:
        return data.flavorPreferences.length > 0;
      case 6:
        return true; // Optional step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === totalSteps) {
      onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell Us About You</h2>
              <p className="text-gray-600">Basic information to personalize your nutrition plan</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={data.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="25"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={data.gender}
                  onChange={(e) => handleSingleSelect('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={data.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="70"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={data.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="175"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Are Your Health Goals?</h2>
              <p className="text-gray-600">Select all that apply - this helps us choose the right superfoods for you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthGoals.map((goal) => {
                const Icon = goal.icon;
                const isSelected = data.healthGoals.includes(goal.id);
                return (
                  <Card
                    key={goal.id}
                    className={`p-6 cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleMultiSelect('healthGoals', goal.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-emerald-500' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{goal.label}</h3>
                        <p className="text-sm text-gray-600">{goal.description}</p>
                      </div>
                      {isSelected && <CheckCircle className="w-6 h-6 text-emerald-600" />}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Dietary Restrictions & Allergies</h2>
              <p className="text-gray-600">Help us avoid ingredients that don't work for you</p>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Dietary Restrictions</h3>
                <div className="flex flex-wrap gap-2">
                  {dietaryRestrictions.map((restriction) => {
                    const isSelected = data.dietaryRestrictions.includes(restriction.id);
                    return (
                      <Badge
                        key={restriction.id}
                        className={`cursor-pointer ${
                          isSelected 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => handleMultiSelect('dietaryRestrictions', restriction.id)}
                      >
                        {restriction.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Allergies</h3>
                <div className="flex flex-wrap gap-2">
                  {allergies.map((allergy) => {
                    const isSelected = data.allergies.includes(allergy.id);
                    return (
                      <Badge
                        key={allergy.id}
                        className={`cursor-pointer ${
                          isSelected 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => handleMultiSelect('allergies', allergy.id)}
                      >
                        {allergy.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lifestyle Factors</h2>
              <p className="text-gray-600">These factors influence your nutritional needs</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Activity Level</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['sedentary', 'moderate', 'active'].map((level) => (
                    <Card
                      key={level}
                      className={`p-4 cursor-pointer text-center ${
                        data.activityLevel === level ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:shadow-md'
                      }`}
                      onClick={() => handleSingleSelect('activityLevel', level)}
                    >
                      <h3 className="font-semibold capitalize">{level}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {level === 'sedentary' && 'Desk job, minimal exercise'}
                        {level === 'moderate' && 'Light exercise 2-3x/week'}
                        {level === 'active' && 'Regular exercise 4+ times/week'}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Stress Level</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['low', 'moderate', 'high'].map((level) => (
                    <Card
                      key={level}
                      className={`p-4 cursor-pointer text-center ${
                        data.stressLevel === level ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:shadow-md'
                      }`}
                      onClick={() => handleSingleSelect('stressLevel', level)}
                    >
                      <h3 className="font-semibold capitalize">{level}</h3>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Sleep Quality</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['poor', 'fair', 'good'].map((quality) => (
                    <Card
                      key={quality}
                      className={`p-4 cursor-pointer text-center ${
                        data.sleepQuality === quality ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:shadow-md'
                      }`}
                      onClick={() => handleSingleSelect('sleepQuality', quality)}
                    >
                      <h3 className="font-semibold capitalize">{quality}</h3>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Flavor Preferences</h2>
              <p className="text-gray-600">Help us create a smoothie you'll actually enjoy</p>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {flavorPreferences.map((flavor) => {
                const isSelected = data.flavorPreferences.includes(flavor.id);
                return (
                  <Badge
                    key={flavor.id}
                    className={`cursor-pointer px-6 py-3 text-lg ${
                      isSelected 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleMultiSelect('flavorPreferences', flavor.id)}
                  >
                    {flavor.label}
                  </Badge>
                );
              })}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Supplements</h2>
              <p className="text-gray-600">Help us avoid interactions and optimize your mix</p>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {currentSupplements.map((supplement) => {
                const isSelected = data.currentSupplements.includes(supplement.id);
                return (
                  <Badge
                    key={supplement.id}
                    className={`cursor-pointer px-4 py-2 ${
                      isSelected 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleMultiSelect('currentSupplements', supplement.id)}
                  >
                    {supplement.label}
                  </Badge>
                );
              })}
            </div>
            
            <div className="text-center">
              <label className="flex items-center justify-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.medicationInteractions}
                  onChange={(e) => handleInputChange('medicationInteractions', e.target.checked.toString())}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">I take prescription medications (we'll check for interactions)</span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">Personalized Nutrition</h1>
            <p className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</p>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="p-8">
          {renderStep()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            {currentStep === totalSteps ? (
              <>
                <Beaker className="w-4 h-4 mr-2" />
                Generate My Recipe
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
