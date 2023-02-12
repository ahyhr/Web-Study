type IFormType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
  field: string,
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: any;
  options?: any[];
  otherOptions?: any;
}

export interface colLayoutType {
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
}

export interface IForm {
  labelWidth?: string;
  colLayout?: colLayoutType;
  formItems: IFormItem[];
}
