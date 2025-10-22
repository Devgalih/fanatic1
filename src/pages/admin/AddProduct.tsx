/**
 * Add Product Page
 * Complete product creation form with all features
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Upload, 
  Plus, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadAPI } from '@/lib/upload-api';
import ImageUpload from '@/components/ImageUpload';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  category_id: number;
}

interface ProductVariation {
  id?: number;
  name: string;
  type: string;
  sku: string;
  price: number;
  stock: number;
  image_url: string;
}

interface ProductFormData {
  // Basic Info
  name: string;
  slug: string;
  description: string;
  short_description: string;
  
  // Pricing
  price: number;
  original_price: number;
  discount: number;
  wholesale_price: number;
  cost_price: number;
  
  // Stock & Inventory
  stock: number;
  min_stock: number;
  sku: string;
  barcode: string;
  
  // Category & Subcategory
  category_id: number;
  subcategory_id: number;
  
  // Media
  thumbnail: string;
  video_url: string;
  
  // Product Info
  brand: string;
  model: string;
  release_tag: string;
  
  // Product Variations
  has_variations: boolean;
  variations: ProductVariation[];
  
  // Shipping Info
  weight: number;
  length: number;
  width: number;
  height: number;
  
  // SEO
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  
  // Additional Info
  certification: string;
  brand_registration: string;
  is_preorder: boolean;
  preorder_date: string;
  
  // Status
  is_featured: boolean;
  is_new_arrival: boolean;
  is_draft: boolean;
}

export default function AddProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<ProductFormData>({
    // Basic Info
    name: '',
    slug: '',
    description: '',
    short_description: '',
    
    // Pricing
    price: 0,
    original_price: 0,
    discount: 0,
    wholesale_price: 0,
    cost_price: 0,
    
    // Stock & Inventory
    stock: 0,
    min_stock: 0,
    sku: '',
    barcode: '',
    
    // Category & Subcategory
    category_id: 0,
    subcategory_id: 0,
    
    // Media
    thumbnail: '',
    video_url: '',
    
    // Product Info
    brand: '',
    model: '',
    release_tag: '',
    
    // Product Variations
    has_variations: false,
    variations: [],
    
    // Shipping Info
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    
    // SEO
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    
    // Additional Info
    certification: '',
    brand_registration: '',
    is_preorder: false,
    preorder_date: '',
    
    // Status
    is_featured: false,
    is_new_arrival: false,
    is_draft: true,
  });

  // Set token from localStorage
  const token = localStorage.getItem('admin_token');
  if (token) {
    uploadAPI.setToken(token);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (formData.category_id) {
      loadSubcategories(formData.category_id);
    }
  }, [formData.category_id]);

  const loadCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const loadSubcategories = async (categoryId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/products/subcategories?category_id=${categoryId}`);
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error('Failed to load subcategories:', error);
    }
  };

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug from name
    if (field === 'name') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleImageUpload = (response: any) => {
    setFormData(prev => ({
      ...prev,
      thumbnail: response.urls.original
    }));
    setSuccess('Gambar berhasil diupload!');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleImageUploadError = (error: string) => {
    setError(error);
    setTimeout(() => setError(null), 5000);
  };

  const addVariation = () => {
    setFormData(prev => ({
      ...prev,
      variations: [
        ...prev.variations,
        {
          name: '',
          type: 'color',
          sku: '',
          price: 0,
          stock: 0,
          image_url: ''
        }
      ]
    }));
  };

  const updateVariation = (index: number, field: keyof ProductVariation, value: any) => {
    setFormData(prev => ({
      ...prev,
      variations: prev.variations.map((variation, i) => 
        i === index ? { ...variation, [field]: value } : variation
      )
    }));
  };

  const removeVariation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/v1/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create product');
      }

      const product = await response.json();
      
      toast({
        title: "Produk berhasil dibuat!",
        description: `Produk "${product.name}" telah berhasil dibuat.`,
      });

      navigate('/admin/products');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create product');
    } finally {
      setSaving(false);
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center h-64">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please login as admin to access this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/products')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tambah Produk</h1>
          <p className="text-gray-600">Buat produk baru dengan informasi lengkap</p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Dasar</TabsTrigger>
            <TabsTrigger value="pricing">Harga</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="variations">Variasi</TabsTrigger>
            <TabsTrigger value="shipping">Pengiriman</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {/* Basic Information */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Dasar Produk</CardTitle>
                <CardDescription>
                  Informasi utama produk yang akan ditampilkan kepada pelanggan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Produk *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Masukkan nama produk"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug URL</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="url-friendly-name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="short_description">Deskripsi Singkat</Label>
                  <Textarea
                    id="short_description"
                    value={formData.short_description}
                    onChange={(e) => handleInputChange('short_description', e.target.value)}
                    placeholder="Deskripsi singkat untuk tampilan listing"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi Lengkap</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Deskripsi lengkap produk"
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category_id">Kategori *</Label>
                    <Select
                      value={formData.category_id.toString()}
                      onValueChange={(value) => handleInputChange('category_id', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subcategory_id">Subkategori</Label>
                    <Select
                      value={formData.subcategory_id.toString()}
                      onValueChange={(value) => handleInputChange('subcategory_id', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih subkategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories.map((subcategory) => (
                          <SelectItem key={subcategory.id} value={subcategory.id.toString()}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Merek</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="Nama merek"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder="Model produk"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="release_tag">Release Tag</Label>
                    <Input
                      id="release_tag"
                      value={formData.release_tag}
                      onChange={(e) => handleInputChange('release_tag', e.target.value)}
                      placeholder="vol 1, vol 2, dll"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Harga & Stok</CardTitle>
                <CardDescription>
                  Atur harga jual, diskon, dan informasi stok produk
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Harga Jual *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="original_price">Harga Asli</Label>
                    <Input
                      id="original_price"
                      type="number"
                      value={formData.original_price}
                      onChange={(e) => handleInputChange('original_price', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discount">Diskon (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={formData.discount}
                      onChange={(e) => handleInputChange('discount', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wholesale_price">Harga Grosir</Label>
                    <Input
                      id="wholesale_price"
                      type="number"
                      value={formData.wholesale_price}
                      onChange={(e) => handleInputChange('wholesale_price', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost_price">Harga Pokok</Label>
                    <Input
                      id="cost_price"
                      type="number"
                      value={formData.cost_price}
                      onChange={(e) => handleInputChange('cost_price', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stok *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min_stock">Stok Minimum</Label>
                    <Input
                      id="min_stock"
                      type="number"
                      value={formData.min_stock}
                      onChange={(e) => handleInputChange('min_stock', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => handleInputChange('sku', e.target.value)}
                      placeholder="Kode unik produk"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      id="barcode"
                      value={formData.barcode}
                      onChange={(e) => handleInputChange('barcode', e.target.value)}
                      placeholder="Barcode produk"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media Produk</CardTitle>
                <CardDescription>
                  Upload gambar dan video untuk produk
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Gambar Utama</Label>
                  <ImageUpload
                    onUploadSuccess={handleImageUpload}
                    onUploadError={handleImageUploadError}
                    multiple={false}
                    maxFiles={1}
                  />
                  {formData.thumbnail && (
                    <div className="mt-2">
                      <img
                        src={formData.thumbnail}
                        alt="Thumbnail"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video_url">URL Video</Label>
                  <Input
                    id="video_url"
                    value={formData.video_url}
                    onChange={(e) => handleInputChange('video_url', e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Variations */}
          <TabsContent value="variations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Variasi Produk</CardTitle>
                <CardDescription>
                  Tambahkan variasi seperti warna, ukuran, atau jenis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_variations"
                    checked={formData.has_variations}
                    onCheckedChange={(checked) => handleInputChange('has_variations', checked)}
                  />
                  <Label htmlFor="has_variations">Produk memiliki variasi</Label>
                </div>

                {formData.has_variations && (
                  <div className="space-y-4">
                    <Button
                      type="button"
                      onClick={addVariation}
                      variant="outline"
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Variasi
                    </Button>

                    {formData.variations.map((variation, index) => (
                      <Card key={index}>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Variasi {index + 1}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeVariation(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label>Nama Variasi</Label>
                              <Input
                                value={variation.name}
                                onChange={(e) => updateVariation(index, 'name', e.target.value)}
                                placeholder="Merah, L, XL"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Tipe</Label>
                              <Select
                                value={variation.type}
                                onValueChange={(value) => updateVariation(index, 'type', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="color">Warna</SelectItem>
                                  <SelectItem value="size">Ukuran</SelectItem>
                                  <SelectItem value="style">Gaya</SelectItem>
                                  <SelectItem value="material">Material</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>SKU</Label>
                              <Input
                                value={variation.sku}
                                onChange={(e) => updateVariation(index, 'sku', e.target.value)}
                                placeholder="SKU variasi"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <Label>Harga</Label>
                              <Input
                                type="number"
                                value={variation.price}
                                onChange={(e) => updateVariation(index, 'price', parseFloat(e.target.value) || 0)}
                                placeholder="0"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Stok</Label>
                              <Input
                                type="number"
                                value={variation.stock}
                                onChange={(e) => updateVariation(index, 'stock', parseInt(e.target.value) || 0)}
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shipping */}
          <TabsContent value="shipping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pengiriman</CardTitle>
                <CardDescription>
                  Dimensi dan berat produk untuk perhitungan ongkir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Berat (gram)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="length">Panjang (cm)</Label>
                    <Input
                      id="length"
                      type="number"
                      value={formData.length}
                      onChange={(e) => handleInputChange('length', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Lebar (cm)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={formData.width}
                      onChange={(e) => handleInputChange('width', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Tinggi (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO & Informasi Tambahan</CardTitle>
                <CardDescription>
                  Optimasi untuk mesin pencari dan informasi tambahan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) => handleInputChange('meta_title', e.target.value)}
                    placeholder="Title untuk SEO"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => handleInputChange('meta_description', e.target.value)}
                    placeholder="Deskripsi untuk SEO"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_keywords">Meta Keywords</Label>
                  <Input
                    id="meta_keywords"
                    value={formData.meta_keywords}
                    onChange={(e) => handleInputChange('meta_keywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="certification">Sertifikasi</Label>
                    <Input
                      id="certification"
                      value={formData.certification}
                      onChange={(e) => handleInputChange('certification', e.target.value)}
                      placeholder="TKDN, SNI, dll"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand_registration">Nomor Pendaftaran Merek</Label>
                    <Input
                      id="brand_registration"
                      value={formData.brand_registration}
                      onChange={(e) => handleInputChange('brand_registration', e.target.value)}
                      placeholder="Nomor pendaftaran merek"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_preorder"
                      checked={formData.is_preorder}
                      onCheckedChange={(checked) => handleInputChange('is_preorder', checked)}
                    />
                    <Label htmlFor="is_preorder">Pre-order</Label>
                  </div>

                  {formData.is_preorder && (
                    <div className="space-y-2">
                      <Label htmlFor="preorder_date">Tanggal Pre-order</Label>
                      <Input
                        id="preorder_date"
                        type="date"
                        value={formData.preorder_date}
                        onChange={(e) => handleInputChange('preorder_date', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Status & Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Status & Aksi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_new_arrival"
                  checked={formData.is_new_arrival}
                  onCheckedChange={(checked) => handleInputChange('is_new_arrival', checked)}
                />
                <Label htmlFor="is_new_arrival">New Arrival</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_draft"
                  checked={formData.is_draft}
                  onCheckedChange={(checked) => handleInputChange('is_draft', checked)}
                />
                <Label htmlFor="is_draft">Draft</Label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={saving}
                className="flex-1"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {formData.is_draft ? 'Simpan Draft' : 'Publish Produk'}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/products')}
              >
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
