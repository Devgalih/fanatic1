/**
 * Image Management Page
 * Admin page for managing uploaded images
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Search, 
  Upload, 
  Trash2, 
  Eye, 
  Download,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { uploadAPI, ImageInfo, UploadResponse } from '@/lib/upload-api';
import ImageUpload from '@/components/ImageUpload';

export default function ImageManagement() {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Set token from localStorage
  const token = localStorage.getItem('admin_token');
  if (token) {
    uploadAPI.setToken(token);
  }

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await uploadAPI.getImageList(0, 100);
      setImages(response.files);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (response: UploadResponse) => {
    setSuccess(`Image "${response.filename}" uploaded successfully!`);
    setUploadDialogOpen(false);
    loadImages(); // Refresh the list
    setTimeout(() => setSuccess(null), 5000);
  };

  const handleUploadError = (error: string) => {
    setError(error);
    setTimeout(() => setError(null), 5000);
  };

  const handleDeleteImage = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) {
      return;
    }

    try {
      await uploadAPI.deleteImage(filename);
      setSuccess(`Image "${filename}" deleted successfully!`);
      loadImages(); // Refresh the list
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete image');
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleViewImage = (image: ImageInfo) => {
    setSelectedImage(image);
  };

  const filteredImages = images.filter(image =>
    image.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center h-64">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please login as admin to access image management.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Image Management</h1>
          <p className="text-gray-600">Upload and manage product images</p>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Images
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upload Images</DialogTitle>
              <DialogDescription>
                Upload product images. Images will be automatically resized and optimized.
              </DialogDescription>
            </DialogHeader>
            <ImageUpload
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
              multiple={true}
              maxFiles={10}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Images Table */}
      <Card>
        <CardHeader>
          <CardTitle>Images ({filteredImages.length})</CardTitle>
          <CardDescription>
            Manage uploaded product images
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Preview</TableHead>
                    <TableHead>Filename</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Dimensions</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredImages.map((image) => (
                    <TableRow key={image.filename}>
                      <TableCell>
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={uploadAPI.getImageURL(image.urls.thumbnail)}
                            alt={image.filename}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{image.filename}</div>
                        <div className="text-sm text-gray-500">
                          {image.mode} • {image.format}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {formatFileSize(image.size)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {image.dimensions.width} × {image.dimensions.height}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {image.format}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500">
                          {formatDate(image.created_at)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewImage(image)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(uploadAPI.getImageURL(image.urls.original), '_blank')}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteImage(image.filename)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
            <DialogDescription>
              {selectedImage?.filename}
            </DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              {/* Image Display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Original</h4>
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={uploadAPI.getImageURL(selectedImage.urls.original)}
                      alt="Original"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedImage.dimensions.width} × {selectedImage.dimensions.height}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Medium</h4>
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={uploadAPI.getImageURL(selectedImage.urls.medium)}
                      alt="Medium"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Thumbnail</h4>
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={uploadAPI.getImageURL(selectedImage.urls.thumbnail)}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Image Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm font-medium text-gray-500">File Size</p>
                  <p className="text-sm">{formatFileSize(selectedImage.size)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Format</p>
                  <p className="text-sm">{selectedImage.format}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Mode</p>
                  <p className="text-sm">{selectedImage.mode}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Uploaded</p>
                  <p className="text-sm">{formatDate(selectedImage.created_at)}</p>
                </div>
              </div>

              {/* URLs */}
              <div className="space-y-2 pt-4 border-t">
                <h4 className="font-medium">URLs</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-20">Original:</span>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                      {uploadAPI.getImageURL(selectedImage.urls.original)}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigator.clipboard.writeText(uploadAPI.getImageURL(selectedImage.urls.original))}
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-20">Medium:</span>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                      {uploadAPI.getImageURL(selectedImage.urls.medium)}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigator.clipboard.writeText(uploadAPI.getImageURL(selectedImage.urls.medium))}
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium w-20">Thumbnail:</span>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                      {uploadAPI.getImageURL(selectedImage.urls.thumbnail)}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigator.clipboard.writeText(uploadAPI.getImageURL(selectedImage.urls.thumbnail))}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
