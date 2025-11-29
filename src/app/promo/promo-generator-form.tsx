"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generatePromoPoster } from "@/ai/flows/generate-promo-poster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Share2, Copy } from "lucide-react";

const promoSchema = z.object({
  businessName: z.string().min(1, "Nama bisnis harus diisi"),
  businessCategory: z.string().min(1, "Kategori bisnis harus dipilih"),
  productName: z.string().min(1, "Nama produk harus diisi"),
  productDescription: z.string().min(1, "Deskripsi produk harus diisi"),
  productPhoto: z.any().refine(fileList => fileList.length > 0, "Foto produk harus diunggah"),
});

type PromoFormValues = z.infer<typeof promoSchema>;

type GeneratePromoPosterOutput = {
  posterText: string;
  posterImageDataUri: string;
};

const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export default function PromoGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeneratePromoPosterOutput | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<PromoFormValues>({
    resolver: zodResolver(promoSchema),
  });

  const onSubmit = async (data: PromoFormValues) => {
    setIsLoading(true);
    setResult(null);
    try {
        const productPhotoDataUri = await fileToDataUri(data.productPhoto[0]);
        const response = await generatePromoPoster({
            ...data,
            productPhotoDataUri
        });
        setResult(response);
    } catch (error) {
        console.error("Error generating poster:", error);
        toast({
            variant: "destructive",
            title: "Gagal Membuat Poster",
            description: "Terjadi kesalahan saat menghubungi AI. Silakan coba lagi.",
        });
    } finally {
        setIsLoading(false);
    }
  };

  const copyPromoText = () => {
    if (result?.posterText) {
      navigator.clipboard.writeText(result.posterText);
      toast({ title: "Teks promosi disalin!" });
    }
  };


  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Nama Bisnis</Label>
          <Input id="businessName" {...register("businessName")} />
          {errors.businessName && <p className="text-sm text-destructive">{errors.businessName.message}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="businessCategory">Kategori Bisnis</Label>
             <Select onValueChange={(value) => setValue('businessCategory', value)}>
                <SelectTrigger id="businessCategory">
                    <SelectValue placeholder="Pilih kategori..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="F&B">F&B</SelectItem>
                    <SelectItem value="Fashion">Fashion & Craft</SelectItem>
                    <SelectItem value="Jasa">Jasa</SelectItem>
                    <SelectItem value="Retail">Retail Kecil</SelectItem>
                </SelectContent>
            </Select>
            {errors.businessCategory && <p className="text-sm text-destructive">{errors.businessCategory.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="productName">Nama Produk</Label>
          <Input id="productName" {...register("productName")} />
          {errors.productName && <p className="text-sm text-destructive">{errors.productName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="productDescription">Deskripsi Produk</Label>
          <Textarea id="productDescription" {...register("productDescription")} />
          {errors.productDescription && <p className="text-sm text-destructive">{errors.productDescription.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="productPhoto">Foto Produk</Label>
          <Input id="productPhoto" type="file" accept="image/*" {...register("productPhoto")} />
          {errors.productPhoto && <p className="text-sm text-destructive">{errors.productPhoto.message as string}</p>}
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? "Membuat Poster..." : "Buat Poster AI"}
        </Button>
      </form>
      <div className="flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/50 p-4 min-h-[400px]">
        {isLoading && (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>AI sedang bekerja...</p>
                <p className="text-sm">Ini mungkin memakan waktu sejenak.</p>
            </div>
        )}
        {!isLoading && result && (
            <div className="space-y-4 text-center">
                 <Image
                    src={result.posterImageDataUri}
                    alt="Generated Promo Poster"
                    width={400}
                    height={400}
                    className="rounded-lg shadow-lg aspect-square object-cover"
                />
                <p className="text-lg font-semibold bg-primary/10 p-3 rounded-md font-headline">
                    "{result.posterText}"
                </p>
                <div className="flex justify-center gap-2">
                    <Button variant="outline" onClick={copyPromoText}><Copy className="w-4 h-4 mr-2"/> Salin Teks</Button>
                    <Button><Share2 className="w-4 h-4 mr-2"/> Bagikan</Button>
                </div>
            </div>
        )}
        {!isLoading && !result && (
            <div className="text-center text-muted-foreground">
                <p>Hasil poster Anda akan muncul di sini.</p>
            </div>
        )}
      </div>
    </div>
  );
}
