/**
 * Image Upload Component
 * Handles single and multiple image uploads with preview
 */

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { uploadAPI, UploadResponse } from '@/lib/upload-api';

interface ImageUploadProps {
  onUploadSuccess?: (response: UploadResponse) => void;
  onUploadError?: (error: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  className?: string;
}

interface UploadFile {
  file: File;
  preview: string;
  uploading: boolean;
  uploaded?: boolean;
  response?: UploadResponse;
  error?: string;
}

export default function ImageUpload({
  onUploadSuccess,
  onUploadError,
  multiple = false,
  maxFiles = 10,
  className = ''
}: ImageUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set token from localStorage
  const token = localStorage.getItem('admin_token');
  if (token) {
    uploadAPI.setToken(token);
  }

  const handleFiles = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    
    // Validate file count
    if (files.length + fileArray.length > maxFiles) {
      onUploadError?.(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file types and sizes
    const validFiles: UploadFile[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name}: Not an image file`);
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        errors.push(`${file.name}: File too large (max 5MB)`);
        return;
      }

      // Create preview
      const preview = URL.createObjectURL(file);
      validFiles.push({
        file,
        preview,
        uploading: false
      });
    });

    if (errors.length > 0) {
      onUploadError?.(errors.join(', '));
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const uploadFile = async (fileIndex: number) => {
    const fileData = files[fileIndex];
    if (!fileData || fileData.uploading) return;

    setFiles(prev => {
      const newFiles = [...prev];
      newFiles[fileIndex] = { ...fileData, uploading: true };
      return newFiles;
    });

    try {
      const response = await uploadAPI.uploadImage(fileData.file);
      
      setFiles(prev => {
        const newFiles = [...prev];
        newFiles[fileIndex] = { 
          ...fileData, 
          uploading: false, 
          uploaded: true, 
          response 
        };
        return newFiles;
      });

      onUploadSuccess?.(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      
      setFiles(prev => {
        const newFiles = [...prev];
        newFiles[fileIndex] = { 
          ...fileData, 
          uploading: false, 
          error: errorMessage 
        };
        return newFiles;
      });

      onUploadError?.(errorMessage);
    }
  };

  const uploadAllFiles = async () => {
    const filesToUpload = files.filter(f => !f.uploaded && !f.uploading);
    
    for (let i = 0; i < filesToUpload.length; i++) {
      const fileIndex = files.findIndex(f => f === filesToUpload[i]);
      await uploadFile(fileIndex);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const uploadedCount = files.filter(f => f.uploaded).length;
  const uploadingCount = files.filter(f => f.uploading).length;
  const errorCount = files.filter(f => f.error).length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Gambar
          </CardTitle>
          <CardDescription>
            {multiple 
              ? `Upload hingga ${maxFiles} gambar sekaligus (max 5MB per file)`
              : 'Upload 1 gambar (max 5MB)'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium mb-2">
              {dragActive ? 'Drop files here' : 'Drag & drop images here'}
            </p>
            <p className="text-gray-500 mb-4">or</p>
            <Button onClick={openFileDialog} variant="outline">
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple={multiple}
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Files ({files.length})</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline">
                  Uploaded: {uploadedCount}
                </Badge>
                {uploadingCount > 0 && (
                  <Badge variant="secondary">
                    Uploading: {uploadingCount}
                  </Badge>
                )}
                {errorCount > 0 && (
                  <Badge variant="destructive">
                    Errors: {errorCount}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((fileData, index) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  {/* Preview */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={fileData.preview}
                      alt={fileData.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{fileData.file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    
                    {/* Status */}
                    {fileData.uploading && (
                      <div className="mt-2">
                        <Progress value={50} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">Uploading...</p>
                      </div>
                    )}
                    
                    {fileData.uploaded && (
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Uploaded successfully</span>
                      </div>
                    )}
                    
                    {fileData.error && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-600">{fileData.error}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!fileData.uploaded && !fileData.uploading && (
                      <Button
                        size="sm"
                        onClick={() => uploadFile(index)}
                        disabled={!token}
                      >
                        {token ? 'Upload' : 'Login Required'}
                      </Button>
                    )}
                    
                    {fileData.uploading && (
                      <Button size="sm" disabled>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload All Button */}
            {files.some(f => !f.uploaded && !f.uploading) && (
              <div className="mt-4 pt-4 border-t">
                <Button onClick={uploadAllFiles} disabled={!token}>
                  Upload All Files
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
