import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Download,
  Image as ImageIcon
} from "lucide-react";
import { products } from "@/data/products";
import { formatIDR } from "@/lib/utils";
import { uploadAPI, ImageInfo } from "@/lib/upload-api";

export default function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReleaseTag, setSelectedReleaseTag] = useState("all");
  const [uploadedImages, setUploadedImages] = useState<ImageInfo[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  // Set token from localStorage
  const token = localStorage.getItem('admin_token');
  if (token) {
    uploadAPI.setToken(token);
  }

  useEffect(() => {
    loadUploadedImages();
  }, []);

  const loadUploadedImages = async () => {
    try {
      setLoadingImages(true);
      const response = await uploadAPI.getImageList(0, 100);
      setUploadedImages(response.files);
    } catch (error) {
      console.error('Failed to load images:', error);
    } finally {
      setLoadingImages(false);
    }
  };

  // Filter products based on search and release tag
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReleaseTag = selectedReleaseTag === "all" || product.release_tag === selectedReleaseTag;
    return matchesSearch && matchesReleaseTag;
  });

  const getStatusBadge = (product: any) => {
    if (product.bestseller) {
      return <Badge className="bg-green-100 text-green-800">Bestseller</Badge>;
    }
    if (product.newRelease) {
      return <Badge className="bg-blue-100 text-blue-800">New Release</Badge>;
    }
    return <Badge variant="secondary">Regular</Badge>;
  };

  const getReleaseTagBadge = (releaseTag: string) => {
    const colors = {
      "vol 1": "bg-purple-100 text-purple-800",
      "vol 2": "bg-orange-100 text-orange-800",
      "vol 3": "bg-pink-100 text-pink-800"
    };
    return <Badge className={colors[releaseTag as keyof typeof colors]}>{releaseTag}</Badge>;
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manajemen Produk</h1>
            <p className="text-gray-600">Kelola katalog produk dan stok</p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Produk
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => window.location.href = '/admin/images'}>
              <ImageIcon className="h-4 w-4" />
              Kelola Gambar
            </Button>
          </div>
        </div>

        {/* Filter dan Pencarian */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Release: {selectedReleaseTag === "all" ? "Semua" : selectedReleaseTag}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedReleaseTag("all")}>
                    Semua Release
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedReleaseTag("vol 1")}>
                    Vol 1
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedReleaseTag("vol 2")}>
                    Vol 2
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedReleaseTag("vol 3")}>
                    Vol 3
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Ekspor
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabel Produk */}
        <Card>
          <CardHeader>
            <CardTitle>Produk ({filteredProducts.length})</CardTitle>
            <CardDescription>
              Kelola stok dan detail produk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Release Volume</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {getReleaseTagBadge(product.release_tag)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatIDR(product.price)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(product)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">★</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Lihat
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-gray-600">Di semua release volume</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Terlaris</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.bestseller).length}
              </div>
              <p className="text-xs text-gray-600">Performa terbaik</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Rilis Baru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {products.filter(p => p.newRelease).length}
              </div>
              <p className="text-xs text-gray-600">Tambahan terbaru</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Rating Rata-rata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
              </div>
              <p className="text-xs text-gray-600">Kepuasan pelanggan</p>
            </CardContent>
          </Card>
        </div>
    </>
  );
}
