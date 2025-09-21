import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bold, Italic, Link, Image, Save, Eye, Upload } from "lucide-react";

interface RichTextEditorProps {
  onSave?: (content: { title: string; content: string; category: string }) => void;
  onPreview?: () => void;
  initialTitle?: string;
  initialContent?: string;
  initialCategory?: string;
}

export default function RichTextEditor({ 
  onSave, 
  onPreview,
  initialTitle = "",
  initialContent = "",
  initialCategory = ""
}: RichTextEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState(initialCategory);
  const [isDraft, setIsDraft] = useState(true);

  const handleSave = () => {
    onSave?.({ title, content, category });
    console.log('Saving post:', { title, content, category, isDraft });
  };

  const handleImageUpload = () => {
    console.log('Image upload triggered');
    // TODO: remove mock functionality - implement real image upload
  };

  const formatText = (format: string) => {
    console.log(`Formatting text with: ${format}`);
    // TODO: remove mock functionality - implement real text formatting
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-serif">Create New Post</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isDraft ? "secondary" : "default"}>
                {isDraft ? "Draft" : "Published"}
              </Badge>
              <Button variant="outline" onClick={onPreview} data-testid="button-preview">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave} data-testid="button-save">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Title */}
          <div>
            <Input
              placeholder="Enter your post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-serif border-0 px-0 focus-visible:ring-0 placeholder:text-muted-foreground"
              data-testid="input-title"
            />
          </div>
          
          {/* Category */}
          <div>
            <Input
              placeholder="Category (e.g., Design, Lifestyle, Technology)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-48 text-sm font-accent"
              data-testid="input-category"
            />
          </div>
          
          {/* Toolbar */}
          <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('bold')}
              data-testid="button-bold"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('italic')}
              data-testid="button-italic"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatText('link')}
              data-testid="button-link"
            >
              <Link className="w-4 h-4" />
            </Button>
            <div className="h-4 w-px bg-border mx-2" />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleImageUpload}
              data-testid="button-image"
            >
              <Image className="w-4 h-4 mr-2" />
              Add Image
            </Button>
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-upload"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          </div>
          
          {/* Editor */}
          <div className="min-h-96">
            <Textarea
              placeholder="Start writing your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-96 text-lg leading-relaxed border-0 px-0 py-4 resize-none focus-visible:ring-0 placeholder:text-muted-foreground"
              data-testid="textarea-content"
            />
          </div>
          
          {/* Publishing Options */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex items-center gap-4">
              <Button
                variant={isDraft ? "default" : "outline"}
                onClick={() => setIsDraft(true)}
                data-testid="button-save-draft"
              >
                Save as Draft
              </Button>
              <Button
                variant={!isDraft ? "default" : "outline"}
                onClick={() => setIsDraft(false)}
                data-testid="button-publish"
              >
                Publish Now
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground font-accent">
              {content.length} characters
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}