import { Upload, Typography, Spin } from "@douyinfe/semi-ui";
import { Toast } from "@douyinfe/semi-ui";

import { Page } from "@/components/Page";
import { Task } from "@/service/task.model";
import { taskRepository } from "@/service/task.repository";
import { useNavigate } from "react-router-dom";
import { taskService } from "@/service/task.service";
import { useRequest } from "ahooks";
import { configService } from "@/service/config.service";
const { Text } = Typography;
export function Component() {
  const navigate = useNavigate();
  const configReq = useRequest(() => configService.get(), {
    cacheKey: "CONFIG",
  });


  console.log('configReq', configReq)
  return (
    <Page>
      <div className="w-ful h-full flex  items-center flex-col justify-center gap-5">
        <h1 className="text-xl font-bold">上传PDF文件</h1>
        <p className="text-stone-500">
          支持文本/扫描型 PDF 解析，识别各类版面元素并转换为多模态 Markdown 格式
        </p>
        <Spin spinning={configReq.loading} wrapperClassName="w-full ">
          <Upload
            action={configReq.data?.uploadUrl}
            onSuccess={async (res: Task) => {
              Toast.info({
                content: (
                  <span>
                    <Text>任务创建成功，</Text>
                    <Text
                      link
                      className="ml-3"
                      onClick={() => navigate(`/task/preview/${res.task_id}`)}
                    >
                      点击查看
                    </Text>
                  </span>
                ),
              });
              const task = {
                ...res,
                status: "pending",
              };
              await taskRepository.create(task);
              taskService.addTask(task);
            }}
            className="h-64 w-96"
            fileName="file"
            data={{
              parse_method: "auto",
              is_json_md_dump: true,
            }}
            showUploadList={false}
            draggable={true}
            accept=".pdf"
            dragMainText={"点击上传PDF文件或拖拽PDF文件到这里"}
            dragSubText="目前仅支持PDF"
          ></Upload>
        </Spin>
      </div>
    </Page>
  );
}
