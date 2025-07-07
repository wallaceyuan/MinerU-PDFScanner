 
import { MarkdownRender } from "@douyinfe/semi-ui";
import { useScrollPage } from "../../../hooks/useScrollPage";
import { useEffect, useState } from "react";
import { usePreviewState } from "./state";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
const TRIGGER_CONTAINER_ID = "MARKDOWN_VIEWER";

// import data from './docs/content_list.json'

import styles from './index.module.less'


// console.log('data', data)
// 
export function Markdown(props: { 
  markdowns:Array<{
    content?:string , 
    page_idx:number
  }>
}) {
  const {markdowns} = props;

  const [highlightedIndex,setHighlightedIndex] = useState()

  const { currentPage, containerRef, scrollToPage } = useScrollPage();
  const { triggerContainerId, previewIndex, setPreviewIndex } =
    usePreviewState();


  useEffect(() => {
    if (currentPage !== previewIndex) {
      setPreviewIndex(currentPage, TRIGGER_CONTAINER_ID);
    }
  }, [currentPage]);
  useEffect(() => {
    if (triggerContainerId !== TRIGGER_CONTAINER_ID) {
      scrollToPage(previewIndex);
    }
  }, [previewIndex, triggerContainerId]);

  const handleBlockClick = (index) => {
    setHighlightedIndex(index);
  };

  return (
    <div ref={containerRef} className="relative h-full overflow-y-auto">
      {markdowns?.map((content, index) => {
        // const { page_idx } = data[index]
        // 生成唯一映射ID：页码+块索引
        // const mappingId = `${page_idx}_${blockIndex}`;
        return  (
          <div
            key={index}
            onClick={() => handleBlockClick(index)}
            className={highlightedIndex === index ? styles['highlight'] : styles['markdown']}>
            <MarkdownRender 
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              raw={content.content}
            />
          </div>
        )
      })}
    </div>
  );
}
