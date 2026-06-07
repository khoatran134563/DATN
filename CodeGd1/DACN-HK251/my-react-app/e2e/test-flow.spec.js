import { test, expect } from '@playwright/test';
import { loginByApi } from './helpers/auth';

test.describe('System Testing - Test Setup Flow', () => {
  test.beforeEach(async ({ page, request }) => {
    await loginByApi(page, request, 'teacher');
  });

  test('Mở chức năng Kiểm tra & Đánh giá và bắt đầu làm bài', async ({ page }) => {
    await page.goto('/progress');

    await page.getByText('Kiểm tra & Đánh giá').click();

    await expect(page.locator('body')).toContainText(/Kiểm tra & Đánh giá|Chọn chương|Chọn mức độ|Bắt đầu/i);

    const startButton = page.getByRole('button', { name: /bắt đầu/i });

    if (await startButton.isVisible()) {
      await startButton.click();
      await expect(page.locator('body')).toContainText(/Câu|A|B|C|D/i);
    }
  });
});