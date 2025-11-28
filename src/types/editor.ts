export interface NodeItem {
  id: string;
  nodeType: string;
  type: string;
  attributes: Object;
  children: NodeItem[];
}
