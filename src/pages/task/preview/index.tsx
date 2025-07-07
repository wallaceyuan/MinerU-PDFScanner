import { useLoaderData } from "react-router-dom";
import { Markdown } from "./Markdown";
import { PDFViewer } from "./PDFViewer";
import { PreviewStateContainer } from "./state";
import { getApiUrl } from "@/lib/config";
import { PDFViewerSkeleton } from "./PDFViewerSkeleton";
import { LoadTaskResult } from "@/service/task.service";
import { useEffect, useMemo, useState } from "react";
// import markdownContent from './full.md?raw'


const mdUrl = 'https://cdn-mineru.openxlab.org.cn/extract/69309859-fe7d-4c93-b6f8-87bfdd6f7ce7/full.md';


// console.log('markdownContent', markdownContent)

// const markdowns = [{
//   content: `# Hello world

// Hello world`,
//   page_idx: 0
// }]


// 加载数据，显示PDF， markdown的情况
export function Component() {
  // const { task, markdowns } = useLoaderData() as LoadTaskResult;

  const [markdownContent, setMarkdown] = useState(
    `# 录入接口

# 修改config.json

`
   );

  // useEffect(() => {
  //   fetch(mdUrl)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.text();
  //     })
  //     .then(text => {

  //       console.log('text', text)
  //       setMarkdown(text);
  //       // setLoading(false);
  //     })
  //     .catch(err => {
  //       // setError(err.message);
  //       // setLoading(false);
  //     });
  // }, []);

  const markDownsSplit = useMemo(() => {
    return markdownContent.split('\n')
  },[markdownContent])

  return (
    <PreviewStateContainer>
      <div className="flex h-full flex-col">
        <div className="p-2 text-center">{'task.file_name'}</div>
        <div className="h-1 flex-1 flex ">
          <div id="wrapper" className="wrapper flex-1 w-1" style={{position:'relative'}}>
            <PDFViewer pdf={'https://medgo-qwen25v-imageshare.oss-cn-shanghai.aliyuncs.com/test/test/b50746d9-3a6c-4c31-a0d7-3350ecc88ed0.pdf?OSSAccessKeyId=LTAI5tPzRzWhzTjf7sGHMKUb&Expires=1754466491&Signature=719d9hQzOuN4VXhvkw%2B%2F8d%2FhPSI%3D'}/>
          </div>
          <div className="flex-1 w-1">
          <Markdown markdowns={markDownsSplit?.map((item: any) => ({content:item}))} />
            {/* {task.status == "done" && <Markdown markdowns={markdowns} />} */}
            {/* {(task.status == "pending" || task.status == "processing") && (
              <PDFViewerSkeleton />
            )} */}
          </div>
        </div>
      </div>
    </PreviewStateContainer>
  );
}
