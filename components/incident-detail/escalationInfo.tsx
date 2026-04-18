const escalationData = {
  unit: "ฝ่ายอาคารสถานที่",
  reason: "ระบบส่งต่อเหตุการณ์นี้ไปยังฝ่ายอาคารสถานที่ เนื่องจากจัดอยู่ในประเภทน้ำรั่วและปัญหาสาธารณูปโภค",
  notifiedAt: "24 Mar 2026, 13:10",
  responsible: "Mr. Nattapon S. (Maintenance Team)",
};

export default function EscalationInfo() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full max-w-2xl">
      <h2 className="text-black-600 font-semibold ">
        การส่งต่อและหน่วยงานที่รับผิดชอบ
      </h2>
      <div className="space-y-3">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 font-bold mb-1">หน่วยงานที่รับผิดชอบ</p>
          <p className="text-sm text-gray-800">{escalationData.unit}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 font-bold mb-1">เหตุผลที่ส่งต่อ</p>
          <p className="text-sm text-gray-800">{escalationData.reason}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 font-bold mb-1">เวลาที่แจ้งเตือนแล้ว</p>
          <p className="text-sm text-gray-800">{escalationData.notifiedAt}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 font-bold  mb-1">ผู้รับผิดชอบปัจจุบัน</p>
          <p className="text-sm text-gray-800">{escalationData.responsible}</p>
        </div>
      </div>
    </div>
  );
}