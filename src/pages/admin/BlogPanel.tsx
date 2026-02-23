import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ImageUploader from '@/components/ui/image-uploader';
import { toast } from 'sonner';
import { ApiCall, UploadImage } from './types';

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: string;
  read_time: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

interface BlogPanelProps {
  articles: Article[];
  loading: boolean;
  apiCall: ApiCall;
  uploadImage: UploadImage;
  onReload: () => Promise<void>;
}

const EMPTY_FORM = {
  slug: '', title: '', excerpt: '', content: '',
  image_url: '', category: 'Статья', read_time: '5 мин',
  is_published: true, sort_order: 0,
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[а-яё]/g, c => ({ а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'j',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya' }[c] || c))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function BlogPanel({ articles, loading, apiCall, uploadImage, onReload }: BlogPanelProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editArt, setEditArt] = useState<Article | null>(null);
  const [uploading, setUploading] = useState(false);

  const startEdit = (art: Article) => {
    setEditArt(art);
    setForm({
      slug: art.slug,
      title: art.title,
      excerpt: art.excerpt || '',
      content: art.content || '',
      image_url: art.image_url || '',
      category: art.category,
      read_time: art.read_time,
      is_published: art.is_published,
      sort_order: art.sort_order,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancel = () => {
    setEditArt(null);
    setForm(EMPTY_FORM);
  };

  const handleTitleChange = (title: string) => {
    setForm(f => ({ ...f, title, slug: editArt ? f.slug : slugify(title) }));
  };

  const save = async () => {
    if (!form.title) { toast.error('Введите заголовок'); return; }
    if (!form.slug) { toast.error('Введите slug'); return; }
    const data = editArt
      ? await apiCall('PUT', 'articles', form, editArt.id)
      : await apiCall('POST', 'articles', form);
    if (data.article) {
      toast.success(editArt ? 'Статья обновлена' : 'Статья добавлена');
      cancel();
      await onReload();
    } else {
      toast.error((data.error as string) || 'Ошибка');
    }
  };

  const togglePublished = async (art: Article) => {
    await apiCall('PATCH', 'articles', { is_published: !art.is_published }, art.id);
    await onReload();
  };

  const deleteArt = async (art: Article) => {
    if (!confirm(`Удалить статью «${art.title}»?`)) return;
    const data = await apiCall('DELETE', 'articles', undefined, art.id);
    if (data.deleted) {
      toast.success('Статья удалена');
      await onReload();
    } else {
      toast.error((data.error as string) || 'Ошибка');
    }
  };

  const formatDate = (dt: string) => new Date(dt).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{editArt ? 'Редактировать статью' : 'Новая статья'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Заголовок*</Label>
              <Input value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="Как выбрать нитки" className="mt-1" />
            </div>
            <div>
              <Label>Slug (URL)*</Label>
              <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="kak-vybrat-nitki" className="mt-1 font-mono text-sm" />
            </div>
            <div>
              <Label>Категория</Label>
              <Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Советы" className="mt-1" />
            </div>
            <div>
              <Label>Время чтения</Label>
              <Input value={form.read_time} onChange={e => setForm(f => ({ ...f, read_time: e.target.value }))} placeholder="5 мин" className="mt-1" />
            </div>
            <div>
              <Label>Краткое описание</Label>
              <Textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Краткое описание для превью..." className="mt-1 resize-none" rows={3} />
            </div>
            <div>
              <Label>Текст статьи</Label>
              <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Полный текст статьи..." className="mt-1 resize-none" rows={8} />
            </div>
            <div>
              <Label>Изображение</Label>
              <ImageUploader
                value={form.image_url}
                onChange={url => setForm(f => ({ ...f, image_url: url }))}
                uploading={uploading}
                onUpload={async (file) => {
                  setUploading(true);
                  const url = await uploadImage(file, 'blog');
                  setUploading(false);
                  return url;
                }}
              />
            </div>
            <div>
              <Label>Порядок сортировки</Label>
              <Input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} className="mt-1" />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_published"
                checked={form.is_published}
                onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))}
                className="w-4 h-4"
              />
              <Label htmlFor="is_published">Опубликована</Label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={save} disabled={loading}>
                <Icon name="Save" size={16} className="mr-2" />
                {editArt ? 'Сохранить' : 'Добавить'}
              </Button>
              {editArt && <Button variant="outline" onClick={cancel}>Отмена</Button>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      <div className="lg:col-span-2 space-y-3">
        {articles.length === 0 && <p className="text-muted-foreground text-center py-8">Статей пока нет</p>}
        {articles.map(art => (
          <Card key={art.id} className={!art.is_published ? 'opacity-50' : ''}>
            <CardContent className="p-4">
              <div className="flex gap-3">
                {art.image_url ? (
                  <img src={art.image_url} alt={art.title} className="w-20 h-16 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-20 h-16 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={20} className="text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{art.title}</div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">{art.category}</Badge>
                        <span className="text-xs text-muted-foreground">{art.read_time}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(art.created_at)}</span>
                      </div>
                      {art.excerpt && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{art.excerpt}</p>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button size="sm" variant="outline" onClick={() => startEdit(art)}>
                        <Icon name="Pencil" size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => togglePublished(art)} title={art.is_published ? 'Снять с публикации' : 'Опубликовать'}>
                        <Icon name={art.is_published ? 'EyeOff' : 'Eye'} size={14} />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteArt(art)} className="text-destructive hover:text-destructive">
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
