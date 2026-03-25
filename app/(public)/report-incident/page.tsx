// app/(public)/report-incident/page.tsx

import ReportHeader from "@/components/report-incident/report-header";
import ReportForm from "@/components/report-incident/report-form";

export default function ReportPage() {
  return (
    <div className="min-h-screen ">
      <ReportHeader />
      <div className="mx-auto w-full max-w-3xl">
        <ReportForm />
      </div>
    </div>
  );
}