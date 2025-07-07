import * as PDFJS from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePreviewState } from "./state";
import { PDFViewerSkeleton } from "./PDFViewerSkeleton";
import { Button } from "@douyinfe/semi-ui";
import layoutData from './docs/layout.json'

console.log('layout', layoutData)

PDFJS.GlobalWorkerOptions.workerSrc = workerUrl;


// 创建SVG标注层
function createAnnotationLayer(svg, pageNumber, view) {

  // if(pageNumber !== 1 ){
  //   return
  // }
  
  // 获取当前页面的布局数据
  const pageLayout = layoutData.pdf_info[pageNumber - 1];

  console.log('pageNumber', pageNumber)
  // console.log('layoutData.pdf_info[0]', layoutData.pdf_info[0], layoutData.pdf_info)
  
  // 为每个文本块创建矩形
  pageLayout.para_blocks?.forEach((block,index) => {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

      console.log('blockblockblock', block)
      const [x, y, width, height] = block.bbox;

      // console.log('lines', block.lines)

      // lines?.forEach(line => {
      //   line.spans?.forEach(span => {
      //     const [x, y, width, height] = span.bbox

          console.log('span.', x, y, width, height)
         
        rect.setAttribute('x', `${x}`);
        rect.setAttribute('y', `${y}`);
        rect.setAttribute('width',`${ (width - x)}`);
        rect.setAttribute('height', `${(height - y)}`);
        rect.setAttribute('fill', 'rgba(0, 51, 255, 0)');
        rect.setAttribute('stroke', 'rgba(0, 51, 255, 0)');
        rect.setAttribute('stroke-width', '1');
        rect.setAttribute('vector-effect', 'non-scaling-stroke');
        rect.setAttribute('data-type', 'text');
        rect.setAttribute('data-block-position', `0_${block.index}`);
        rect.setAttribute('data-mapping-id', `${index}_${block.index}`);

        // 添加鼠标事件
        rect.addEventListener('mouseenter', () => {
            rect.setAttribute('fill', 'rgba(67, 97, 238, 0.3)');
            // highlightMarkdownBlock(block.index);
        });
        
        rect.addEventListener('mouseleave', () => {
            rect.setAttribute('fill', 'rgba(0, 51, 255, 0)');
            // unhighlightMarkdownBlock(block.index);
        });
        
        svg.appendChild(rect);
          // console.log('span', span.bbox)
        })



      // })
      

  // });
}


function useRenderPDF(url: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const { setTotalPage } = usePreviewState();
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }
    setLoading(true);

    const loadingTask = PDFJS.getDocument(url);


    loadingTask.promise
      .then(async (pdf) => {
        const container = containerRef.current;
        setNumPages(pdf.numPages);
        setTotalPage(pdf.numPages);

        const wrapper = document.getElementById('wrapper')

        const wrapperWidth = wrapper?.offsetWidth

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
          const page = await pdf.getPage(pageNumber);
          const pageContainer = document.createElement("div");
          pageContainer.style.position = "relative";
          // data-page
          pageContainer.setAttribute("data-page", `${pageNumber}`);
          container?.appendChild(pageContainer);

          // 图片层
          const canvas = document.createElement("canvas");
          canvas.style.width = "100%";
          pageContainer.appendChild(canvas);

          // 文本层
          const textLayerDiv = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          // const textLayerDiv = document.createElement("svg");
          pageContainer.appendChild(textLayerDiv);
          textLayerDiv.style.position = "absolute";
          textLayerDiv.style.zIndex = "10";
          textLayerDiv.style.top = '0px'
          textLayerDiv.style.bottom = '0px'
          textLayerDiv.style.left = '0px'
          textLayerDiv.style.right = '0px'


          textLayerDiv.innerHTML = ''


          const [w, h]  = layoutData.pdf_info[0].page_size

          const view = (wrapperWidth ?? 0) / w;

          //  // 创建标注层
          createAnnotationLayer(textLayerDiv, pageNumber, view);

           
          // 获得屏幕像素比
          const pixelRatio = window.devicePixelRatio || 1;
          // const viewport = page.getViewport({ scale: 2 * pixelRatio });


          const viewport = page.getViewport({ scale: 2 * view });

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          textLayerDiv.setAttribute('width', `${wrapperWidth}px`);
          textLayerDiv.setAttribute('height', `${h * view}px`);

          textLayerDiv.setAttribute('viewBox', `0 0 ${(wrapperWidth ?? 0) / view} ${h}`);

          const renderContext = {
            canvasContext: canvas.getContext("2d")!,
            viewport: viewport,
          };

          await page.render(renderContext);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      // 清空cntainer

      loadingTask?.destroy();
    };
  }, [url]);
  return { containerRef, loading, numPages };
}


const TRIGGER_CONTAINER_ID = "PDF_VIWER"

export function PDFViewer(props:{pdf:string}) {

  const { loading, containerRef } = useRenderPDF(props.pdf);
  const { triggerContainerId,previewIndex, totalPages, setPreviewIndex } = usePreviewState();
  const scrollToPage = useCallback((pageIndex: number) => {
    const pageElement = containerRef.current?.querySelector(
      `[data-page="${pageIndex}"]`
    );
    // 判断是否在
    const containerRect = containerRef.current?.getBoundingClientRect();
    const elementRect = pageElement?.getBoundingClientRect();

    const isVisible = containerRect && elementRect &&  elementRect.top >= containerRect.top && elementRect.top<= containerRect.bottom
    if(!isVisible){
      pageElement?.scrollIntoView({});
    }

  }, []);
  useEffect(() => {
    if(triggerContainerId!==TRIGGER_CONTAINER_ID){
      scrollToPage(previewIndex);
    }
  }, [triggerContainerId , previewIndex]);
  const onScroll = useCallback(() => {
    const elements = containerRef.current?.querySelectorAll("[data-page]");
    if (!elements) {
      return;
    }
    const containerRect = containerRef.current?.getBoundingClientRect();

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLDivElement;
      const elementRect = element.getBoundingClientRect();
      if(containerRect &&  elementRect.top >= containerRect.top && elementRect.top<= containerRect.bottom){
        const pageIndex = parseInt(element.getAttribute("data-page")!);
        setPreviewIndex(pageIndex,TRIGGER_CONTAINER_ID);
        break;
      }
    }
  }, []);
  return (
    <div className="h-full flex  flex-col relative">
      <div
        className="absolute bg-white p-5 inset-0 z-10 data-[loading=true]:block hidden"
        data-loading={loading}
      >
        <PDFViewerSkeleton />
      </div>
      <div className="flex gap-2 items-center justify-center">
        {/* 工具栏 */}
        <Button
        disabled={previewIndex ==1}
        onClick={() => setPreviewIndex(Math.max(0,previewIndex-1))}>
          上一页
        </Button>
        {previewIndex}/{totalPages}
        <Button
        disabled={previewIndex >= totalPages}
        onClick={() => setPreviewIndex(previewIndex + 1)}>
          下一页
        </Button>
      </div>
      <div
        onScroll={onScroll}
        className="h-1 flex-1 relative overflow-y-auto w-full"
        ref={containerRef}
      >
      </div>
    </div>
  );
}
