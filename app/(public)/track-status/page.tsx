"use client";
import SearchBar from "@/components/track-status/track-search";
import ReportLookup from "@/components/track-status/report-lookup";
import IncidentStatus from "@/components/track-status/incident-status";
import RelatedReports from "@/components/track-status/related-reports";
import TrackHeader from "@/components/track-status/track-header";

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-white">
      <TrackHeader />
      <div className="mx-auto w-full max-w-3xl">
        <SearchBar onSearch={(id) => console.log(id)} />
        <ReportLookup />
        <IncidentStatus />
        <RelatedReports />
      </div>
    </div>
  );
}