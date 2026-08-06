"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  searchIndex,
  type SearchEntry,
} from "@/components/playground/search-index";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

/**
 * 갤러리 전역 검색.
 *
 * 인덱스는 `scripts/gen-search-index.mjs`가 빌드 전에 만든다. 컴포넌트 이름뿐
 * 아니라 벤더 예제 안의 서브 예제 제목까지 담고 있어서, "Mul"만 쳐도 여러
 * 컴포넌트의 Multiple 변형이 한 번에 올라온다.
 *
 * 검색어는 영문 기준이다. 서브 예제 제목이 전부 영문이라 한글로는 걸리지 않는다.
 */

/** 서브 예제로 스크롤할 때 DOM이 그려질 때까지 기다리는 최대 시간 */
const SCROLL_TIMEOUT_MS = 2000;

/**
 * 벤더 예제에는 서브 예제별 앵커 id가 없다. 대신 `Example`이 붙여주는
 * `data-slot="example"`을 훑어 제목이 일치하는 블록을 찾아 스크롤한다.
 * 예제 파일을 고치지 않고도 정확한 위치로 갈 수 있다.
 */
function scrollToExample(title: string) {
  const started = performance.now();

  function attempt() {
    const blocks = document.querySelectorAll<HTMLElement>(
      '[data-slot="example"]'
    );
    for (const block of blocks) {
      if (block.firstElementChild?.textContent?.trim() === title) {
        block.scrollIntoView({ block: "start", behavior: "smooth" });
        return;
      }
    }
    if (performance.now() - started < SCROLL_TIMEOUT_MS) {
      requestAnimationFrame(attempt);
    }
  }

  requestAnimationFrame(attempt);
}

export function GallerySearch() {
  const router = useRouter();

  return (
    <Combobox
      items={searchIndex}
      // 선택 상태를 유지하지 않는다. 고르는 순간 이동하고 입력창은 비워야
      // 다음 검색을 바로 이어서 할 수 있다.
      value={null}
      // 필터는 이 문자열로 걸린다. 컴포넌트·서브 예제·카테고리를 모두 넣어야
      // "Mul"이나 "Overlay" 같은 부분 검색이 전부 통한다.
      itemToStringValue={(entry: SearchEntry) =>
        [entry.component, entry.example, entry.category]
          .filter(Boolean)
          .join(" ")
      }
      onValueChange={(entry) => {
        if (!entry) return;
        router.push(entry.href);
        if (entry.example) {
          scrollToExample(entry.example);
        }
      }}
    >
      <ComboboxInput placeholder="컴포넌트 검색" showTrigger={false} />
      <ComboboxContent className="max-h-80">
        <ComboboxEmpty>결과가 없습니다.</ComboboxEmpty>
        <ComboboxList>
          {(entry: SearchEntry) => (
            <ComboboxItem key={entry.key} value={entry}>
              <Item size="xs" className="p-0">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap">
                    {entry.example ?? entry.component}
                  </ItemTitle>
                  <ItemDescription>
                    {entry.example
                      ? `${entry.component} · ${entry.category}`
                      : entry.category}
                  </ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
