/**
 * Copyright 2018 Google Inc. All rights reserved.
 * Modifications copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { test as it, expect } from './pageTest';

it('should respect first() and last()', async ({page}) => {
  await page.setContent(`
  <section>
    <div><p>A</p></div>
    <div><p>A</p><p>A</p></div>
    <div><p>A</p><p>A</p><p>A</p></div>
  </section>`);
  expect(await page.locator('div >> p').count()).toBe(6);
  expect(await page.locator('div').locator('p').count()).toBe(6);
  expect(await page.locator('div').first().locator('p').count()).toBe(1);
  expect(await page.locator('div').last().locator('p').count()).toBe(3);
});

it('should respect nth()', async ({page}) => {
  await page.setContent(`
  <section>
    <div><p>A</p></div>
    <div><p>A</p><p>A</p></div>
    <div><p>A</p><p>A</p><p>A</p></div>
  </section>`);
  expect(await page.locator('div >> p').nth(0).count()).toBe(1);
  expect(await page.locator('div').nth(1).locator('p').count()).toBe(2);
  expect(await page.locator('div').nth(2).locator('p').count()).toBe(3);
});

it('should throw on capture w/ nth()', async ({page}) => {
  await page.setContent(`<section><div><p>A</p></div></section>`);
  const e = await page.locator('*css=div >> p').nth(0).click().catch(e => e);
  expect(e.message).toContain(`Can't query n-th element`);
});
