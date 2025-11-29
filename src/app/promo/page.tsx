import AppLayout from "@/components/app-layout";
import PromoGeneratorForm from "./promo-generator-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PromoPage() {
  return (
    <AppLayout title="Promosi Otomatis">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Buat Poster Promosi dengan AI</CardTitle>
                <CardDescription>
                    Isi detail produk Anda, unggah foto, dan biarkan AI membuatkan poster promosi yang menarik untuk Anda dalam sekejap.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <PromoGeneratorForm />
            </CardContent>
        </Card>
    </AppLayout>
  );
}
