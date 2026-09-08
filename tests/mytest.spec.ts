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
});