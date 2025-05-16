"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTimestamp } from "@/lib/utils";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import type { StoreTraffic } from "./dashboard";

export default function LiveTable({ data }: { data: StoreTraffic[] }) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-40">
        <p className="text-muted-foreground">Waiting for traffic data...</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>In</TableHead>
            <TableHead>Out</TableHead>
            <TableHead>Net Change</TableHead>
            <TableHead className="text-right">Current Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            const netChange = item.customers_in - item.customers_out;
            return (
              <TableRow
                key={index}
                className="slide-in-from-top-5 animate-in duration-300 fade-in-50"
              >
                <TableCell className="font-medium">
                  {formatTimestamp(item.time_stamp)}
                </TableCell>
                <TableCell>{item.customers_in}</TableCell>
                <TableCell>{item.customers_out}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {netChange > 0 ? (
                      <ArrowUp className="size-4 text-green-500" />
                    ) : netChange < 0 ? (
                      <ArrowDown className="size-4 text-red-500" />
                    ) : (
                      <Minus className="size-4 text-gray-500" />
                    )}
                    {Math.abs(netChange)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {item.current_count}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
