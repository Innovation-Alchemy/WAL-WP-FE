import React from 'react';

interface EventTagsProps {
  tags: string[];
}

const EventTags: React.FC<EventTagsProps> = ({ tags }) => {
  return (
    <div>
      <p className="text-primary py-2 font-bold">Tags</p>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <p
            key={index}
            className="text-sm font-bold bg-primary text-secondary px-1 py-3 lg:px-2 lg:py-4 rounded-lg min-w-[100px] text-center mr-4 mb-4"
          >
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EventTags;
