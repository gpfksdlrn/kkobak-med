import { describe, expect, it } from 'vitest';

import { getStatus } from './getStatus';

describe('getStatus', () => {
  it('taken_at이 있으면 taken을 반환한다', () => {
    const status = getStatus(
      '2026-07-08',
      '08:00',
      '2026-07-08T08:05:00Z',
      new Date('2026-07-08T09:00:00Z')
    );

    expect(status).toBe('taken');
  });

  it('taken_at이 없고 예정 시간이 지났으면 missed를 반환한다', () => {
    const status = getStatus(
      '2026-07-08',
      '08:00',
      null,
      new Date('2026-07-08T09:00:00')
    );

    expect(status).toBe('missed');
  });

  it('taken_at이 없고 예정 시간이 아직 안 지났으면 pending을 반환한다', () => {
    const status = getStatus(
      '2026-07-08',
      '08:00',
      null,
      new Date('2026-07-08T07:00:00')
    );

    expect(status).toBe('pending');
  });
});
