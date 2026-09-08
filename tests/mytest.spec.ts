import { test, expect } from '@playwright/test';

test.describe('Saucedemo тест', () => {
  test('1. Амжилттай нэвтрэх', async ({ page }) => {
    // Нэвтрэх хуудас руу шилжинэ
    await page.goto('https://www.saucedemo.com/');

    // Хэрэглэгчийн нэр болон нууц үгийг оруулна
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    // Нэвтэрсний дараах URL болон Products текст харагдаж байгааг шалгана
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();

    // Гарах
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();

    // Буцаад нэвтрэх хуудас руу очсон эсэхийг шалгана
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
  });

    test('2. Амжилтгүй нэвтрэх', async ({ page }) => {
    // Нэвтрэх хуудас руу шилжинэ
    await page.goto('https://www.saucedemo.com/');

    // Буруу нууц үгээр нэвтрэх оролдлого хийнэ
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Нэвтэрч чадалгүй тухайн хуудас дээрээ үлдсэнийг шалгана
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Алдааны мэдээлэл таарж байгаа эсэхийг шалгана
    await expect(
      page.getByText(
        'Epic sadface: Username and password do not match any user in this service',
        { exact: true }
      )
    ).toBeVisible();    
  });

    test('3. Бараа эрэмбэлэх', async ({ page }) => {
    // Нэвтрэх хуудас руу шилжиж нэвтэрнэ
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Амжилттай нэвтэрсэн эсэхийг шалгана
    await expect(page).toHaveURL(/.*inventory.html/);

    // Эрэмбэлэх цэснээс үнэ (low to high) тохиргоог сонгоно
    await page.getByRole('combobox').selectOption('lohi');

    // Шүүсний дараах хамгийн эхний бараа нь хамгийн хямд бараа болох "Sauce Labs Onesie" болсон эсэхийг шалгана
    await expect(
    page.getByText('Sauce Labs Onesie', { exact: true }).first()
    ).toBeVisible();

    // Гарах
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();

    // Буцаад нэвтрэх хуудас руу очсон эсэхийг шалгана
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});