// app/(public)/track-status/page.tsx

"use client";
import {
  IncidentStatus,
  RelatedReports,
  ReportLookup,
  SearchBar,
  TrackHeader,
} from "@/components/track-status";
import AuthGuard from "@/components/AuthGuard";

export default function TrackPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-white">
        <TrackHeader />
        <div className="mx-auto w-full max-w-3xl">
          <SearchBar onSearch={(id) => console.log(id)} />
          <ReportLookup />
          <IncidentStatus />
          <RelatedReports />
        </div>
      </div>
    </AuthGuard>
  );
}