"use client";

import React, { useEffect, useState } from 'react';
import { 
  getAdminUnits, 
  getRoutingRules, 
  createUnit, 
  createLocation, 
  createRoutingRule, 
  createStaffUser,
  UnitItem,
  RoutingRuleItem
} from '@/services/admin.service';
import { 
  Building2, 
  MapPin, 
  GitMerge, 
  UserPlus, 
  Plus, 
  ShieldCheck, 
  Loader2
} from 'lucide-react';

export default function AdminCenterPage() {
  const [activeTab, setActiveTab] = useState<'units' | 'locations' | 'rules' | 'users'>('units');
  const [units, setUnits] = useState<UnitItem[]>([]);
  const [rules, setRules] = useState<RoutingRuleItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [unitForm, setUnitForm] = useState({ name: '', code: '', email: '', description: '' });
  const [locForm, setLocForm] = useState({ locationName: '', buildingCode: '', lat: 14.072, lng: 100.601 });
  const [ruleForm, setRuleForm] = useState({ incidentType: '', severity: 'LOW', assignedUnitId: '', priority: 1 });
  const [userForm, setUserForm] = useState({ fullName: '', email: '', password: '', unitId: '', role: 'STAFF' as 'STAFF' | 'ADMIN' });

  useEffect(() => {
    loadMetadata();
  }, []);

  const loadMetadata = async () => {
    try {
      setLoading(true);
      const [uData, rData] = await Promise.all([
        getAdminUnits(1, 100),
        getRoutingRules()
      ]);
      setUnits(uData.items);
      setRules(rData);
    } catch (error) {
      console.error("Failed to load admin metadata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUnit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUnit(unitForm);
      alert("สร้างหน่วยงานสำเร็จ");
      setUnitForm({ name: '', code: '', email: '', description: '' });
      loadMetadata();
    } catch {
      alert("เกิดข้อผิดพลาดในการสร้างหน่วยงาน");
    }
  };

  const handleCreateLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLocation(locForm);
      alert("สร้างสถานที่สำเร็จ");
      setLocForm({ locationName: '', buildingCode: '', lat: 14.072, lng: 100.601 });
    } catch {
      alert("เกิดข้อผิดพลาดในการสร้างสถานที่");
    }
  };

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRoutingRule(ruleForm);
      alert("สร้างกฎการส่งต่องานสำเร็จ");
      setRuleForm({ incidentType: '', severity: 'LOW', assignedUnitId: '', priority: 1 });
      loadMetadata();
    } catch {
      alert("เกิดข้อผิดพลาดในการสร้างกฎ");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createStaffUser(userForm);
      alert("สร้างบัญชีผู้ใช้งานสำเร็จ");
      setUserForm({ fullName: '', email: '', password: '', unitId: '', role: 'STAFF' });
    } catch {
      alert("เกิดข้อผิดพลาดในการสร้างผู้ใช้งาน");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 w-full space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Admin Center</h1>
          <p className="text-neutral-500 mt-1">จัดการข้อมูลมาสเตอร์และกฎการทำงานของระบบ</p>
        </div>
        
        <div className="flex bg-neutral-100 p-1 rounded-xl">
          <TabButton 
            active={activeTab === 'units'} 
            onClick={() => setActiveTab('units')} 
            icon={<Building2 size={16} />} 
            label="หน่วยงาน" 
          />
          <TabButton 
            active={activeTab === 'locations'} 
            onClick={() => setActiveTab('locations')} 
            icon={<MapPin size={16} />} 
            label="สถานที่" 
          />
          <TabButton 
            active={activeTab === 'rules'} 
            onClick={() => setActiveTab('rules')} 
            icon={<GitMerge size={16} />} 
            label="กฎการส่งต่อ" 
          />
          <TabButton 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')} 
            icon={<UserPlus size={16} />} 
            label="ผู้ใช้งาน" 
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form / Content */}
        <div className="lg:col-span-8 space-y-8">
          {activeTab === 'units' && (
            <section className="space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm">
                <h2 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                  <Plus className="text-indigo-500" />
                  เพิ่มหน่วยงานใหม่
                </h2>
                <form onSubmit={handleCreateUnit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    label="ชื่อหน่วยงาน" 
                    value={unitForm.name} 
                    onChange={v => setUnitForm({...unitForm, name: v})} 
                    placeholder="เช่น ฝ่ายอาคารสถานที่"
                  />
                  <Input 
                    label="รหัสหน่วยงาน (Code)" 
                    value={unitForm.code} 
                    onChange={v => setUnitForm({...unitForm, code: v})} 
                    placeholder="เช่น FAC"
                  />
                  <Input 
                    label="อีเมลติดต่อ" 
                    value={unitForm.email} 
                    onChange={v => setUnitForm({...unitForm, email: v})} 
                    placeholder="facilities@tu.ac.th"
                  />
                  <Input 
                    label="คำอธิบาย (ไม่บังคับ)" 
                    value={unitForm.description} 
                    onChange={v => setUnitForm({...unitForm, description: v})} 
                    placeholder="..."
                  />
                  <div className="md:col-span-2 pt-2">
                    <button className="w-full h-12 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                      <Building2 size={18} />
                      สร้างหน่วยงาน
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm">
                <div className="p-6 border-b border-neutral-50 flex items-center justify-between">
                  <h3 className="font-bold text-neutral-800 uppercase text-xs tracking-widest">หน่วยงานทั้งหมด</h3>
                  <span className="bg-neutral-100 text-neutral-500 px-3 py-1 rounded-full text-[10px] font-bold">{units.length} UNITS</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-neutral-50/50 text-neutral-400 text-[10px] uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Code</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50 text-sm">
                      {units.map(u => (
                        <tr key={u.unitId} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs text-indigo-600">{u.code}</td>
                          <td className="px-6 py-4 font-medium text-neutral-800">{u.name}</td>
                          <td className="px-6 py-4 text-neutral-500">{u.contactEmail || '-'}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase">
                              <ShieldCheck size={10} /> Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'locations' && (
            <section className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm max-w-2xl">
              <h2 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                <Plus className="text-indigo-500" />
                เพิ่มสถานที่ Master
              </h2>
              <form onSubmit={handleCreateLocation} className="space-y-6">
                <Input 
                  label="ชื่อสถานที่" 
                  value={locForm.locationName} 
                  onChange={v => setLocForm({...locForm, locationName: v})} 
                  placeholder="เช่น หน้าตึก LC"
                />
                <Input 
                  label="รหัสอาคาร (Building Code)" 
                  value={locForm.buildingCode} 
                  onChange={v => setLocForm({...locForm, buildingCode: v})} 
                  placeholder="LC"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Latitude" 
                    type="number"
                    value={locForm.lat.toString()} 
                    onChange={v => setLocForm({...locForm, lat: parseFloat(v)})} 
                  />
                  <Input 
                    label="Longitude" 
                    type="number"
                    value={locForm.lng.toString()} 
                    onChange={v => setLocForm({...locForm, lng: parseFloat(v)})} 
                  />
                </div>
                <button className="w-full h-12 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                  <MapPin size={18} />
                  บันทึกสถานที่
                </button>
              </form>
            </section>
          )}

          {activeTab === 'rules' && (
            <section className="space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm">
                <h2 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                  <Plus className="text-indigo-500" />
                  สร้างกฎการส่งต่องาน (Routing Rule)
                </h2>
                <form onSubmit={handleCreateRule} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">ประเภทเหตุการณ์</label>
                    <select 
                      value={ruleForm.incidentType}
                      onChange={(e) => setRuleForm({...ruleForm, incidentType: e.target.value})}
                      className="w-full h-12 px-4 bg-neutral-50 border border-neutral-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option value="">-- เลือกประเภท --</option>
                      <option value="fire_smoke">Fire / Smoke</option>
                      <option value="water_leak">Water Leak</option>
                      <option value="waste_issue">Waste / Garbage</option>
                      <option value="facility_issue">Facility Repair</option>
                      <option value="security_issue">Security Concern</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">ระดับความรุนแรง</label>
                    <select 
                      value={ruleForm.severity}
                      onChange={(e) => setRuleForm({...ruleForm, severity: e.target.value})}
                      className="w-full h-12 px-4 bg-neutral-50 border border-neutral-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                      <option value="CRITICAL">CRITICAL</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">หน่วยงานที่รับผิดชอบ</label>
                    <select 
                      value={ruleForm.assignedUnitId}
                      onChange={(e) => setRuleForm({...ruleForm, assignedUnitId: e.target.value})}
                      className="w-full h-12 px-4 bg-neutral-50 border border-neutral-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option value="">-- เลือกหน่วยงาน --</option>
                      {units.map(u => (
                        <option key={u.unitId} value={u.unitId}>{u.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2 pt-2">
                    <button className="w-full h-12 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                      <GitMerge size={18} />
                      สร้างกฎ
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm">
                <div className="p-6 border-b border-neutral-50">
                  <h3 className="font-bold text-neutral-800 uppercase text-xs tracking-widest">Active Routing Rules</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-neutral-50/50 text-neutral-400 text-[10px] uppercase font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Incident Type</th>
                        <th className="px-6 py-4">Severity</th>
                        <th className="px-6 py-4">Assigned Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-50 text-sm">
                      {rules.map(r => (
                        <tr key={r.ruleId} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-neutral-800 capitalize">{r.incidentType.replace('_', ' ')}</td>
                          <td className="px-6 py-4">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              r.severity === 'CRITICAL' ? 'bg-purple-50 text-purple-600' :
                              r.severity === 'HIGH' ? 'bg-red-50 text-red-600' :
                              'bg-neutral-100 text-neutral-600'
                            }`}>
                              {r.severity}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-indigo-600 font-medium">{r.assignedUnitName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'users' && (
            <section className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-sm max-w-2xl">
              <h2 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                <Plus className="text-indigo-500" />
                สร้างบัญชีเจ้าหน้าที่ (Staff/Admin)
              </h2>
              <form onSubmit={handleCreateUser} className="space-y-6">
                <Input 
                  label="ชื่อ-นามสกุล" 
                  value={userForm.fullName} 
                  onChange={v => setUserForm({...userForm, fullName: v})} 
                  placeholder="สมชาย ใจดี"
                />
                <Input 
                  label="อีเมล" 
                  value={userForm.email} 
                  onChange={v => setUserForm({...userForm, email: v})} 
                  placeholder="staff@tu.ac.th"
                />
                <Input 
                  label="รหัสผ่าน" 
                  type="password"
                  value={userForm.password} 
                  onChange={v => setUserForm({...userForm, password: v})} 
                  placeholder="********"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">หน่วยงาน</label>
                    <select 
                      value={userForm.unitId}
                      onChange={(e) => setUserForm({...userForm, unitId: e.target.value})}
                      className="w-full h-12 px-4 bg-neutral-50 border border-neutral-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option value="">-- ไม่ระบุ --</option>
                      {units.map(u => (
                        <option key={u.unitId} value={u.unitId}>{u.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">บทบาท (Role)</label>
                    <select 
                      value={userForm.role}
                      onChange={(e) => setUserForm({...userForm, role: e.target.value as 'STAFF' | 'ADMIN'})}
                      className="w-full h-12 px-4 bg-neutral-50 border border-neutral-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option value="STAFF">STAFF</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </div>
                </div>
                <button className="w-full h-12 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                  <UserPlus size={18} />
                  สร้างบัญชีผู้ใช้งาน
                </button>
              </form>
            </section>
          )}
        </div>

        {/* Right Column: Information / Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700" />
            
            <h4 className="font-bold text-neutral-900 mb-2 flex items-center gap-2 relative z-10">
              <ShieldCheck size={20} className="text-indigo-600" />
              Admin Control
            </h4>
            <p className="text-neutral-500 text-xs leading-relaxed relative z-10">
              หน้านี้สำหรับผู้ดูแลระบบในการจัดการข้อมูล Master Data และกฎการส่งต่องานอัตโนมัติ เพื่อให้ระบบสามารถประมวลผลเหตุการณ์ได้อย่างแม่นยำ
            </p>
            
            <div className="mt-6 space-y-3 relative z-10">
              <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded-2xl text-[10px] font-bold text-neutral-600 uppercase tracking-widest border border-neutral-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                System v1.0.4 Online
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm">
            <h4 className="font-bold text-neutral-800 text-xs uppercase tracking-widest mb-6 pb-4 border-b border-neutral-50">Quick Facts</h4>
            <div className="space-y-4">
              <FactItem label="Total Units" value={units.length} />
              <FactItem label="Active Rules" value={rules.length} />
              <FactItem label="API Status" value="Connected" />
              <FactItem label="Environment" value="Production" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
        active 
          ? 'bg-white text-neutral-900 shadow-sm' 
          : 'text-neutral-500 hover:text-neutral-700'
      }`}
    >
      <span className={active ? 'text-indigo-600' : ''}>{icon}</span>
      {label}
    </button>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">{label}</label>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200/50 rounded-xl text-sm outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all placeholder:text-neutral-300"
      />
    </div>
  );
}

function FactItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between group">
      <span className="text-xs text-neutral-400">{label}</span>
      <span className="text-xs font-bold text-neutral-700 group-hover:text-indigo-600 transition-colors">{value}</span>
    </div>
  );
}
