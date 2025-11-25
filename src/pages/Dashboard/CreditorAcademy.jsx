import React, { useState } from 'react';
import { Play, BookOpen, CheckCircle, Clock, Award } from 'lucide-react';

const CreditorAcademy = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [watchedVideos, setWatchedVideos] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample video data - in a real app, this would come from an API
  const videoCategories = [
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'documentation', name: 'Documentation' },
    { id: 'compliance', name: 'Compliance' },
    { id: 'advanced', name: 'Advanced Topics' },
  ];

  const videos = [
    {
      id: 1,
      title: 'Introduction to Creditor Services',
      description: 'Learn the basics of our creditor services and how to get started.',
      duration: '5:32',
      thumbnail: 'https://via.placeholder.com/300x170',
      category: 'getting-started',
      completed: false
    },
    {
      id: 2,
      title: 'Document Submission Process',
      description: 'Step-by-step guide to submitting your documents for verification.',
      duration: '8:15',
      thumbnail: 'https://via.placeholder.com/300x170',
      category: 'documentation',
      completed: false
    },
    {
      id: 3,
      title: 'Understanding Compliance Requirements',
      description: 'Learn about the compliance standards and how to meet them.',
      duration: '12:45',
      thumbnail: 'https://via.placeholder.com/300x170',
      category: 'compliance',
      completed: false
    },
    {
      id: 4,
      title: 'Advanced Reporting Features',
      description: 'Master the advanced reporting tools available in your dashboard.',
      duration: '15:20',
      thumbnail: 'https://via.placeholder.com/300x170',
      category: 'advanced',
      completed: false
    },
    {
      id: 5,
      title: 'Troubleshooting Common Issues',
      description: 'Quick fixes for common problems you might encounter.',
      duration: '6:50',
      thumbnail: 'https://via.placeholder.com/300x170',
      category: 'getting-started',
      completed: false
    },
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const markAsWatched = (videoId) => {
    setWatchedVideos(new Set(watchedVideos).add(videoId));
  };

  const getCategoryVideos = (categoryId) => {
    return videos.filter(video => video.category === categoryId);
  };

  const getProgressPercentage = (categoryId) => {
    const categoryVideos = getCategoryVideos(categoryId);
    if (categoryVideos.length === 0) return 0;
    const watchedCount = categoryVideos.filter(v => watchedVideos.has(v.id)).length;
    return Math.round((watchedCount / categoryVideos.length) * 100);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center mb-8">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Creditor Academy</h1>
          <p className="mt-2 text-sm text-gray-700">
            Learn how to effectively use our platform through our video tutorials.
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="block w-full sm:w-64 pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {videoCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Categories Progress */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {videoCategories.map((category) => {
          const progress = getProgressPercentage(category.id);
          return (
            <div key={category.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-md">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {category.name}
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {progress}% Complete
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <li key={video.id}>
                <div className="px-4 py-4 flex items-center sm:px-6 hover:bg-gray-50">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-20 w-32 bg-gray-200 rounded-md overflow-hidden relative">
                        <img className="h-full w-full object-cover" src={video.thumbnail} alt="" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium text-indigo-600 truncate">
                            {video.title}
                          </h3>
                          {watchedVideos.has(video.id) && (
                            <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{video.description}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <span>{video.duration} min</span>
                          <span className="mx-2">•</span>
                          <span className="capitalize">
                            {video.category.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedVideo(video);
                          markAsWatched(video.id);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Play className="-ml-1 mr-2 h-4 w-4" />
                        {watchedVideos.has(video.id) ? 'Watch Again' : 'Watch Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <div className="text-center py-10">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No videos found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </ul>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setSelectedVideo(null)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setSelectedVideo(null)}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                    {selectedVideo.title}
                  </h3>
                  <div className="mt-2">
                    <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                      {/* In a real app, this would be a video player component */}
                      <div className="w-full h-96 bg-gray-800 flex items-center justify-center text-white">
                        <div className="text-center">
                          <Play className="h-12 w-12 mx-auto mb-4" />
                          <p>Video Player</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">{selectedVideo.description}</p>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>{selectedVideo.duration} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedVideo(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => markAsWatched(selectedVideo.id)}
                >
                  {watchedVideos.has(selectedVideo.id) ? (
                    <>
                      <CheckCircle className="-ml-1 mr-2 h-5 w-5 text-green-500" />
                      Marked as Completed
                    </>
                  ) : (
                    <>
                      <CheckCircle className="-ml-1 mr-2 h-5 w-5 text-gray-400" />
                      Mark as Completed
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditorAcademy;
