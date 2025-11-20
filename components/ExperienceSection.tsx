
import React from 'react';
import { RESUME_DATA } from '../constants';

const ExperienceSection: React.FC = () => {
  const { experience } = RESUME_DATA;

  return (
    <div id="experience" className="p-6 h-full scroll-mt-8">
      <div className="flex items-center gap-4 mb-8">
        {/* Optional Sun/Icon in header as per design could go here, but title is enough */}
        <h2 className="text-2xl font-bold uppercase tracking-[0.2em]">Experience</h2>
      </div>

      <div className="space-y-10">
        {experience.map((job) => (
          <div key={job.id} className="relative group">
            {/* Job Header */}
            <div className="mb-2">
              <h3 className="text-lg font-bold group-hover:text-orange-500 transition-colors duration-300">{job.role}</h3>
              
              <div className="flex flex-wrap items-baseline justify-between text-sm mt-1">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{job.company}</span>
                {job.period && (
                  <span className="text-gray-500 font-medium">{job.period}</span>
                )}
              </div>
            </div>

            {/* Job Description */}
            <ul className="space-y-2 mt-3">
              {job.description.map((point, idx) => (
                <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex items-start group-hover:text-orange-500 transition-colors duration-300">
                  <span className="mr-2 mt-1.5 block w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 group-hover:bg-orange-500 transition-colors duration-300"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      {/* Bottom padding */}
      <div className="h-20 md:h-0"></div>
    </div>
  );
};

export default ExperienceSection;
