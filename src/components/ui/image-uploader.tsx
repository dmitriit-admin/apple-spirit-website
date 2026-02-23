import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<string | null>;
  uploading?: boolean;
}

export default function ImageUploader({ value, onChange, onUpload, uploading = false }: ImageUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }
    const url = await onUpload(file);
    if (url) onChange(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleFile(file);
    e.target.value = '';
  };

  if (value) {
    return (
      <div className="mt-2 relative group w-full aspect-video rounded-lg overflow-hidden bg-secondary">
        <img src={value} alt="preview" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => fileRef.current?.click()} disabled={uploading}>
            <Icon name="RefreshCw" size={14} className="mr-1" />
            Заменить
          </Button>
          <Button size="sm" variant="destructive" onClick={() => onChange('')}>
            <Icon name="Trash2" size={14} />
          </Button>
        </div>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleInputChange} />
      </div>
    );
  }

  return (
    <div
      onClick={() => !uploading && fileRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragEnter={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      className={[
        'mt-2 w-full border-2 border-dashed rounded-lg p-6 flex flex-col items-center gap-2 transition-colors',
        uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        isDragOver
          ? 'border-primary bg-primary/10 scale-[1.01]'
          : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5',
      ].join(' ')}
    >
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleInputChange} />
      {uploading ? (
        <>
          <Icon name="Loader2" size={28} className="text-primary animate-spin" />
          <span className="text-sm text-muted-foreground">Загружаю...</span>
        </>
      ) : isDragOver ? (
        <>
          <Icon name="Download" size={28} className="text-primary" />
          <span className="text-sm font-medium text-primary">Отпустите файл</span>
        </>
      ) : (
        <>
          <Icon name="ImagePlus" size={28} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Перетащите или нажмите для выбора</span>
          <span className="text-xs text-muted-foreground/60">JPG, PNG, WebP до 5 МБ</span>
        </>
      )}
    </div>
  );
}
