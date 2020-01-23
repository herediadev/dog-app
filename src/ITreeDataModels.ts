export interface ITreeDataModelBase {
    title: string;
    value: string;
    key: string;
}

export interface ITreeDataModel extends ITreeDataModelBase {
    children: ITreeDataModelBase[];
}
