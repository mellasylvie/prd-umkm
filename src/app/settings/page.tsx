import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <AppLayout title="Pengaturan Akun">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Profil UMKM</CardTitle>
            <CardDescription>
              Perbarui informasi profil usaha Anda di sini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="business-name">Nama Usaha</Label>
                <Input
                  id="business-name"
                  defaultValue="Kopi Senja"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori Bisnis</Label>
                <Select defaultValue="fb">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fb">F&B</SelectItem>
                    <SelectItem value="fashion">Fashion & Craft</SelectItem>
                    <SelectItem value="service">Jasa</SelectItem>
                    <SelectItem value="retail">Retail Kecil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  defaultValue="Jl. Kenangan No. 1, Jakarta"
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="kontak@kopisenja.com"
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="phone">Nomor WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+6281234567890"
                />
              </div>
              <div className="md:col-span-2">
                <Button type="submit">Simpan Perubahan</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-destructive">Hapus Akun</CardTitle>
            <CardDescription>
                Tindakan ini tidak dapat diurungkan. Semua data minisite dan katalog Anda akan dihapus secara permanen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Saya mengerti, hapus akun saya</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
