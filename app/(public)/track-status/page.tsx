"use client";
import SearchBar from "@/components/track-status/track-search";

export default function TrackPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-3xl">
        <h1>Track Status</h1>
        <SearchBar onSearch={(id) => console.log(id)} />
      </div>
    </div>
  );
}