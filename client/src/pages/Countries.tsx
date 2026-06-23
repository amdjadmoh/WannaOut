import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountries } from "@/lib/api";
import { COUNTRY_FLAGS } from "@/lib/constants";

type Country = {
  _id: string;
  name: string;
  currency: string;
  livingCostEstimate: number;
  visaRequirements: string;
  visaAcceptanceRate: number;
  visaBankAccountAmount: number;
  visaBankAccountLocked: boolean;
  notes?: string;
};

export default function Countries() {
  const { data: countries, isLoading, isError } = useCountries();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Countries</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Countries</h1>
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <p>Failed to load countries. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Countries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {countries?.map((country: Country) => {
          const formatCurrency = (amount: number) => {
            try {
              return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: country.currency || "USD",
                maximumFractionDigits: 0,
              }).format(amount);
            } catch (e) {
              return `${amount} ${country.currency}`;
            }
          };

          return (
            <Link 
              key={country._id} 
              to={`/countries/${country._id}`} 
              className="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg transition-transform hover:-translate-y-1"
            >
              <Card className="h-full hover:bg-muted/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {COUNTRY_FLAGS[country.name] && <span>{COUNTRY_FLAGS[country.name]}</span>}
                    {country.name}
                  </CardTitle>
                  <Badge variant="secondary">{country.currency}</Badge>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Acceptance Rate:</span>
                    <span className="font-medium">{country.visaAcceptanceRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank Account:</span>
                    <span className="font-medium">
                      {formatCurrency(country.visaBankAccountAmount)}
                      <span className="text-muted-foreground ml-1">
                        {country.visaBankAccountLocked ? "(Locked)" : "(Unlocked)"}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Living Cost:</span>
                    <span className="font-medium">{formatCurrency(country.livingCostEstimate)} / mo</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
