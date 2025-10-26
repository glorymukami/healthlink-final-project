import React, { useState, useEffect } from 'react';

const HealthTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const comprehensiveTips = [
    // Prevention & Improvement
    {
      id: 1,
      title: "Daily Health Improvement Habits",
      content: "Start your day with 10 minutes of stretching, drink a glass of warm water with lemon, and practice 5 minutes of deep breathing. These simple habits boost metabolism, improve digestion, and reduce stress levels significantly.",
      category: "prevention",
      readTime: 4,
      do: ["Morning stretching", "Hydration", "Deep breathing"],
      dont: ["Skip breakfast", "Check phone immediately", "Rush your morning"]
    },
    {
      id: 2,
      title: "Nutrition: What to Eat and Avoid",
      content: "Focus on whole foods: vegetables, fruits, lean proteins, and healthy fats. Avoid processed foods, excessive sugar, and trans fats. Remember: colorful plate equals healthy plate!",
      category: "nutrition",
      readTime: 5,
      do: ["Eat colorful vegetables", "Choose whole grains", "Include lean proteins"],
      dont: ["Processed snacks", "Sugary drinks", "Late night heavy meals"]
    },

    // Exercise & Activity
    {
      id: 3,
      title: "Effective Exercise Routine",
      content: "Combine cardio (30 mins), strength training (20 mins), and flexibility exercises (10 mins) 4-5 times weekly. Consistency matters more than intensity!",
      category: "exercise",
      readTime: 4,
      do: ["Regular cardio", "Strength training", "Stretching"],
      dont: ["Overtrain", "Skip warm-up", "Poor form"]
    },
    {
      id: 4,
      title: "Sedentary Lifestyle Dangers",
      content: "Prolonged sitting increases risk of heart disease, diabetes, and back problems. Take 2-minute breaks every hour and walk 10,000 steps daily.",
      category: "prevention",
      readTime: 3,
      effects: ["Weight gain", "Poor circulation", "Muscle degeneration"],
      solution: "Stand up every hour, take walking meetings, use stairs"
    },

    // Mental Health
    {
      id: 5,
      title: "Stress Management Techniques",
      content: "Practice mindfulness meditation, maintain work-life balance, and develop healthy coping mechanisms. Chronic stress weakens immune system and affects overall health.",
      category: "mental-health",
      readTime: 5,
      techniques: ["Meditation", "Journaling", "Time management"],
      avoid: ["Bottling emotions", "Overworking", "Substance abuse"]
    },
    {
      id: 6,
      title: "Quality Sleep Importance",
      content: "7-9 hours of quality sleep is essential for memory consolidation, hormone regulation, and cellular repair. Poor sleep affects mood, immunity, and cognitive function.",
      category: "prevention",
      readTime: 4,
      goodHabits: ["Consistent schedule", "Dark room", "No screens before bed"],
      badHabits: ["Caffeine late", "Irregular timing", "Stressful activities"]
    },

    // Disease Prevention
    {
      id: 7,
      title: "Heart Disease Prevention",
      content: "Maintain healthy blood pressure (<120/80), cholesterol levels, and body weight. Regular check-ups and healthy lifestyle reduce cardiovascular risks significantly.",
      category: "chronic-diseases",
      readTime: 5,
      prevention: ["Balanced diet", "Regular exercise", "Stress management"],
      risks: ["Smoking", "High salt intake", "Sedentary lifestyle"]
    },
    {
      id: 8,
      title: "Diabetes Management & Prevention",
      content: "Control blood sugar through diet, exercise, and regular monitoring. Early detection and lifestyle changes can prevent or delay type 2 diabetes.",
      category: "chronic-diseases",
      readTime: 4,
      management: ["Blood sugar monitoring", "Healthy eating", "Active lifestyle"],
      warningSigns: ["Excessive thirst", "Frequent urination", "Unexplained weight loss"]
    },

    // Daily Health Measures
    {
      id: 9,
      title: "Hygiene Best Practices",
      content: "Proper handwashing, dental care, and personal hygiene prevent infections and maintain overall health. Simple habits have significant long-term benefits.",
      category: "prevention",
      readTime: 3,
      mustDo: ["Hand washing", "Dental hygiene", "Clean environment"],
      mustAvoid: ["Sharing personal items", "Poor food handling", "Ignoring symptoms"]
    },
    {
      id: 10,
      title: "Seasonal Health Protection",
      content: "Adapt your health routines to seasonal changes. Winter requires immune support, summer needs hydration, and transitional seasons demand allergy management.",
      category: "prevention",
      readTime: 4,
      seasonalTips: {
        "Winter": "Vitamin D, immune boosters",
        "Summer": "Hydration, sun protection", 
        "Spring": "Allergy management, detox"
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tips' },
    { id: 'prevention', name: 'Prevention & Measures' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'exercise', name: 'Exercise' },
    { id: 'mental-health', name: 'Mental Health' },
    { id: 'chronic-diseases', name: 'Disease Management' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setTips(comprehensiveTips);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTips = selectedCategory === 'all' 
    ? comprehensiveTips 
    : comprehensiveTips.filter(tip => tip.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="card mb-4">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Comprehensive Health & Wellness Guide</h1>
        <p className="text-gray-600 mb-8">Expert advice for prevention, improvement, and healthy living</p>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Health Tips Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredTips.map(tip => (
            <div key={tip.id} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{tip.title}</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-medical-100 text-medical-800 capitalize">
                  {tip.category.replace('-', ' ')}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">{tip.content}</p>

              {/* Do's and Don'ts */}
              {(tip.do || tip.dont) && (
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {tip.do && (
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">✅ Do:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {tip.do.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tip.dont && (
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">❌ Don't:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {tip.dont.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Effects and Solutions */}
              {(tip.effects || tip.techniques) && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Key Points:</h4>
                  <div className="text-sm text-blue-700">
                    {tip.effects && (
                      <p><strong>Effects:</strong> {tip.effects.join(', ')}</p>
                    )}
                    {tip.solution && (
                      <p><strong>Solution:</strong> {tip.solution}</p>
                    )}
                    {tip.techniques && (
                      <p><strong>Techniques:</strong> {tip.techniques.join(', ')}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t">
                <span>📖 {tip.readTime} min read</span>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Save for later
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tips found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthTips;