export interface CategoryTool {
  id: string;
  barcode: string;
  name: string;
  level: number;
  isUnit: boolean;
  specialPermissions: SpecialPermission[];
}

interface SpecialPermission {
  id: string;
  name: string;
}
