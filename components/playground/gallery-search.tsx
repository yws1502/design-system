"use client";

import { useRouter } from "next/navigation";

import { categories } from "@/components/playground/categories";
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
 * `categories.ts`를 그대로 펼쳐 쓰므로 회차마다 항목을 따로 등록할 필요가 없다.
 * 카테고리를 펼쳐 훑지 않고도 컴포넌트 이름 몇 글자로 바로 이동한다.
 */
type SearchEntry = {
  key: string;
  title: string;
  category: string;
  href: string;
};

const ENTRIES: SearchEntry[] = categories.flatMap((category) =>
  category.items.map((item) => ({
    key: `${category.slug}#${item.name}`,
    title: item.title,
    category: category.title,
    href: `/playground/${category.slug}#${item.name}`,
  }))
);

export function GallerySearch() {
  const router = useRouter();

  return (
    <Combobox
      items={ENTRIES}
      // 선택 상태를 유지하지 않는다. 고르는 순간 이동하고 입력창은 비워야
      // 다음 검색을 바로 이어서 할 수 있다.
      value={null}
      // 필터는 이 문자열로 걸린다. 카테고리까지 포함시켜야 "overlay"처럼
      // 묶음 이름으로 훑는 것도 된다. 화면에 보이는 라벨은 아래 렌더가 따로 그린다.
      itemToStringValue={(entry: SearchEntry) =>
        `${entry.title} ${entry.category}`
      }
      onValueChange={(entry) => {
        if (entry) {
          router.push(entry.href);
        }
      }}
    >
      <ComboboxInput placeholder="컴포넌트 검색" showTrigger={false} />
      <ComboboxContent>
        <ComboboxEmpty>결과가 없습니다.</ComboboxEmpty>
        <ComboboxList>
          {(entry: SearchEntry) => (
            <ComboboxItem key={entry.key} value={entry}>
              <Item size="xs" className="p-0">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap">
                    {entry.title}
                  </ItemTitle>
                  <ItemDescription>{entry.category}</ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
