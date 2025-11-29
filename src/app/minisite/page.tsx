import Image from "next/image";
import { Instagram, MapPin, Phone, ShoppingBag, Globe, Info, Palette, Link as LinkIcon, Clock } from "lucide-react";
import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function MinisitePage() {
  const heroBanner = PlaceHolderImages.find(p => p.id === "hero-banner-1")?.imageUrl ?? "https://picsum.photos/seed/banner1/800/400";
  const logo = PlaceHolderImages.find(p => p.id === "logo-placeholder")?.imageUrl ?? "https://picsum.photos/seed/logo1/100/100";

  return (
    <AppLayout title="Minisite Editor">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="info"><Info className="w-4 h-4 mr-2"/>Info Usaha</TabsTrigger>
              <TabsTrigger value="appearance"><Palette className="w-4 h-4 mr-2"/>Tampilan</TabsTrigger>
              <TabsTrigger value="cta"><LinkIcon className="w-4 h-4 mr-2"/>Tombol Aksi</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Informasi Dasar</CardTitle>
                  <CardDescription>Perbarui informasi tentang usaha Anda.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="business-name">Nama Usaha</Label>
                    <Input id="business-name" defaultValue="Kopi Senja" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about">Tentang Usaha</Label>
                    <Textarea id="about" defaultValue="Menyajikan kopi terbaik dari biji pilihan nusantara. Nikmati senja bersama secangkir kehangatan dari kami." rows={4}/>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="hours">Jam Operasional</Label>
                    <Input id="hours" defaultValue="Setiap Hari, 08:00 - 22:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi & Google Maps</Label>
                    <Input id="location" defaultValue="Jl. Kenangan No. 1, Jakarta" placeholder="Sematkan link Google Maps"/>
                  </div>
                  <Button>Simpan Perubahan</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Tampilan Minisite</CardTitle>
                  <CardDescription>Sesuaikan tampilan visual minisite Anda.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo</Label>
                    <Input id="logo" type="file" />
                    <p className="text-sm text-muted-foreground">Rekomendasi ukuran: 200x200px. Format: JPG, PNG.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="banner">Banner Hero</Label>
                    <Input id="banner" type="file" />
                    <p className="text-sm text-muted-foreground">Rekomendasi ukuran: 1200x600px. Format: JPG, PNG.</p>
                  </div>
                  <Button>Simpan Perubahan</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cta">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Tombol Aksi (CTA)</CardTitle>
                        <CardDescription>Atur tombol yang akan ditampilkan di minisite Anda. Aktifkan dan isi link yang relevan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                           <div className="flex items-center justify-between p-4 border rounded-lg">
                                <Label htmlFor="cta-whatsapp" className="flex items-center gap-3 font-medium"><Phone className="h-5 w-5 text-green-500" /> WhatsApp</Label>
                                <Switch id="cta-whatsapp" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between p-4 border rounded-lg">
                                <Label htmlFor="cta-instagram" className="flex items-center gap-3 font-medium"><Instagram className="h-5 w-5 text-pink-500" /> Instagram</Label>
                                <Switch id="cta-instagram" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50 opacity-70">
                                <Label htmlFor="cta-shopee" className="flex items-center gap-3 font-medium"><ShoppingBag className="h-5 w-5 text-orange-500" /> Shopee/Tokopedia</Label>
                                <Switch id="cta-shopee" />
                            </div>
                             <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50 opacity-70">
                                <Label htmlFor="cta-website" className="flex items-center gap-3 font-medium"><Globe className="h-5 w-5 text-blue-500" /> Website</Label>
                                <Switch id="cta-website" />
                            </div>
                        </div>
                         <Button>Simpan Perubahan</Button>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24 shadow-2xl shadow-primary/10">
            <CardHeader>
              <CardTitle className="font-headline text-center">Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mx-auto w-[300px] h-[600px] bg-white rounded-[30px] border-[8px] border-neutral-800 shadow-xl overflow-hidden">
                <div className="w-full h-full overflow-y-auto bg-slate-50">
                  {/* Minisite content */}
                  <div className="relative">
                    <Image src={heroBanner} alt="Hero Banner" width={300} height={150} className="w-full h-36 object-cover" data-ai-hint="coffee shop interior"/>
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                      <Image src={logo} alt="Logo" width={80} height={80} className="rounded-full border-4 border-white bg-white shadow-lg" data-ai-hint="cafe logo"/>
                    </div>
                  </div>
                  
                  <div className="text-center mt-16 px-4">
                    <h1 className="text-2xl font-bold font-headline text-gray-800">Kopi Senja</h1>
                    <p className="text-sm text-muted-foreground mt-1">Coffee & Eatery</p>
                  </div>

                  <div className="px-6 mt-4 text-center text-sm text-gray-700">
                    <p>Menyajikan kopi terbaik dari biji pilihan nusantara. Nikmati senja bersama secangkir kehangatan dari kami.</p>
                  </div>

                  <div className="px-4 mt-6 space-y-3 text-sm">
                     <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                        <Clock className="w-5 h-5 text-primary/80"/>
                        <span>Setiap Hari, 08:00 - 22:00</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                        <MapPin className="w-5 h-5 text-primary/80"/>
                        <span>Jl. Kenangan No. 1, Jakarta</span>
                    </div>
                  </div>
                  
                  <div className="px-4 mt-6 grid grid-cols-2 gap-3">
                    <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold shadow-md"><Phone className="w-4 h-4 mr-2"/> WhatsApp</Button>
                    <Button className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold shadow-md"><Instagram className="w-4 h-4 mr-2"/> Instagram</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
