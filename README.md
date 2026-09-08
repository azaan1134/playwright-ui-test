# Лаборатори №1: UI автомат тест (Playwright)
Программ хангамжийн чанарын баталгаа ба тест (F.CSA313)
B232270052 С. Азжаргал
---
Энэхүү лабораторийн ажлаар Playwright хэрэгслийг ашиглан [Saucedemo](https://www.saucedemo.com) веб сайтад дараах 3 функционал UI автомат тестийг бичиж, гүйцэтгэсэн:

1. Амжилттай нэвтрэх тест: Зөв хэрэглэгчийн нэр, нууц үгээр нэвтэрч, хуудасны URL болон `Products` текст харагдаж буйг баталгаажуулан, logout хийж дуусгасан.
2. Амжилтгүй нэвтрэх тест: Буруу нууц үгээр нэвтрэх оролдлого хийж, системээс үзүүлж буй алдааны мэдээлэл (`Epic sadface: Username and password do not match any user in this service`) зөв харагдаж байгааг шалгасан.
3. Бараа эрэмбэлэх тест: Амжилттай нэвтэрсний дараа барааны жагсаалтыг үнээр нь өсөхөөр (Low to High) эрэмбэлж, хамгийн эхний бараа "Sauce Labs Onesie" болж өөрчлөгдсөнийг баталгаажуулан logout хийсэн.


* Playwright-ийн орчин үеийн getByRole, getByPlaceholder, getByText(..., { exact: true }) locator-уудыг ашигласан. Код дотор waitForTimeout болон гараар хүлээлгэх ямар нэгэн саатуулах код ашиглаагүй. Playwright-ийн Auto-wait механизм болон expect() assertion-уудыг ашиглан веб элементүүд бэлэн болсон үед үйлдэл хийхээр зохион байгуулсан. Амжилттай нэвтрэх үйлдэл хийсэн тест бүр төгсгөлдөө Logout үйлдэл хийж, нэвтрэх хуудасны URL шалгасан.

## Playwright ба Selenium-ийн харьцуулалт

Selenium дээр элемент ачаалагдахыг хүлээж гараар Explicit Wait эсвэл Sleep бичдэг байсан бол Playwright нь элемент бэлэн болохыг цаанаасаа автоматаар хүлээдэг. Selenium шиг хөтөч бүрд тохирсон ChromeDriver, GeckoDriver-ийг гараар суулгах шаардлагагүй, нэг командаар орчноо иж бүрэн бэлдэх боломжтой. Алдаа гарсан үеийн DOM Snapshot, сүлжээний хүсэлтүүд, видео бичлэгийг алхам бүрээр нь ухрааж харах боломж олгодог Trace Viewer нь дебаг хийх хугацааг хэмнэдэг. Браузер дээр хийсэн хэрэглэгчийн үйлдлийг шууд Playwright-ийн код болгон хувиргадаг. Элементийг DOM-ийн XPath эсвэл ID-аар биш хэрэглэгчид харагдах UI үүрэг (Role, Label, Text)-ээр нь олох боломж олгосон нь тестийг илүү уян хатан, UI өөрчлөлтөд тэсвэртэй болгодог.

### Codegen
npx playwright codegen ашиглахад суурь locator-ууд болон товч дарах үйлдлийн дарааллыг маш хурдан гаргаж өгсөн. Гэвч Codegen нь assertion (expect) болон тестийн шалгалтуудыг автоматаар бүрэн зохион байгуулдаггүй бөгөөд зарим үед хэт тусгайлсан locator сонгодог. Codegen-ээр бичүүлсэн тест файл (docs/codegen.ts).

`docs/` хавтаст хадгалагдсан файлын тайлбар:

* **`docs/codegen.ts`** — Codegen-ээр автоматаар үүсгэсэн файл.
* **`docs/login-pass-trace.zip`** — Нэвтрэх тест амжилттай болсон trace файл.
* **`docs/login-failed-trace.zip`** — Нэвтрэх тест албаар унагааж туршсан trace файл.
* **`docs/testpassed.html`** — Бүх тест амжилттай болсон playwright-report.
* **`docs/testfailed.html`** — Тестийг албаар унагааж туршсан playwright-report.

---

## Лабораторийн ажлыг локал дээр ажиллуулах заавар

# 1. Clone хийх ба орчин тохируулах
* git clone https://github.com/azaan1134/playwright-ui-test.git
* cd playwright-ui-test
* npm install
* npx playwright install

# 2. Тестүүдийг ажиллуулах
npx playwright test

# 3. Тайлан үзэх
npx playwright show-report

# 4. Trace файл ажиллуулах
* npx playwright show-trace docs/login-passed-trace.zip
* npx playwright show-trace docs/login-failed-trace.zip
