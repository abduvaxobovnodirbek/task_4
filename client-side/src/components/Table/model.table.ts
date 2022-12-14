export interface TableProps {
  data: UserData[];
  editingKey: string;
  edit: (record: UserData) => any;
  cancel: () => void;
  save: (str: string) => void;
  handleStatus: (e: UserData) => void;
  handleDelete: (arr: string[]) => void;
  handleStatuses: (arr: string[],status:boolean) => void;
  isEditing: (Record: UserData) => any;
  loading: boolean;
  form: any;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  selectedRowKeys: React.Key[];
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "text";
  record: any;
  index: number;
  children: React.ReactNode;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  status: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  __v?: number;
}
