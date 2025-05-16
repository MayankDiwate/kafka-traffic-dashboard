"use client";

import HistoryTable from "@/components/history-table";
import LiveTable from "@/components/live-table";
import StoreTrafficChart from "@/components/store-traffic-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export type StoreTraffic = {
  store_id: number;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
  current_count?: number;
};

export type HourlyTraffic = {
  hour: string;
  customers_in: number;
  customers_out: number;
  net_change: number;
};

export default function Dashboard() {
  const [selectedStore, setSelectedStore] = useState<number>(10);
  const [liveTraffic, setLiveTraffic] = useState<StoreTraffic[]>([]);
  const [historyTraffic, setHistoryTraffic] = useState<HourlyTraffic[]>([]);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    const socket = io(
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
    );

    socket.on("trafficUpdate", (data: StoreTraffic) => {
      if (data.store_id === selectedStore) {
        const newCount = currentCount + data.customers_in - data.customers_out;
        setCurrentCount(newCount);

        setLiveTraffic((prev) => {
          const newData = { ...data, current_count: newCount };
          return [newData, ...prev].slice(0, 100);
        });

        if (data.customers_in > 5 || data.customers_out > 5) {
          toast({
            title: `Store #${data.store_id}`,
            description: `${
              data.customers_in > 0
                ? `${data.customers_in} customers entered`
                : ""
            } 
                         ${
                           data.customers_out > 0
                             ? `${data.customers_out} customers left`
                             : ""
                         }`,
          });
        }
      }
    });

    fetchHistoricalData(selectedStore);

    return () => {
      socket.disconnect();
    };
  }, [selectedStore]);

  const fetchHistoricalData = async (storeId: number) => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
        }/api/history/${storeId}`
      );
      const data = await response.json();
      setHistoryTraffic(data);
    } catch (error) {
      console.error("Failed to fetch historical data:", error);
      toast({
        title: "Error",
        description: "Failed to load historical data. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleStoreChange = (storeId: number) => {
    setSelectedStore(storeId);
    setLiveTraffic([]);
    setCurrentCount(0);
  };

  return (
    <div className="space-y-6 mx-auto py-6 container">
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Store Traffic Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor customer traffic in real-time and view historical data
          </p>
        </div>
        {/* <StoreSelector
          selectedStore={selectedStore}
          onStoreChange={handleStoreChange}
        /> */}
      </div>

      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Current Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{currentCount}</div>
            <p className="text-muted-foreground text-xs">
              People currently in store
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Today's Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {historyTraffic.reduce((sum, item) => sum + item.customers_in, 0)}
            </div>
            <p className="text-muted-foreground text-xs">
              Total customers entered today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Today's Exits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {historyTraffic.reduce(
                (sum, item) => sum + item.customers_out,
                0
              )}
            </div>
            <p className="text-muted-foreground text-xs">
              Total customers exited today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Net Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {historyTraffic.reduce((sum, item) => sum + item.net_change, 0)}
            </div>
            <p className="text-muted-foreground text-xs">
              Net customer change today
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>
            Customer traffic over the last 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <StoreTrafficChart data={historyTraffic} />
        </CardContent>
      </Card>

      <Tabs defaultValue="live" className="w-full">
        <TabsList>
          <TabsTrigger value="live">Live Traffic</TabsTrigger>
          <TabsTrigger value="history">Historical Data</TabsTrigger>
        </TabsList>
        <TabsContent value="live">
          <Card>
            <CardHeader>
              <CardTitle>Live Store Traffic</CardTitle>
              <CardDescription>
                Real-time customer entries and exits for Store #{selectedStore}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LiveTable data={liveTraffic} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historical Traffic Data</CardTitle>
              <CardDescription>
                Hourly customer traffic for the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HistoryTable data={historyTraffic} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
