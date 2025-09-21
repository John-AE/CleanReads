import BlogCard from '../BlogCard';
import workspaceImage from '@assets/generated_images/Workspace_blog_image_dc76c643.png';

export default function BlogCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <BlogCard
        id="1"
        title="The Art of Mindful Design: Creating Spaces That Inspire"
        excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
        image={workspaceImage}
        author="Sarah Chen"
        publishDate="Mar 15, 2024"
        readTime="5 min"
        category="Design"
        featured={true}
      />
      <BlogCard
        id="2"
        title="Building Better Habits Through Small Changes"
        excerpt="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        image={workspaceImage}
        author="Michael Torres"
        publishDate="Mar 12, 2024"
        readTime="3 min"
        category="Lifestyle"
      />
      <BlogCard
        id="3"
        title="The Future of Remote Work Culture"
        excerpt="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        image={workspaceImage}
        author="Emma Rodriguez"
        publishDate="Mar 10, 2024"
        readTime="7 min"
        category="Technology"
      />
    </div>
  );
}