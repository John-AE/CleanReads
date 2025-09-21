import RichTextEditor from '../RichTextEditor';

export default function RichTextEditorExample() {
  return (
    <RichTextEditor
      onSave={(content) => console.log('Saved:', content)}
      onPreview={() => console.log('Preview clicked')}
      initialTitle="The Art of Modern Design"
      initialContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis."
      initialCategory="Design"
    />
  );
}