"use client";

import * as React from "react";

import { Example, ExampleWrapper } from "@/components/example";
import { SearchInput } from "@/components/patterns/search-input";

export default function SearchInputDemo() {
  const [query, setQuery] = React.useState("");

  return (
    <ExampleWrapper>
      <Example title="Basic">
        <SearchInput placeholder="검색" aria-label="검색" />
      </Example>
      <Example title="Controlled">
        <SearchInput
          placeholder="검색"
          aria-label="제어 검색"
          value={query}
          onValueChange={setQuery}
        />
        <p className="text-muted-foreground text-sm">
          값: {query ? `"${query}"` : "(비어 있음)"}
        </p>
      </Example>
      <Example title="Default Value">
        <SearchInput defaultValue="button" aria-label="기본값 검색" />
      </Example>
      <Example title="Disabled">
        <SearchInput placeholder="검색" aria-label="비활성 검색" disabled />
      </Example>
    </ExampleWrapper>
  );
}
