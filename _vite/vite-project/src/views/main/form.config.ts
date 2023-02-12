import { IForm } from "@/components/my-form";

export const formConfig: IForm = {
  labelWidth: "100px",
  formItems: [
    {
      field: "id",
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名"
    },
    {
      field: "password",
      type: "input",
      label: "密码",
      placeholder: "请输入密码"
    },
    {
      field: "sport",
      type: "select",
      label: "喜欢的运动",
      placeholder: "请选择喜欢的运动",
      options: [
        { label: "篮球", value: "篮球" },
        { label: "足球", value: "足球" }
      ]
    },
    {
      field: "createTime",
      type: "datepicker",
      label: "创建时间",
      otherOptions: {
        type: "datetimerange",
        placeholder: "请选择时间",
        "start-placeholder": "开始时间",
        "end-placeholder": "结束时间"
      }
    }
  ]
};
