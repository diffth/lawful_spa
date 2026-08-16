import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { CaseCategory } from '../types';
import { CASE_CATEGORIES, SORTED_CASES } from '../data/cases';
import { CASE_DISCLAIMER } from '../data/site';
import { Container, Label } from '../components/primitives';
import { CaseFilters, CaseTable } from '../components/CaseTable';

const isCategory = (value: string | null): value is CaseCategory =>
  CASE_CATEGORIES.includes(value as CaseCategory);

/**
 * 해결사례 전체 아카이브.
 * 랜딩은 12건까지만 보여주고, 쌓인 기록 전체는 여기서 연도별로 읽는다.
 * 필터를 쿼리스트링에 두어 업무분야에서 바로 걸어 들어올 수 있게 한다.
 */
export const CaseArchive: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get('category');
  const category: CaseCategory | '전체' = isCategory(raw) ? raw : '전체';

  const filtered = useMemo(
    () =>
      category === '전체'
        ? SORTED_CASES
        : SORTED_CASES.filter((item) => item.category === category),
    [category],
  );

  const setCategory = (next: CaseCategory | '전체') => {
    if (next === '전체') setSearchParams({}, { replace: true });
    else setSearchParams({ category: next }, { replace: true });
  };

  return (
    <>
      <header className="border-b border-line bg-sunken pt-28 pb-16 sm:pt-36 sm:pb-20">
        <Container>
          <Label>Results Archive</Label>
          <h1 className="mt-4 text-[30px] leading-[1.2] font-semibold tracking-[-0.035em] sm:text-[42px]">
            해결사례 전체
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-text-soft">
            연월과 처분기관, 죄명과 처분결과를 그대로 싣습니다. 해설이 붙은 사건은 행을 눌러
            쟁점과 대응 과정을 보실 수 있습니다.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 border-b border-line-strong pb-1 text-[13px] font-medium text-text transition-colors hover:border-accent hover:text-accent"
          >
            <span aria-hidden="true">←</span> 처음으로
          </Link>
        </Container>
      </header>

      <div className="py-14 sm:py-20">
        <Container>
          <CaseFilters value={category} onChange={setCategory} count={filtered.length} />
          <div className="mt-8">
            <CaseTable cases={filtered} groupByYear />
          </div>
          <p className="mt-10 max-w-3xl text-[12px] leading-[1.8] text-text-muted">
            {CASE_DISCLAIMER}
          </p>
        </Container>
      </div>
    </>
  );
};
