import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Users, MousePointerClick, TrendingUp, LocateIcon } from "lucide-react";
import AppLayout from "@/components/app-layout";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, CartesianGrid, Line, XAxis, YAxis, ResponsiveContainer, Pie, Cell } from "recharts";

const monthlyVisitorsData = [
  { date: "2023-01", visitors: 2000 },
  { date: "2023-02", visitors: 2200 },
  { date: "2023-03", visitors: 3000 },
  { date: "2023-04", visitors: 2500 },
  { date: "2023-05", visitors: 3500 },
  { date: "2023-06", visitors: 3200 },
];

const topProductsData = [
  { product: "Kopi Susu Gula Aren", views: 450 },
  { product: "Croissant Coklat", views: 320 },
  { product: "T-Shirt Polos", views: 280 },
  { product: "Paket Laundry Kiloan", views: 150 },
  { product: "Nasi Goreng Spesial", views: 120 },
];

const ctaClicksData = [
  { name: 'WhatsApp', value: 400, fill: "var(--color-whatsapp)" },
  { name: 'Instagram', value: 300, fill: "var(--color-instagram)" },
  { name: 'Marketplace', value: 200, fill: "var(--color-marketplace)" },
];

const chartConfig = {
  visitors: { label: "Visitors", color: "hsl(var(--primary))" },
  views: { label: "Views", color: "hsl(var(--accent))" },
  whatsapp: { label: "WhatsApp", color: "hsl(var(--chart-1))" },
  instagram: { label: "Instagram", color: "hsl(var(--chart-2))" },
  marketplace: { label: "Marketplace", color: "hsl(var(--chart-3))" },
};

export default function AnalyticsPage() {
  return (
    <AppLayout title="Insight">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Kunjungan Bulanan</CardTitle>
            <CardDescription>Tren pengunjung ke minisite Anda selama 6 bulan terakhir.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <ResponsiveContainer>
                <LineChart data={monthlyVisitorsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="visitors" stroke="var(--color-visitors)" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Produk Paling Populer</CardTitle>
              <CardDescription>Produk yang paling banyak dilihat oleh pengunjung.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <BarChart data={topProductsData} layout="vertical">
                    <CartesianGrid horizontal={false} />
                    <YAxis dataKey="product" type="category" width={120} tickLine={false} axisLine={false} />
                    <XAxis type="number" hide />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Bar dataKey="views" fill="var(--color-views)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Distribusi Klik CTA</CardTitle>
              <CardDescription>Tombol mana yang paling sering diklik oleh pelanggan.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                    <Pie data={ctaClicksData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                       {ctaClicksData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
