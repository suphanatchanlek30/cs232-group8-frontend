# CS232 Group 8 Frontend

คู่มือทำงานร่วมกันฝั่ง Frontend แบบสั้น

## 1) โครงสร้าง Branch ที่ใช้
- `main` = โค้ดพร้อมใช้งานจริง (stable)
- `dev` = รวมงานจากทุกคนเพื่อทดสอบร่วมกัน
- `feat/...` = งานฟีเจอร์ย่อยของแต่ละคน
- `fix/...` = งานแก้บั๊ก

Flow หลัก: `main -> dev -> feat/*` (ทำงานบน `feat/*` แล้ว merge กลับ `dev` ก่อน จากนั้นค่อย `dev` ไป `main`)

## 2) ขั้นตอนทำงานจริง (ก่อนทำ PR จน merge)
1. ดึงโค้ดล่าสุดจาก `main` และ `dev`
2. สร้าง branch งานจาก `dev`
3. พัฒนา + build ให้ผ่าน
4. commit และ push ขึ้น remote
5. เปิด PR: `feat/*` -> `dev`
6. แก้ตาม review แล้ว merge เข้า `dev`
7. เมื่อพร้อม release ค่อยเปิด PR: `dev` -> `main`

## 3) คำสั่ง Git + อธิบายสั้น ๆ
### เตรียมก่อนเริ่มงาน
```bash
git checkout main
git pull origin main
git checkout dev
git pull origin dev
git checkout -b feat/login-page
```
- `git checkout main` = สลับไป branch `main`
- `git pull origin main` = ดึงโค้ดล่าสุดของ `main`
- `git checkout dev` = สลับไป branch `dev`
- `git pull origin dev` = อัปเดต `dev` ให้ล่าสุด
- `git checkout -b feat/login-page` = สร้าง branch งานใหม่จาก `dev` และสลับไปทำงานทันที

### ตอนบันทึกงาน
```bash
git status
git add .
git commit -m "feat: add login page layout"
```
- `git status` = เช็กไฟล์ที่แก้
- `git add .` = เตรียมไฟล์ทั้งหมดสำหรับ commit
- `git commit -m "..."` = บันทึกประวัติการแก้ไขเป็นรอบงาน

### ตอนส่งงานและเปิด PR
```bash
git push -u origin feat/login-page
```
- `git push -u origin feat/login-page` = ส่ง branch ขึ้น GitHub และผูก upstream
- จากนั้นเปิด PR: `feat/login-page` -> `dev`

### เช็กก่อนเปิด PR (Frontend)
```bash
npm install
npm run build
```
- `npm install` = ติดตั้ง dependencies
- `npm run build` = ตรวจว่าโปรเจกต์ build ผ่านจริง

> ถ้า build ไม่ผ่าน ยังไม่ควรเปิด PR

## 4) ตัวอย่างให้เห็นภาพ (งาน Login)
- สร้าง `feat/login-page` จาก `dev`
- ทำ UI หน้า Login
- รัน `npm run build` ให้ผ่าน
- commit: `feat: add login page layout`
- push และเปิด PR เข้า `dev`
- ผ่าน review แล้ว merge เข้า `dev`
- รอบ release ค่อยรวม `dev` เข้า `main`

## 5) กติกาทีมแบบสั้น
- ห้าม push ตรงเข้า `main`
- 1 PR = 1 เรื่องหลัก (รีวิวง่าย)
- ชื่อ branch ให้ชัด: `feat/...`, `fix/...`, `chore/...`
- commit message ใช้รูปแบบ: `feat: ...`, `fix: ...`, `chore: ...`

## 6) Deploy Frontend ไป Vercel
ตั้งค่า Environment Variables ใน Vercel ตามนี้

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.example.com
NEXT_PUBLIC_LIFF_ID=your-liff-id
```

- `NEXT_PUBLIC_API_BASE_URL` = URL ของ backend ที่ frontend จะเรียกผ่าน browser
- `NEXT_PUBLIC_LIFF_ID` = LIFF ID สำหรับ auth/reporter flow

สิ่งที่ต้องเช็กเพิ่มก่อน deploy

- Backend ต้องเปิด CORS ให้โดเมนของ Vercel เช่น `https://your-project.vercel.app`
- ถ้าใช้ custom domain ให้เพิ่ม domain นั้นใน CORS ด้วย
- ถ้า LIFF จำกัด callback/origin ให้เพิ่มโดเมน Vercel หรือ custom domain ใน LINE Developers Console