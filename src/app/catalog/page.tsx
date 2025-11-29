import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import AppLayout from "@/components/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const products = [
  {
    id: "prod-1",
    name: "Kopi Susu Gula Aren",
    status: "Tersedia",
    price: "Rp 18.000",
    category: "Minuman",
    imageId: "product-1",
  },
  {
    id: "prod-2",
    name: "Almond Croissant",
    status: "Tersedia",
    price: "Rp 25.000",
    category: "Makanan",
    imageId: "product-2",
  },
  {
    id: "prod-3",
    name: "T-Shirt 'UMKM Hebat'",
    status: "Habis",
    price: "Rp 120.000",
    category: "Fashion",
    imageId: "product-3",
  },
  {
    id: "prod-4",
    name: "Paket Laundry Express",
    status: "Tersedia",
    price: "Rp 30.000",
    category: "Jasa",
    imageId: "product-4",
  },
];

export default function CatalogPage() {
  return (
    <AppLayout title="Katalog Digital">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
                <CardTitle className="font-headline">Produk Anda</CardTitle>
                <CardDescription>
                Kelola produk dan stok Anda di sini.
                </CardDescription>
            </div>
            <Button>Tambah Produk</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Gambar</span>
                </TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead className="hidden md:table-cell">Kategori</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const image = PlaceHolderImages.find(p => p.id === product.imageId);
                return (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      {image && (
                        <Image
                          alt={product.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={image.imageUrl}
                          width="64"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === "Tersedia" ? "outline" : "secondary"}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.category}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Hapus</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Menampilkan <strong>1-4</strong> dari <strong>4</strong> produk
          </div>
        </CardFooter>
      </Card>
    </AppLayout>
  );
}
