import React, { useState } from 'react';
import { CheckCircle, Clock, Award, BookOpen, BarChart2, TrendingUp } from 'lucide-react';

const ProgressTracking = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data - in a real app, this would come from an API
  const progressData = {
    overallProgress: 75,
    completedLectures: 15,
    totalLectures: 20,
    averageScore: 84,
    streakDays: 5,
    categories: [
      { id: 'getting-started', name: 'Getting Started', progress: 85 },
      { id: 'documentation', name: 'Documentation', progress: 60 },
      { id: 'compliance', name: 'Compliance', progress: 75 },
      { id: 'advanced', name: 'Advanced Topics', progress: 42 }
    ]
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Progress Tracking</h1>
          <p className="mt-1 text-xs text-gray-600">
            Track your learning progress and achievements
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center py-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="3"
                strokeDasharray={`${progressData.overallProgress}, 100`}
                strokeLinecap="round"
              />
              <text x="18" y="20.5" textAnchor="middle" className="text-xs font-bold fill-gray-900">
                {progressData.overallProgress}%
              </text>
            </svg>
          </div>
          <h2 className="text-base font-medium text-gray-900">Your Learning Progress</h2>
          <p className="mt-1 text-xs text-gray-500">
            {progressData.completedLectures} of {progressData.totalLectures} lectures completed
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-md">
                <BarChart2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Overall Progress</h3>
                <p className="text-xl font-semibold text-gray-900">{progressData.overallProgress}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-md">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                <p className="text-xl font-semibold text-gray-900">
                  {progressData.completedLectures} / {progressData.totalLectures}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-md">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
                <p className="text-xl font-semibold text-gray-900">{progressData.averageScore}%</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-md">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Day Streak</h3>
                <p className="text-xl font-semibold text-gray-900">{progressData.streakDays} days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900 mb-3">Progress by Category</h3>
          <div className="space-y-4">
            {progressData.categories.map((category) => (
              <div key={category.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-normal text-sm text-gray-700">{category.name}</span>
                  <span className="text-xs text-gray-500">{category.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${category.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;