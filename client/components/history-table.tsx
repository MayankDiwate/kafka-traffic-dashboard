"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import type { HourlyTraffic } from "./dashboard";

export default function HistoryTable({ data }: { data: HourlyTraffic[] }) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-40">
        <p className="text-muted-foreground">No historical data available</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hour</TableHead>
            <TableHead>Customers In</TableHead>
            <TableHead>Customers Out</TableHead>
            <TableHead>Net Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.hour}</TableCell>
              <TableCell>{item.customers_in}</TableCell>
              <TableCell>{item.customers_out}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {item.net_change > 0 ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : item.net_change < 0 ? (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  ) : (
                    <Minus className="w-4 h-4 text-gray-500" />
                  )}
                  {Math.abs(item.net_change)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
