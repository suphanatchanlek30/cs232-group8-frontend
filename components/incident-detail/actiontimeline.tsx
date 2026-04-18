// components/incident-detail/actiontimeline.tsx

const timelineData = [
  { time: "12:48", title: "รับรายงาน RPT-1021", desc: "ระบบรับข้อมูลจาก Mobile App พร้อมรูปหลักฐาน" },
  { time: "12:50", title: "ระบบสร้างเหตุการณ์ใหม่", desc: "สร้าง Incident INC-2026-0148 จากรายงานแรก" },
  { time: "13:02", title: "รวมรายงาน RPT-1023 เข้ากับเหตุการณ์นี้", desc: "ระบบตรวจพบว่าเป็นตำแหน่งและคำอธิบายใกล้เคียงกัน" },
  { time: "13:05", title: "วิเคราะห์รูปภาพแล้ว", desc: "พบลักษณะน้ำขังบนพื้นทางเดิน" },
  { time: "13:10", title: "แจ้งเตือนหน่วยงานแล้ว", desc: "ส่งต่อให้ฝ่ายอาคารสถานที่พร้อมข้อมูลสรุปเหตุการณ์" },
  { time: "13:18", title: "เจ้าหน้าที่เปลี่ยนสถานะเป็นกำลังตรวจสอบ", desc: "เริ่มดำเนินการตรวจสอบหน้างาน" },
];

export default function ActionTimeline() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full max-w-2xl">
      <h2 className="text-gray-800 font-semibold mb-4">ลำดับการดำเนินงาน</h2>
      <div className="space-y-3">
        {timelineData.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-800">
              {item.time} - {item.title}
            </p>
            <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}